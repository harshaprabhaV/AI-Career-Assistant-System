import React from "react";

function JobCard({ job }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 h-100">
      <div className="card-body p-4">

        <h4 className="text-primary fw-bold mb-3">
          💼 {job.job_title}
        </h4>

        <hr />

        <p className="mb-3">
          <strong>📍 Location</strong>
          <br />
          {job.location}
        </p>

        <p className="mb-3">
          <strong>🏢 Domain</strong>
          <br />
          {job.domain}
        </p>

        <span className="badge bg-success p-3 fs-6">
          🎯 Match Score : {job.score}%
        </span>

      </div>
    </div>
  );
}

export default JobCard;