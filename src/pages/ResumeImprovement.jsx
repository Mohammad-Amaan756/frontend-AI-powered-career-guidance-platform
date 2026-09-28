import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResumeImprovement() {
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // Select Resume File
  // --------------------------------------------------

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeFile(null);

      setMessage(
        "Please upload a PDF or DOCX file."
      );

      event.target.value = "";
      return;
    }

    setResumeFile(file);

    // Clear pasted text when selecting a file
    setResumeText("");

    setMessage(
      `Selected: ${file.name}`
    );
  };

  // --------------------------------------------------
  // Analyze Resume
  // --------------------------------------------------

  const analyzeResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Must have either file OR text
    if (
      !resumeFile &&
      !resumeText.trim()
    ) {
      setMessage(
        "Please upload a resume or paste your resume text."
      );

      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      // ------------------------------------------------
      // Create FormData
      // ------------------------------------------------

      const formData = new FormData();

      // If file exists
      if (resumeFile) {
        formData.append(
          "resume",
          resumeFile
        );
      }

      // If pasted text exists
      if (resumeText.trim()) {
        formData.append(
          "resumeText",
          resumeText
        );
      }

      // ------------------------------------------------
      // Send request
      // ------------------------------------------------

      const response = await axios.post(
        "http://localhost:5000/api/resume/improve",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Resume Improvement:",
        response.data
      );

      setResult(
        response.data.result
      );

      setMessage(
        "Resume analyzed successfully!"
      );

    } catch (error) {
      console.error(
        "Resume Improvement Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to analyze resume."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ------------------------------------------------ */}
      {/* Page Header */}
      {/* ------------------------------------------------ */}

      <h1>
         Resume Improvement
      </h1>

      <p>
        Upload your resume or paste your resume
        text to get AI-powered improvement
        suggestions.
      </p>

      <hr />

      {/* ------------------------------------------------ */}
      {/* Upload Resume */}
      {/* ------------------------------------------------ */}

      <h2>
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      <p>
        Supported formats: PDF, DOCX
      </p>

      {resumeFile && (
        <p>
          <strong>
            Selected:
          </strong>{" "}
          {resumeFile.name}
        </p>
      )}

      <hr />

      {/* ------------------------------------------------ */}
      {/* Paste Resume */}
      {/* ------------------------------------------------ */}

      <h2>
        Or Paste Resume
      </h2>

      <textarea
        value={resumeText}
        onChange={(e) => {
          setResumeText(e.target.value);

          // Clear file when user starts pasting
          if (e.target.value.trim()) {
            setResumeFile(null);
          }
        }}
        placeholder="Paste your complete resume here..."
        rows="20"
        cols="80"
      />

      <br />
      <br />

      {/* ------------------------------------------------ */}
      {/* Analyze Button */}
      {/* ------------------------------------------------ */}

      <button
        onClick={analyzeResume}
        disabled={loading}
      >
        {loading
          ? "Analyzing Resume..."
          : "Analyze & Improve Resume"}
      </button>

      <br />
      <br />

      {message && (
        <p>
          {message}
        </p>
      )}

      {/* ------------------------------------------------ */}
      {/* Results */}
      {/* ------------------------------------------------ */}

      {result && (
        <div>
          <hr />

          <h2>
             Resume Analysis
          </h2>

          {/* Score */}

          <h3>
            Overall Resume Score
          </h3>

          <p>
            <strong>
              {result.overallScore}/100
            </strong>
          </p>

          {/* Strengths */}

          <h3>
             Strengths
          </h3>

          {result.strengths?.length > 0 ? (
            <ul>
              {result.strengths.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No strengths identified.
            </p>
          )}

          {/* Weaknesses */}

          <h3>
             Weaknesses
          </h3>

          {result.weaknesses?.length > 0 ? (
            <ul>
              {result.weaknesses.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No major weaknesses identified.
            </p>
          )}

          {/* Missing Skills */}

          <h3>
             Missing Skills
          </h3>

          {result.missingSkills?.length > 0 ? (
            <ul>
              {result.missingSkills.map(
                (skill, index) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No missing skills identified.
            </p>
          )}

          {/* ATS Keywords */}

          <h3>
        Recommended ATS Keywords
          </h3>

          {result.atsKeywords?.length > 0 ? (
            <ul>
              {result.atsKeywords.map(
                (keyword, index) => (
                  <li key={index}>
                    {keyword}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No additional keywords suggested.
            </p>
          )}

          {/* Formatting */}

          <h3>
             Formatting Suggestions
          </h3>

          {result.formattingSuggestions?.length > 0 ? (
            <ul>
              {result.formattingSuggestions.map(
                (suggestion, index) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No formatting suggestions.
            </p>
          )}

          {/* Summary */}

          <h3>
             Suggested Professional Summary
          </h3>

          <p>
            {result.summarySuggestion ||
              "No summary suggestion available."}
          </p>

          {/* Skills */}

          <h3>
             Skills Suggestions
          </h3>

          {result.skillsSuggestions?.length > 0 ? (
            <ul>
              {result.skillsSuggestions.map(
                (suggestion, index) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No skills suggestions.
            </p>
          )}

          {/* Projects */}

          <h3>
             Project Suggestions
          </h3>

          {result.projectSuggestions?.length > 0 ? (
            <ul>
              {result.projectSuggestions.map(
                (suggestion, index) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No project suggestions.
            </p>
          )}

          {/* Experience */}

          <h3>
             Experience Suggestions
          </h3>

          {result.experienceSuggestions?.length > 0 ? (
            <ul>
              {result.experienceSuggestions.map(
                (suggestion, index) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No experience suggestions.
            </p>
          )}

          {/* Overall Advice */}

          <h3>
             Overall Advice
          </h3>

          {result.overallAdvice?.length > 0 ? (
            <ol>
              {result.overallAdvice.map(
                (advice, index) => (
                  <li key={index}>
                    {advice}
                  </li>
                )
              )}
            </ol>
          ) : (
            <p>
              No additional advice available.
            </p>
          )}
        </div>
      )}

      <hr />

      {/* Back */}

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default ResumeImprovement;