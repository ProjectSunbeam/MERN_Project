import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h3>Active Courses</h3>

        <div className="row">
          {courses.length === 0 ? (
            <p className="text-muted mt-4">No active courses</p>
          ) : (
            courses.map((e) => (
              <div key={e.course_id} className="mt-3 col-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5>{e.course_name}</h5>
                    <p>{e.description}</p>
                    <p className="fw-bold">₹ {e.fees}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Courses;
