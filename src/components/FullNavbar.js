import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FullNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🛑 User nahi hai? (Admin login?) → is navbar ko dikhana hi mat.
  if (!user) {
    return null; 
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/userhome">
        Job Tracker
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/applied-jobs">Applied Jobs</Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-3">
            <span className="nav-link text-white">
              Welcome, {user.name}
            </span>
          </li>

          <li className="nav-item">
            <button className="btn btn-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FullNavbar;
