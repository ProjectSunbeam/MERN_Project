// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/userService";
import "./Auth.css"; // neeche CSS
import heroImg from "../assets/hero-Img.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (!mobile.trim()) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error("Enter a valid 10‑digit mobile number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await registerUser(
        name.trim(),
        email.trim(),
        password,
        mobile
      );
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT SIDE: illustration exactly like Udemy */}
      <div className="auth-illustration">
        <img src={heroImg} alt="Online learning" className="auth-image" />

        <h1 className="auth-title">
          Become placement‑ready
          <br /> with industry‑level courses.
        </h1>

        <p className="auth-subtitle">
          Master real projects, build a strong portfolio, and learn directly
          from working engineers — all in one place.
        </p>
      </div>

      {/* RIGHT SIDE: registration form */}
      <div className="auth-form-wrapper">
        <div className="auth-card">
          <h2 className="auth-heading">Sign up with email</h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                className="form-control modern-input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="email"
                className="form-control modern-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="password"
                className="form-control modern-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="tel"
                className="form-control modern-input"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <button className="btn w-100 purple-btn" disabled={loading}>
              {loading ? "Please wait..." : "Continue"}
            </button>
          </form>

          <p className="mt-3 small">
            Already have an account?{" "}
            <Link to="/login" className="purple-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
