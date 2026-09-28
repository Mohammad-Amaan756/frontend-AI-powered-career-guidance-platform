import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobAnalyzer() {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      setMessage("Please enter a Job Description.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs/analyze",
        {
          jobDescription: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Gemini result:", response.data);

      setResult(response.data.result);
      setMessage("Job Description analyzed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to analyze Job Description."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Job Description Analyzer</h1>

      <p>
        Paste a Job Description below and Gemini AI will
        analyze the required skills and qualifications.
      </p>

      <form onSubmit={handleAnalyze}>
        <label>
          <strong>Job Description</strong>
        </label>

        <br />
        <br />

        <textarea
          rows="15"
          cols="80"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          placeholder="Paste the Job Description here..."
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Job Description"}
        </button>
      </form>

      <br />

      {message && <p>{message}</p>}

      {result && (
        <div>
          <hr />

          <h2>Analysis Result</h2>

          <h3>Job Title</h3>
          <p>{result.jobTitle}</p>

          <h3>Required Skills</h3>

          <ul>
            {result.requiredSkills?.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Preferred Skills</h3>

          <ul>
            {result.preferredSkills?.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Qualifications</h3>

          <ul>
            {result.qualifications?.map(
              (qualification, index) => (
                <li key={index}>
                  {qualification}
                </li>
              )
            )}
          </ul>

          <h3>Experience</h3>
          <p>{result.experience}</p>

          <h3>Responsibilities</h3>

          <ul>
            {result.responsibilities?.map(
              (responsibility, index) => (
                <li key={index}>
                  {responsibility}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default JobAnalyzer;