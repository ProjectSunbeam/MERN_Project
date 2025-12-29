import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { LoginContext } from "./../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigates = useNavigate();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const login = async () => {
    if (email == "") {
      toast.warn("email must be entered");
    } else if (password == "") {
      toast.warn("password must be entered");
    } else {
      const result = await loginUser(email, password);
      console.log(result);
      if (result.status == "Success") {
        setLoginStatus(true);
        sessionStorage.setItem("email", result.data.email);
        sessionStorage.setItem("token", result.data.token);
        toast.success("Login successful");
        if (result.data.role == "admin") {
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
    <div>
      <h1>Welcome To Login Page</h1>
      <br />
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <br />
      <input
        className="btn btn-primary"
        type="submit"
        value="Sign-In"
        onClick={login}
      />
      <br />
      <br />
      don't have an account ? To Create Account{" "}
      <Link to="/register">Click Here</Link>
    </div>
  );
}

export default Login;
