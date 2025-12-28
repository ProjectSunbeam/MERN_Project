import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCourse();
    console.log("course detail page loaded");
  }, [id]);

  const loadCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "success") {
      const selectedCourse = result.data.find(
        (e) => e.course_id === parseInt(id)
      );
      setCourse(selectedCourse);
    }
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <h4 className="text-center mt-5">Loading course...</h4>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-4">
          <h2>{course.course_name}</h2>
          <p className="text-muted">{course.description}</p>

          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(course.start_date).toDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(course.end_date).toDateString()}
          </p>
          <p>
            <strong>Fees:</strong> ₹ {course.fees}
          </p>

          <button className="btn btn-success mt-3">Register to Course</button>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
