// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import SimpleNavbar from "./components/SimpleNavbar";
import FullNavbar from "./components/FullNavbar";
import UserFullNavbar from "./components/UserFullNavbar";
import AdminFullNavbar from "./components/AdminFullNavbar";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import Profile from "./pages/Profile";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import ApplyJobPage from "./pages/ApplyJobPage";
import AppliedJobs from "./pages/AppliedJobs";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⭐

  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   if (savedUser) setUser(JSON.parse(savedUser));

  //   setLoading(false); // ⭐ Wait until user loads
  // }, []);

  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    setUser(JSON.parse(user));
  }
}, []);


  if (loading) return null; // ⭐ Prevent route misfire

  return (
    <Router>
      <NavbarSelector user={user} setUser={setUser} />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* USER ROUTES */}
        <Route
          path="/userhome"
          element={user && user.role === "USER" ? <UserHome user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/apply/:jobId"
          element={user && user.role === "USER" ? <ApplyJobPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/applied-jobs"
          element={user && user.role === "USER" ? <AppliedJobs /> : <Navigate to="/login" />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/adminhome"
          element={user && user.role === "ADMIN" ? <AdminHome user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/addjob"
          element={user && user.role === "ADMIN" ? <AddJob /> : <Navigate to="/login" />}
        />

        <Route
          path="/editjob/:id"
          element={user && user.role === "ADMIN" ? <EditJob /> : <Navigate to="/login" />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}


// ⭐⭐ NAVBAR SELECTOR — MUST BE HERE BELOW App ⭐⭐

function NavbarSelector({ user, setUser }) {
  const location = useLocation();
  const simplePaths = ["/", "/login", "/register"];

  if (simplePaths.includes(location.pathname)) return <SimpleNavbar />;

  if (user?.role === "USER")
    return <UserFullNavbar user={user} setUser={setUser} />;

  if (user?.role === "ADMIN")
    return <AdminFullNavbar user={user} setUser={setUser} />;

  return null;
}

// ⭐⭐ FIX — without this App.js breaks ⭐⭐
export default App;
