import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ axios import for API call
import "./UserFullNavbar.css";

const UserFullNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // ✅ Delete account function with backend call
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/users/${user.id}`);
      alert("Account deleted successfully!");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-left">
        <Link to="/userhome" className="brand">JobTracker</Link>
      </div>

      <div className="user-navbar-right">
        <Link to="/userhome" className="nav-link">Home</Link>
        <Link to="/applied-jobs" className="nav-link">Applied Jobs</Link>

        {/* Profile Dropdown */}
        <div
          className="profile-dropdown"
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="profile-btn"
            onClick={() => setDropdown(!dropdown)}
          >
            👤 {user?.name || "User"} ▾
          </button>

          {dropdown && (
            <div className="dropdown-menu show-dropdown">
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setDropdown(false)}
              >
                Profile
              </Link>

              <button className="dropdown-item" onClick={handleDelete}>
                Delete Account
              </button>

              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserFullNavbar;
