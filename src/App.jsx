import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import JobAnalyzer from "./pages/JobAnalyzer";
import SkillGap from "./pages/SkillGap";
import LearningRoadmap from "./pages/LearningRoadmap";
import CareerGuidance from "./pages/CareerGuidance";
import ResumeImprovement from "./pages/ResumeImprovement";
import MockInterview from "./pages/MockInterview";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Job Description Analyzer */}
        <Route
          path="/job-analyzer"
          element={<JobAnalyzer />}
        />

        {/* Skill Gap Analysis */}
        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        {/* Learning Roadmap */}
        <Route
          path="/learning-roadmap"
          element={<LearningRoadmap />}
        />

        {/* Career Guidance */}
        <Route
          path="/career-guidance"
          element={<CareerGuidance />}
        />

        {/* Resume Improvement */}
        <Route
          path="/resume-improvement"
          element={<ResumeImprovement />}
        />

        {/* Mock Interview */}
        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;