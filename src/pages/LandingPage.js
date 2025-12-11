// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Find the Job That Fits You</h1>
        <p className="landing-subtitle">
          Discover jobs, apply with your resume, and track your applications easily.
          For companies — post and manage jobs efficiently.
        </p>
        <div className="landing-buttons">
          <Link to="/register" className="btn btn-primary btn-lg me-3">
            Create Account
          </Link>
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
