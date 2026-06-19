import React from "react";

function InterviewCard({
  question,
  index
}) {
  return (
    <div className="card shadow-lg border-0 rounded-4 mb-3">
      <div className="card-body p-4">

        <h5 className="text-primary fw-bold">
          Question {index + 1}
        </h5>

        <hr />

        <p className="fs-5 mb-0">
          {question}
        </p>

      </div>
    </div>
  );
}

export default InterviewCard;