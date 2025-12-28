import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../contex/loginContext";

function Home() {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const { loginStatus } = useContext(LoginContext);

  useEffect(() => {
    if (loginStatus) {
      getCourses();
    }
  }, [loginStatus]);

  const getCourses = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("Token missing in Home");
      return;
    }

    const result = await getAllCourses(token);
    console.log(result);

    if (result.status == "success") {
      setCourse(result.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          {course.map((e) => (
            <div key={e.course_id} className="mt-3 col-3">
              <div className="card" style={{ width: "20rem" }}>
                <div
                  style={{
                    height: "180px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  Course Image
                </div>

                <div className="card-body">
                  <h5 className="card-title">{e.course_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {e.description}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">₹ {e.fees}</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/course/${e.course_id}`)}
                  >
                    View
                  </button>
                </div>
              </div>

              {/* <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{e.course_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {e.description}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">₹ {e.fees}</h6>
                  <button className="btn btn-primary">Get</button>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
