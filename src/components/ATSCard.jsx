import React from "react";

function ATSCard({ score }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 mt-4">
      <div className="card-body p-4">

        <h3 className="text-primary fw-bold mb-4">
          📊 ATS Score Analysis
        </h3>

        <div
          className="progress mb-4"
          style={{ height: "30px" }}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
              width: `${score.ats_score}%`
            }}
          >
            {score.ats_score}%
          </div>
        </div>

        <div className="row text-center">

          <div className="col-md-4 mb-3">
            <div className="card bg-light border-0">
              <div className="card-body">
                <h6 className="text-muted">
                  Recommended Role
                </h6>

                <h5 className="fw-bold text-primary">
                  💼 {score.job_title}
                </h5>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-light border-0">
              <div className="card-body">
                <h6 className="text-muted">
                  Location
                </h6>

                <h5 className="fw-bold">
                  📍 {score.location}
                </h5>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-light border-0">
              <div className="card-body">
                <h6 className="text-muted">
                  Domain
                </h6>

                <h5 className="fw-bold">
                  🏢 {score.domain}
                </h5>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ATSCard;