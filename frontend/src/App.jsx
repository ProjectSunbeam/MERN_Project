import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VideoSection from "./pages/video_section";

function App() {
  return (
    <>
     <Navbar />
      <Routes>
        {/* <Route path="/" element={<Register />} /> */}
        {/* /* <Route path="/login" element={<Login />} /> */}
        
        <Route path="/register" element={<Register />} /> 
        {/* /* <Route path="/courses/:id/learn" element={<VideoSection />} />  */}
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;
