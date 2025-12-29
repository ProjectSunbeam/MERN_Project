// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { useContext } from "react";
import { LoginContext } from "../contex/loginContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginContext);

  const validate = () => {
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

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await loginUser(email.trim(), password);
      console.log("LOGIN RESPONSE FULL:", data);
      sessionStorage.getItem("token");
      setLoginStatus(true);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      {/* Left illustration */}
      <div className="d-none d-md-flex col-md-6 bg-light flex-column justify-content-center p-5">
        <h1 className="fw-bold mb-3">E‑Learn Hub</h1>
        <p className="text-muted">
          Continue your learning journey with top mentors.
        </p>
      </div>

      {/* Right form */}
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: 420 }}>
          <h2 className="mb-4">Log in to your account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100 mb-2" disabled={loading}>
              {loading ? "Please wait..." : "Log in"}
            </button>
          </form>

          <p className="mt-3">
            New to E‑Learn Hub?{" "}
            <Link to="/register" className="text-primary fw-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
