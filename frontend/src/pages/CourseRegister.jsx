import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerCourseService } from "../services/courseService";

function CourseRegister() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const registerCourse = async () => {
    if (!name || !email || !mobile) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await registerCourseService({
        name,
        email,
        course_id: state.courseId,
        mobile_no: mobile,
      });

      console.log("FULL RESULT 👉", result);

      if (result.data?.affectedRows === 1) {
        sessionStorage.setItem("email", email);
        navigate("/my-courses");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("REGISTER ERROR 👉", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="col-md-8 mx-auto">
          {/* Course Info */}
          <div className="card mb-4">
            <table className="table mb-0">
              <tbody>
                <tr>
                  <th>Course Name</th>
                  <td>{state.courseName}</td>
                </tr>
                <tr>
                  <th>Fees (₹)</th>
                  <td>{state.fees}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Form */}
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Register to Course</h3>

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile"
              onChange={(e) => setMobile(e.target.value)}
            />

            <button
              className="btn btn-info btn-lg text-white"
              onClick={registerCourse}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseRegister;
