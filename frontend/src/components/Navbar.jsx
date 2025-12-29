// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white ud-navbar">
      <div className="container-xxl">
        {/* LEFT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <Link className="navbar-brand ud-logo" to="/">
            E‑Learn
          </Link>
          <button className="btn btn-link ud-explore d-none d-lg-inline-flex">
            Explore
          </button>
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
          <Link
            to="/about"
            className="btn btn-link ud-top-link d-none d-lg-inline-block"
          >
            About Us
          </Link>
          <Link
            to="/courses"
            className="btn btn-link ud-top-link d-none d-lg-inline-block"
          >
            All courses
          </Link>

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
