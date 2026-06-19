import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ATSPage from "./pages/ATSPage";
import JobsPage from "./pages/JobsPage";
import InterviewPage from "./pages/InterviewPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ats" element={<ATSPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;