import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplyJobPage.css";

export default function ApplyJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Resume will come from updated user object
  const resume = user?.resume || "";

  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/jobs/${jobId}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.log(err));
  }, [jobId]);

  const applyForJob = async () => {
    if (!resume) {
      alert("Please upload your resume in your profile first!");
      return;
    }

    try {
      const application = {
        job: { id: jobId },
        user: { id: user.id },
      };

      await axios.post("http://localhost:8080/applications", application);

      alert("Application Submitted!");
      navigate("/applied-jobs");
    } catch (err) {
      console.log(err);
      alert("Failed to apply.");
    }
  };

  if (!job) return <h3 className="loading">Loading...</h3>;

  return (
    <div className="apply-wrapper">
      <div className="apply-card">

        <h2 className="title">Apply for {job.position}</h2>
        <p className="subtitle">Please confirm job details before applying</p>

        <div className="job-info-box">
          <h4 className="company-name">{job.companyName}</h4>
          <p><strong>Position:</strong> {job.position}</p>
          <p><strong>Location:</strong> {job.location}</p>
          {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
        </div>

        {/* Resume Section */}
        <div className="resume-box">
          <p><strong>Resume:</strong> Auto-selected from your profile</p>

          {resume ? (
            <embed
              src={resume}
              type="application/pdf"
              width="100%"
              height="200px"
            />
          ) : (
            <p style={{ color: "red" }}>No resume uploaded in your profile</p>
          )}
        </div>

        <button className="apply-btn" onClick={applyForJob}>
          Submit Application
        </button>
      </div>
    </div>
  );
}
