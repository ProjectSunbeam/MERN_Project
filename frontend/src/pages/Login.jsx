import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { LoginContext } from "./../App";
import { useAuth } from "../contex/AuthContext";
import "./Login.css";
import heroImg from "../assets/hero-Img.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigates = useNavigate();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { login: authLogin, user } = useAuth();

  const login = async () => {
    if (email == "") {
      toast.warn("email must be entered");
    } else if (password == "") {
      toast.warn("password must be entered");
    } else {
      const result = await authLogin(email, password);
      if (result.success) {
        setLoginStatus(true);
        toast.success("Login successful");
        if (user?.role == "admin") {
          navigates("/admin");
        } else {
          navigates("/home");
        }
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div className="login-container">
      {/* Left illustration */}
      <div className="login-illustration">
        <img src={heroImg} alt="Online learning" className="login-image" />
        <h1 className="login-brand">E‑Learn Hub</h1>
        <p className="login-tagline">
          Continue your learning journey with top mentors.
        </p>
      </div>

      {/* Right form */}
      <div className="login-form-wrapper">
        <div className="login-card">
          <h2 className="login-heading">Log in to your account</h2>
          <p className="login-subheading">
            Welcome back! Please enter your details.
          </p>

          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="button" onClick={login}>
            Sign In
          </button>

          <p className="login-footer">
            New to E‑Learn Hub?{" "}
            <Link to="/register" className="login-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
