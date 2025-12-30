import { Link, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

import "./App.css";
import { createContext, useState } from "react";
import Admin from "./pages/Admin";
import AddCourse from "./pages/AddCourse";
import AllCourses from "./pages/AllCourses";
import GetAllStudents from "./pages/GetAllStudents";
import GetAllVideos from "./pages/GetAllVideos";
import AddVideo from "./pages/AddVideo";
import AboutUs from "./pages/AboutUs";

export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          {/* Protecting Routes */}
          <Route
            path="/home"
            element={loginStatus ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={loginStatus ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={loginStatus ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/addcourse"
            element={loginStatus ? <AddCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/allcourses"
            element={loginStatus ? <AllCourses /> : <Navigate to="/" />}
          />
          <Route
            path="/getallstudents"
            element={loginStatus ? <GetAllStudents /> : <Navigate to="/" />}
          />
          <Route
            path="/getallvideos"
            element={loginStatus ? <GetAllVideos /> : <Navigate to="/" />}
          />
          <Route
            path="/addvideo"
            element={loginStatus ? <AddVideo /> : <Navigate to="/" />}
          />
        </Routes>
      </LoginContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
