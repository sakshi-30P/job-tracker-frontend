// src/components/SimpleNavbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function SimpleNavbar(){
  return (
    <header className="header d-flex align-items-center">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="brand">JobTracker</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-light" to="/register">Register</Link>
        </div>
      </div>
    </header>
  );
}
