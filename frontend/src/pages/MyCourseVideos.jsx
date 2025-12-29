import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { myCourseVideos } from "../services/courseService";

// Convert YouTube URL to Embed URL
function toEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

function MyCourseVideos() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [courseId]);

  const loadVideos = async () => {
    const result = await myCourseVideos();

    if (result.status === "Success") {
      const filteredVideos = result.data.filter(
        (v) => String(v.course_id) === String(courseId)
      );

      setVideos(filteredVideos);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">Course Videos</h3>

        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-muted">No videos available for this course.</p>
        ) : (
          videos.map((v) => (
            <div key={v.video_id} className="card mb-4 shadow">
              <div className="card-body">
                <h5>{v.title}</h5>
                <p className="text-muted">{v.description}</p>

                <div className="ratio ratio-16x9">
                  <iframe
                    src={toEmbedUrl(v.youtube_url)}
                    title={v.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyCourseVideos;
