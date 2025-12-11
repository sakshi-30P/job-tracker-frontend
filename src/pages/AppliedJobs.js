// src/pages/AppliedJobs.js
import React, { useEffect, useState } from "react";
import api from "../api";
import "./AppliedJobs.css";  // <-- ADD THIS
import { useNavigate } from "react-router-dom";

export default function AppliedJobs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    load();
  }, [user]);

  const load = async () => {
    try {
      const res = await api.get(`/applications/user/${user.id}`);
      setApps(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="applied-container">
      <h3 className="applied-title">Applied Jobs</h3>

      {apps.length === 0 && <p>No applied jobs yet.</p>}

      {apps.map((a) => (
        <div key={a.id} className="applied-card">
          <h5>{a.job?.position || a.position}</h5>
          <p>{a.job?.companyName || a.company_name}</p>

          <p className="status-badge">
            {a.status || "Applied"}
          </p>

          <small>
            Applied on: {a.appliedDate || a.createdAt}
          </small>

          {a.user?.resume && (
            <p className="resume-link mt-2">
              <a href={a.user.resume} target="_blank" rel="noreferrer">
                📄 View Uploaded Resume
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
