// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css"; // existing CSS

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend endpoint updated to /users
      const response = await axios.post("http://localhost:8080/users/register", formData);


      
      if (response.status === 200) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error(error);

      // Error ko readable text me show kare
      if (error.response && error.response.data) {
        // Agar error.data object hai to stringify kare
        const message = typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : error.response.data;
        alert(`Registration failed: ${message}`);
      } else {
        alert("Registration failed! Please check your inputs.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <span onClick={() => navigate("/login")} className="link">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
