import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getCourses } from "../services/adminService"; // ✅ ADMIN SERVICE
import { deleteCourses } from "../services/adminService";
import { toast } from "react-toastify";
import "./AllCourses.css";

function DeleteCourse() {
  const [courses, setCourses] = useState([]); // ✅ 'course' → 'courses'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const result = await getCourses(token);

      if (result.status === "Success") {
        setCourses(result.data);
      } else {
        toast.error(result.error || "Failed to load courses");
      }
    } catch (error) {
      toast.error("Error loading courses");
    }
  };

  // 🔥 FIXED DELETE HANDLER - TOKEN INCLUDED
  const handleDelete = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    try {
      setLoading(true);
      const result = await deleteCourses(course_id, token); // ✅ TOKEN PASSED

      if (result.status === "Success") {
        toast.success("Course deleted successfully!");
        
        // 🔥 IMMEDIATE UI UPDATE
        setCourses(prev => prev.filter(c => c.course_id != course_id));
      } else {
        toast.error(result.error || "Failed to delete course");
      }
    } catch (error) {
      toast.error("Delete failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-3">
        <div className="row g-4">
          {courses.map((course) => (  // ✅ 'e' → 'course'
            <div key={course.course_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "180px", fontWeight: "600" }}
                >
                  Course Image
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{course.course_name}</h5>

                  <p className="text-muted text-center flex-grow-1">
                    {course.description || "No description available"}
                  </p>

                  <h6 className="text-center mb-3">₹ {course.fees}</h6>

                  {/* 🔥 FIXED DELETE BUTTON */}
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => handleDelete(course.course_id)}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DeleteCourse;
