// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white ud-navbar">
      <div className="container-xxl">
        {/* LEFT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <Link className="navbar-brand ud-logo" to="/home">
            E‑Learn
          </Link>
        </div>

        {/* CENTER - Search */}
        <form className="ud-search">
          <span className="ud-search-icon">
            <i className="bi bi-search"></i>
          </span>
          <input
            className="form-control"
            type="search"
            placeholder="Search for anything"
          />
        </form>

        {/* RIGHT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
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
                <Link className="dropdown-item" to="/home">
                  Get All Courses
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/home">
                  Register To Course
                </Link>
              </li>
            </ul>
          </div>

          <button className="btn btn-link ud-icon-btn">
            <i className="bi bi-cart3"></i>
          </button>
          <button className="btn btn-link ud-icon-btn">
            <i className="bi bi-person-circle"></i>
          </button>

          <Link
            to="/login"
            className="btn btn-outline-dark ud-auth-btn d-none d-md-inline-block"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="btn ud-auth-btn--primary d-none d-md-inline-block"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
