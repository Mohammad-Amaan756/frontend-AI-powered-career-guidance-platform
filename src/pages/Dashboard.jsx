import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div>
      <h1>AI Career Guidance Dashboard</h1>

      <h2>
        Welcome, {user?.name || "Student"}!
      </h2>

      <p>
        You have successfully logged into the platform.
      </p>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Profile */}
      {/* -------------------------------------------------- */}

      <h2>My Profile</h2>

      <p>
        Manage your education, skills, projects,
        certifications and career preferences.
      </p>

      <Link to="/profile">
        <button>My Profile</button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Job Description Analyzer */}
      {/* -------------------------------------------------- */}

      <h2>Job Description Analyzer</h2>

      <p>
        Paste a Job Description and use Gemini AI
        to extract required skills, qualifications,
        experience and responsibilities.
      </p>

      <Link to="/job-analyzer">
        <button>
          Analyze Job Description
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Career Guidance */}
      {/* -------------------------------------------------- */}

      <h2>Career Guidance</h2>

      <p>
        Get personalized career recommendations
        based on your profile.
      </p>

      <Link to="/career-guidance">
        <button>
          Career Guidance
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Skill Gap Analysis */}
      {/* -------------------------------------------------- */}

      <h2>Skill Gap Analysis</h2>

      <p>
        Compare your existing skills with the
        requirements of a Job Description.
      </p>

      <Link to="/skill-gap">
        <button>
          Skill Gap Analysis
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Learning Roadmap */}
      {/* -------------------------------------------------- */}

      <h2>Learning Roadmap</h2>

      <p>
        Get personalized learning recommendations
        for your missing skills.
      </p>

      <Link to="/learning-roadmap">
        <button>
          Learning Roadmap
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Resume Improvement */}
      {/* -------------------------------------------------- */}

      <h2>Resume Improvement</h2>

      <p>
        Improve your resume according to your
        target career.
      </p>

      <Link to="/resume-improvement">
        <button>
          Resume Improvement
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Mock Interview */}
      {/* -------------------------------------------------- */}

      <h2>Mock Interview</h2>

      <p>
        Practice interview questions and receive
        AI-powered feedback on your answers.
      </p>

      <Link to="/mock-interview">
        <button>
          Start Mock Interview
        </button>
      </Link>

      <hr />

      {/* -------------------------------------------------- */}
      {/* Logout */}
      {/* -------------------------------------------------- */}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;