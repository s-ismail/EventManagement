import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "./Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/login", credentials);
      const { token, message } = response.data;
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT

      localStorage.setItem("CC_Token", token);
      localStorage.setItem("CC_Role", decodedToken.role);

      if (decodedToken.role === "Admin") {
        navigate("/Dashboardpage");
      } else if(decodedToken.role === "User") {
        navigate("/Homepage");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="page-content">
      <Navbar />
      <div className="container">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

