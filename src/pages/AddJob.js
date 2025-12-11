import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    companyName: "",
    position: "",
    location: "",
    description: "",
    companyLogo: ""
  });

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
      await api.post("/jobs", payload);
      alert("Job added successfully!");

      navigate("/adminhome");

      setJobData({
        companyName: "",
        position: "",
        location: "",
        description: "",
        companyLogo: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <>
      {/* 🔥 REMOVED AdminFullNavbar — because it already shows two navbars */}
      {/* <AdminFullNavbar /> */}

      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 text-center">Add New Job</h2>

        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">

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

          <button className="btn btn-primary w-100" type="submit">
            Add Job
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;
