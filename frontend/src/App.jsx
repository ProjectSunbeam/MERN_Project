import { Navigate, Route, Routes } from "react-router-dom";
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
import DeleteCourse from "./pages/DeleteCourse";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import AdminCourseDetails from "./pages/AdminCourseDetails";
import CourseRegister from "./pages/CourseRegister";
import MyCourses from "./pages/MyCourses";
import MyCourseVideos from "./pages/MyCourseVideos";
import AddVideoForm from "./pages/AddVideoForm";
import { useAuth } from "./contex/AuthContext";

export const LoginContext = createContext();

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/addcourse"
            element={user && user.role === 'admin' ? <AddCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/allcourses"
            element={user && user.role === 'admin' ? <AllCourses /> : <Navigate to="/" />}
          />
          <Route
            path="/getallstudents"
            element={user && user.role === 'admin' ? <GetAllStudents /> : <Navigate to="/" />}
          />
          <Route
            path="/getallvideos"
            element={user && user.role === 'admin' ? <GetAllVideos /> : <Navigate to="/" />}
          />
          <Route
            path="/addvideo"
            element={user && user.role === 'admin' ? <AddVideo /> : <Navigate to="/" />}
          />
          <Route
            path="/addvideoform/:courseId"
            element={user && user.role === 'admin' ? <AddVideoForm /> : <Navigate to="/" />}
          />
          <Route
            path="/deletecourse"
            element={user && user.role === 'admin' ? <DeleteCourse /> : <Navigate to="/" />}
          />

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/admincourse/:id" element={<AdminCourseDetails />} />
          <Route path="/course-register" element={<CourseRegister />} />
          <Route path="/my-courses" element={<MyCourses />} />

          <Route
            path="/my-course/:courseId/videos"
            element={<MyCourseVideos />}
          />
        </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
