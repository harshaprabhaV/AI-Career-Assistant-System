import React, {
  useEffect,
  useState
} from "react";
import InterviewCard from "../components/InterviewCard";

function InterviewPage() {
  const [questions, setQuestions] =
    useState([]);

  useEffect(() => {
    const savedQuestions =
      JSON.parse(
        localStorage.getItem("questions")
      ) || [];

    setQuestions(savedQuestions);
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5">
        🎤 Mock Interview Questions
      </h2>

      {questions.length === 0 ? (
        <div className="card p-4 text-center shadow">
          <h5>
            Upload and analyze your
            resume first.
          </h5>
        </div>
      ) : (
        questions.map(
          (question, index) => (
            <InterviewCard
              key={index}
              question={question}
              index={index}
            />
          )
        )
      )}

    </div>
  );
}

export default InterviewPage;