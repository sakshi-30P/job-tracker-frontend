import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");  //extra
    setUser(null); //extra
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg px-4">
      <Link className="navbar-brand fw-bold" to="/">JobTracker</Link>

      <div className="ms-auto">
        {!user ? (
          <>
            <Link className="btn btn-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-primary" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-primary me-2" to="/dashboard">
              Dashboard
            </Link>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
