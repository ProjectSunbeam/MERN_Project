import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import { getAllVideoss } from "../services/adminService";

function GetAllVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const result = await getAllVideoss(token);

      if (result.status === "Success") {
        setVideos(result.data);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error("Failed to load videos");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3 className="mb-4 text-center">All Videos</h3>

        <div className="row g-4">
          {videos.length === 0 && (
            <p className="text-center text-muted">No videos available</p>
          )}

          {videos.map((video) => (
            <div
              key={video.video_id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card h-100 shadow-sm border-0">
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${
                    video.youtube_url.split("v=")[1]
                  }/0.jpg`}
                  alt={video.title}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h6 className="text-muted text-center mb-1">
                    Course ID: {video.course_id}
                  </h6>

                  <h5 className="card-title text-center">{video.title}</h5>

                  <p className="text-muted text-center small flex-grow-1">
                    {video.description}
                  </p>

                  <a
                    href={video.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary btn-sm mt-auto"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GetAllVideos;
