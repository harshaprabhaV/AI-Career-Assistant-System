import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs =
      JSON.parse(
        localStorage.getItem("topJobs")
      ) || [];

    setJobs(savedJobs);
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5">
        💼 Recommended Jobs
      </h2>

      {jobs.length === 0 ? (
        <div className="card p-4 text-center shadow">
          <h5>
            Upload and analyze your
            resume first.
          </h5>
        </div>
      ) : (
        <div className="row">
          {jobs.map((job, index) => (
            <div
              className="col-md-6 mb-4"
              key={index}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default JobsPage;