import React, { useEffect, useState } from "react";
import API from "../services/api";
import ATSCard from "../components/ATSCard";
import JobCard from "../components/JobCard";
import InterviewCard from "../components/InterviewCard";

function ATSPage() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [skills, setSkills] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    localStorage.removeItem("topJobs");
    localStorage.removeItem("questions");
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload your resume.");
      return;
    }

    setScore(null);
    setSkills([]);
    setTopJobs([]);
    setQuestions([]);

    try {
      // ATS Score
      const formData1 = new FormData();
      formData1.append("file", file);

      const atsRes = await API.post(
        "/ats-score",
        formData1
      );

      setScore(atsRes.data);

      // Suggested Skills
      const formData2 = new FormData();
      formData2.append("file", file);

      const skillsRes = await API.post(
        "/suggested-skills",
        formData2
      );

      setSkills(
        skillsRes.data.suggested_skills
      );

      // Top Jobs
      const formData3 = new FormData();
      formData3.append("file", file);

      const jobsRes = await API.post(
        "/top-jobs",
        formData3
      );

      setTopJobs(
        jobsRes.data.top_jobs
      );

      localStorage.setItem(
        "topJobs",
        JSON.stringify(
          jobsRes.data.top_jobs
        )
      );

      // Mock Interview
      const formData4 = new FormData();
      formData4.append("file", file);

      const interviewRes = await API.post(
        "/mock-interview",
        formData4
      );

      setQuestions(
        interviewRes.data.questions
      );

      localStorage.setItem(
        "questions",
        JSON.stringify(
          interviewRes.data.questions
        )
      );

    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow border-0 rounded-4 p-4">

        <h2 className="text-center mb-4 fw-bold">
          AI Career Assistant
        </h2>

        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
        >
          Analyze Resume
        </button>

        {/* ATS Card */}
        {score && (
          <ATSCard score={score} />
        )}

        {/* Suggested Skills */}
        {skills.length > 0 && (
          <div className="card mt-4 shadow border-0 rounded-4">
            <div className="card-body p-4">

              <h4 className="text-primary mb-4">
                🛠 Suggested Skills
              </h4>

              <div className="d-flex flex-wrap gap-2">
                {skills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="badge bg-primary p-3 fs-6"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>

            </div>
          </div>
        )}

        {/* Top Jobs */}
        {topJobs.length > 0 && (
          <div className="mt-4">

            <h3 className="text-primary mb-4">
              💼 Top Recommended Jobs
            </h3>

            <div className="row">
              {topJobs.map(
                (job, index) => (
                  <div
                    className="col-md-6 mb-4"
                    key={index}
                  >
                    <JobCard job={job} />
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {/* Interview Questions */}
        {questions.length > 0 && (
          <div className="mt-4">

            <h3 className="text-primary mb-4">
              🎤 Mock Interview Questions
            </h3>

            {questions.map(
              (question, index) => (
                <InterviewCard
                  key={index}
                  question={question}
                  index={index}
                />
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default ATSPage;