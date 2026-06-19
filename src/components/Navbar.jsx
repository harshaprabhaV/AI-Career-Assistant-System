import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          AI Career Assistant
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/ats">
            ATS Score
          </Link>

          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>

          <Link className="nav-link" to="/interview">
            Mock Interview
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;