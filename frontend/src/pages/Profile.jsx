import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/userService";
import { toast } from "react-toastify";

function Profile() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log(`Profile Loaded`);
    getDetails();
  }, []);

  const getDetails = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getProfile(token);
    if (result.status == "Success") {
      const profile = result.data;
      if (profile.user) {
        setEmail(profile.user.email);
        // Note: role is not in profile, it's in token
        // You might need to decode token for role
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } else {
        toast.error("Profile not available. Please login again...");
      }
    } else {
      console.log(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome To Your Profile</h1>
      <div className="container">
        <div className="row">
          <div className="mt-3 col-4">
            <div className="card" style={{ width: "20rem" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ height: "2rem" }}>
                  {email}
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {role}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
