import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserProfile } from "../services/userService";
import { updateProfile } from "../services/userService";
import { toast } from "react-toastify";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    console.log("Profile is loaded");
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getUserProfile(token);
    console.log(result);

    if (result.status == "success") {
      const user = result.data[0];
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  };

  const update = async () => {
    const token = sessionStorage.getItem("token");
    const result = await updateProfile(token, name, email, mobile);
    if (result.status == "success") {
      toast.success("Profile Update");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container w-50">
        <div className="mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3 mb-3">
          <input
            type="tel"
            className="form-control"
            id="inputMobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={update}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
