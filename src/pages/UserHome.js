// src/pages/UserHome.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // ⭐ FIXED ROUTE → apply/:id
  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) =>
    (job.position || "").toLowerCase().includes(search.title.toLowerCase()) &&
    (job.companyName || job.company_name || "")
      .toLowerCase()
      .includes(search.company.toLowerCase()) &&
    (job.location || "")
      .toLowerCase()
      .includes(search.location.toLowerCase()) &&
    (job.description || "")
      .toLowerCase()
      .includes(search.description.toLowerCase())
  );

  return (
    <>
      <div className="user-home-container">
        <h2>Job Listings</h2>

        <div className="search-filters">
          <input type="text" name="title" placeholder="Job Title" value={search.title} onChange={handleSearch} />
          <input type="text" name="company" placeholder="Company" value={search.company} onChange={handleSearch} />
          <input type="text" name="location" placeholder="Location" value={search.location} onChange={handleSearch} />
          <input type="text" name="description" placeholder="Description" value={search.description} onChange={handleSearch} />
        </div>

        <div className="job-cards">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                {job.companyLogo && <img src={job.companyLogo} alt={job.companyName} />}
                <h5>{job.companyName || job.company_name || "Unknown"}</h5>
                <h6>{job.position}</h6>
                <p>{job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>

                <button
                  className="btn btn-primary"
                  //onClick={() => handleApply(job.id)}
                  onClick={() => window.location.href = `/apply/${job.id}`}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;
