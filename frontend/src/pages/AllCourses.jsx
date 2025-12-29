import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCourses } from "../services/userService";
import { toast } from "react-toastify";
import AdminNavbar from "../components/AdminNavbar";

function Home() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    console.log(`Home Loaded`);
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getCourses(token);
    if (result.status == "Success") {
      setCourse(result.data);
    } else {
      console.log(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1>All Courses</h1>
      <div className="container">
        <div className="row">
          {course.map((e) => {
            return (
              <div className="mt-3 col-4">
                <div className="card" style={{ width: "20rem" }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ height: "2rem" }}>
                      {e.course_id}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {e.course_name}
                    </h6>
                    <p className="card-text" style={{ height: "3rem" }}>
                      {e.description}
                    </p>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Rs. {e.fees}
                    </h6>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
