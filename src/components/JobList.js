// src/components/JobList.jsx
import React from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs, userRole, onApply, onResumeChange, onEdit, onDelete, appliedJobsMap }) {
  return (
    <>
      {jobs.length === 0 ? <p>No jobs found.</p> :
        jobs.map(j => (
          <JobCard
            key={j.id}
            job={j}
            userRole={userRole}
            onApply={onApply}
            onResumeChange={onResumeChange}
            onEdit={onEdit}
            onDelete={onDelete}
            appliedStatus={appliedJobsMap?.[j.id]?.status}
          />
        ))
      }
    </>
  );
}
