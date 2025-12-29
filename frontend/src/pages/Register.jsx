import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerUser } from "../services/userService";

function Register() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const signup = async () => {
    console.log(`email : ${email}`);
    console.log(password);
    if (name == "") {
      toast.warn("name must be entered");
    } else if (email == "") {
      toast.warn("email must be entered");
    } else if (password == "") {
      toast.warn("password must be entered");
    } else if (mobile == "") {
      toast.warn("mobile must be entered");
    } else {
      const result = await registerUser(name, email, password, mobile);
      console.log(result);
      if (result.status == "Success") {
        toast.success("Registration successful");
        navigator("/");
      } else {
        toast.error(result.data);
      }
    }
  };

  return (
    <div>
      <h1>Welcome To Registration Page</h1>
      <br />
      <div className="form-floating">
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <label for="floatingPassword">Name</label>
      </div>
      <br />
      <div className="form-floating mb-3">
        <input
          required
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          required
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="floatingPassword">Password</label>
      </div>
      <br />
      <div className="form-floating">
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => setMobile(e.target.value)}
        />
        <label for="floatingPassword">Phone Number</label>
      </div>
      <br />
      <input
        className="btn btn-primary"
        type="submit"
        value="Sign-Up"
        onClick={signup}
      />
      <br />
      <br />
      Already have an account ? To Sign-In <Link to="/login">Click Here</Link>
    </div>
  );
}

export default Register;
