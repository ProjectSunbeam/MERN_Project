// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white ud-navbar">
      <div className="container-xxl">
        {/* LEFT group */}

        {/* CENTER - Search */}

        {/* RIGHT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          {/* <Link
            to="/allcourses"
            className="btn btn-link ud-top-link d-none d-lg-inline-block"
          >
            All courses
          </Link> */}
          <Link className="btn btn-link ud-top-link d-none d-lg-inline-block">
            Admin !!
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Courses
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/allcourses">
                  Get All Courses
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/addcourse">
                  Add Course
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/deletecourse">
                  Delete Course
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Videos
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/getallvideos">
                  Get All Videos
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/addvideo">
                  Add Videos
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Students
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/getallstudents">
                  Get All Students
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/login"
            className="btn ud-auth-btn--primary d-none d-md-inline-block"
          >
            Log Out
          </Link>
          <button className="btn btn-link ud-icon-btn">
            <i className="bi bi-cart3"></i>
          </button>
          <button className="btn btn-link ud-icon-btn">
            <i className="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
