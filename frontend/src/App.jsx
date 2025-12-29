import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { LoginContext } from "./contex/loginContext";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const [loginStatus, setLoginStatus] = useState(
    !!sessionStorage.getItem("token")
  );

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/login"
            element={!loginStatus ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/profile"
            element={loginStatus ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/courses" element={<Courses />} />

          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
      </LoginContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
