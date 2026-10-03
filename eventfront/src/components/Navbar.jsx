import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("CC_Role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("CC_Token");
    localStorage.removeItem("CC_Role");
    navigate("/Login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/"><h1>EventManager</h1></Link>
      </div>
      <div>
        {!role && (
          <>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {role === "User" && (
          <>
            <Link to="/Homepage">Home</Link>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </>
        )}
        {role === "Admin" && (
          <>
            <Link to="/Dashboardpage">Dashboard</Link>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

