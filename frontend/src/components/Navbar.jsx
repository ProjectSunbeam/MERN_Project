// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../contex/AuthContext";
import "./Navbar.css";
import "./profiledropdown.css";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav   style={{
    width: "100%",

    borderRadius: "35px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
  }}
className="navbar navbar-light bg-white ud-navbar">
      <div className="container-xxl">
        {/* LEFT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <Link className="navbar-brand ud-logo" to="/home">
            E‑Learn
          </Link>
        </div>

        {/* CENTER - Search */}
      {/* CENTER - Search (SIMPLIFIED) */}
<form className="ud-search">
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

          {user ? (
            <ProfileDropdown />
          ) : (
            <>
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
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
