// src/components/JobCard.js
import React from "react";
import "./JobCard.css"; // Optional: separate CSS file for better styling

export default function JobCard({ job, role='user', onApply, onEdit, onDelete }) {
  const companyLogo = job.company_logo || job.companyLogo || "";
  const companyName = job.company_name || job.companyName || "Unknown";
  const position = job.position || "Untitled Role";
  const description = job.description || "";
  const location = job.location || job.city || "";

  return (
    <div className="job-card shadow-lg p-4 mb-4 rounded-3" style={{border: "1px solid #e0e0e0", background: "#fff"}}>
      <div className="d-flex align-items-center mb-3">
        <img 
          src={companyLogo || "https://via.placeholder.com/80"} 
          alt="logo" 
          className="job-logo rounded-circle me-3" 
          style={{width: 80, height: 80, objectFit: "cover"}}
        />
        <div>
          <p className="mb-1 text-muted" style={{fontSize: "0.9rem"}}>{companyName}</p>
          <h4 className="mb-1">{position}</h4>
          <p className="mb-0 text-secondary" style={{fontSize: "0.85rem"}}>{location}</p>
        </div>
      </div>

      <p className="mb-3" style={{color:'#555', fontSize: '0.95rem'}}>
        {description.length > 250 ? description.slice(0,250) + "..." : description}
      </p>

      <div className="d-flex gap-2">
        {role === "user" && (
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => onApply?.(job.id)}
          >
            Apply
          </button>
        )}
        {role === "admin" && (
          <>
            <button 
              className="btn btn-warning btn-sm" 
              onClick={() => onEdit?.(job.id)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => onDelete?.(job.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
    
  );
}
