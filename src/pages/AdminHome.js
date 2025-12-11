// src/pages/AdminHome.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      loadJobs();
    } catch (e) {
      console.error(e);
      alert("Failed to delete job!");
    }
  };

  const editJob = (id) => nav(`/editjob/${id}`);

  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    return (
      (job.companyName || job.company_name || "")
        .toLowerCase()
        .includes(searchLower) ||
      (job.position || "").toLowerCase().includes(searchLower) ||
      (job.location || "").toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      {/* ❌ AdminFullNavbar removed — only main navbar will appear */}

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Admin - Manage Jobs</h3>

          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredJobs.length === 0 ? (
          <p className="text-center">No jobs found.</p>
        ) : (
          <div className="row g-3">
            {filteredJobs.map((job) => (
              <div className="col-md-4" key={job.id}>
                <div className="card h-100 shadow-sm">
                  {(job.companyLogo || job.company_logo) && (
                    <img
                      src={job.companyLogo || job.company_logo}
                      className="card-img-top"
                      alt={job.companyName || job.company_name}
                    />
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.position}</h5>

                    <h6 className="card-subtitle mb-2 text-muted">
                      {job.companyName || job.company_name || "No company"}
                    </h6>

                    <p className="card-text">{job.description}</p>

                    <p className="mt-auto">
                      <strong>Location:</strong> {job.location}
                    </p>

                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => editJob(job.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
