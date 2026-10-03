import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Dashboardpage from "./components/Dashboardpage";
import Navbar from "./components/Navbar";
import About from "./components/About";

const App = () => {
  const role = localStorage.getItem("CC_Role");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/Homepage" element={role === "User" ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/Dashboardpage" element={role === "Admin" ? <Dashboardpage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

