import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminFullNavbar.css";

const AdminFullNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <Link to="/adminhome" className="brand">JobTracker</Link>
      </div>

      <div className="admin-navbar-right">
        <Link to="/adminhome" className="nav-link">Home</Link>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => navigate("/addjob")}
        >
          + Add Job
        </button>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminFullNavbar;
