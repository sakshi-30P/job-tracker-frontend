import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    companyName: "",
    position: "",
    location: "",
    description: "",
    companyLogo: ""
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        const job = response.data;

        setJobData({
          companyName: job.company_name || "",
          position: job.position || "",
          description: job.description || "",
          location: job.location || "",
          companyLogo: job.company_logo || ""
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company_name: jobData.companyName,
      position: jobData.position,
      description: jobData.description,
      location: jobData.location,
      company_logo: jobData.companyLogo || null
    };

    try {
      await api.put(`/jobs/${id}`, payload);
      alert("Job updated successfully!");
      navigate("/adminhome");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed!");
    }
  };

  return (
    <>
      {/* ❌ Removed AdminFullNavbar */}

      <div className="container mt-4" style={{ maxWidth: "650px" }}>
        <h2 className="text-center mb-3">Edit Job</h2>

        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              value={jobData.companyName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              type="text"
              name="position"
              className="form-control"
              value={jobData.position || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={jobData.location || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={jobData.description || ""}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Company Logo URL</label>
            <input
              type="text"
              name="companyLogo"
              className="form-control"
              value={jobData.companyLogo || ""}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Update Job
          </button>
        </form>
      </div>
    </>
  );
};

export default EditJob;
