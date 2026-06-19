import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">

      {/* Hero Section */}
      <div className="text-center mb-5">

        <h1 className="display-4 fw-bold mb-3">
          AI Career Assistant
        </h1>

        <p className="lead text-muted">
          ATS Score Checker, Resume Suggestions,
          Job Recommendation and Mock Interview System
        </p>

        <div className="mt-4">

          <Link
            to="/ats"
            className="btn btn-primary btn-lg me-3 px-4"
          >
            🚀 Get Started
          </Link>

          <Link
            to="/jobs"
            className="btn btn-outline-dark btn-lg px-4"
          >
            💼 View Jobs
          </Link>

        </div>

      </div>

      {/* Feature Cards */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body text-center p-4">

              <div style={{ fontSize: "50px" }}>
                📊
              </div>

              <h4 className="fw-bold mt-3">
                ATS Score
              </h4>

              <p className="text-muted mt-3">
                Analyze your resume and
                calculate your ATS score.
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body text-center p-4">

              <div style={{ fontSize: "50px" }}>
                🛠️
              </div>

              <h4 className="fw-bold mt-3">
                Resume Suggestions
              </h4>

              <p className="text-muted mt-3">
                Get missing skills and
                improve your resume.
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body text-center p-4">

              <div style={{ fontSize: "50px" }}>
                💼
              </div>

              <h4 className="fw-bold mt-3">
                Job Recommendation
              </h4>

              <p className="text-muted mt-3">
                Discover jobs that match
                your profile.
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body text-center p-4">

              <div style={{ fontSize: "50px" }}>
                🎤
              </div>

              <h4 className="fw-bold mt-3">
                Mock Interview
              </h4>

              <p className="text-muted mt-3">
                Practice interview questions
                based on your skills.
              </p>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;