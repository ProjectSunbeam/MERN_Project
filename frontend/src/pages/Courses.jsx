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
      const today = new Date();

      // ✅ filter ACTIVE courses
      const activeCourses = result.data.filter((c) => {
        const start = new Date(c.start_date);
        const end = new Date(c.end_date);
        return today >= start && today <= end;
      });

      setCourses(activeCourses);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h3>Active Courses</h3>
        <div className="row">
          {courses.map((e) => (
            <div key={e.course_id} className="mt-3 col-3">
              <div className="card">
                <div className="card-body">
                  <h5>{e.course_name}</h5>
                  <p>{e.description}</p>
                  <p>₹ {e.fees}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
