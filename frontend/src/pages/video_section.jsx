import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCourseDetails, getCourseVideos } from "../services/videoService";
import "./video_section.css";

export default function VideoSection() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [courseData, videoData] = await Promise.all([
          getCourseDetails(courseId),
          getCourseVideos(courseId),
        ]);
        setCourse(courseData);
        setVideos(videoData || []);
        if (videoData && videoData.length > 0) {
          const first = videoData[0];
          setActiveVideo({ ...first, index: 1 });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course videos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  const handleSelectLesson = (videoId) => {
    const idx = videos.findIndex((v) => v.video_id === videoId);
    if (idx === -1) return;
    setActiveVideo({ ...videos[idx], index: idx + 1 });
  };

  if (loading) {
    return (
      <div className="course-player-page d-flex align-items-center justify-content-center">
        <p style={{ color: "#e5e7eb" }}>Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="course-player-page">
      <div className="container-xxl course-player-layout">
        {/* LEFT: video + info */}
        <div className="player-main">
          <div className="player-wrapper">
            <div className="player-video">
              {activeVideo?.youtube_url ? (
                <video
                  key={activeVideo.youtube_url}
                  src={activeVideo.youtube_url}
                  controls
                  className="player-video-element"
                  controlsList="nodownload"
                />
              ) : (
                <div className="player-placeholder">
                  Select a lesson to start watching
                </div>
              )}
            </div>
          </div>

          <div className="player-header">
            <p className="player-course-title">{course?.title || "Course"}</p>

            <h1 className="player-title">
              {activeVideo?.title || "No lesson selected"}
            </h1>

            {activeVideo && (
              <p className="player-meta">
                Lesson {activeVideo.index} •{" "}
                {activeVideo.duration || "Duration not set"}
              </p>
            )}
          </div>

          <div className="player-description">
            <h2>About this lesson</h2>
            <p>
              {activeVideo?.description ||
                "This section will give an overview, key ideas, and what you will build in this lesson."}
            </p>
          </div>
        </div>

        {/* RIGHT: playlist */}
        <aside className="player-sidebar">
          <h3 className="sidebar-heading">Course content</h3>
          <p className="sidebar-subtitle">{videos.length} videos</p>

          <div className="sidebar-list">
            {videos.map((lesson, idx) => {
              const isActive =
                activeVideo && lesson.video_id === activeVideo.video_id;
              return (
                <button
                  key={lesson.video_id}
                  className={
                    "sidebar-item" + (isActive ? " sidebar-item--active" : "")
                  }
                  onClick={() => handleSelectLesson(lesson.video_id)}
                >
                  <div className="sidebar-item-left">
                    <span className="sidebar-dot" />
                    <span className="sidebar-title">
                      {idx + 1}. {lesson.title}
                    </span>
                  </div>
                  <span className="sidebar-duration">
                    {lesson.duration || ""}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
