import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CareerGuidance() {
  const navigate = useNavigate();

  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------------------------------------
  // Generate Career Guidance
  // ---------------------------------------------

  const generateGuidance = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");
    setGuidance(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/career/guidance",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Career Guidance:",
        response.data
      );

      setGuidance(
        response.data.guidance
      );

      setMessage(
        "Career guidance generated successfully!"
      );
    } catch (error) {
      console.error(
        "Career Guidance Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to generate career guidance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1> Career Guidance</h1>

      <p>
        Get personalized career recommendations
        based on your education, skills, projects,
        interests and career preferences.
      </p>

      <hr />

      <button
        onClick={generateGuidance}
        disabled={loading}
      >
        {loading
          ? "Analyzing Your Profile..."
          : "Get Career Recommendations"}
      </button>

      <br />
      <br />

      {message && <p>{message}</p>}

      {/* ----------------------------------------- */}
      {/* Career Recommendations */}
      {/* ----------------------------------------- */}

      {guidance && (
        <div>
          <hr />

          <h2>
            Recommended Career Paths
          </h2>

          {guidance.recommendedCareers
            ?.length > 0 ? (
            guidance.recommendedCareers.map(
              (career, index) => (
                <div key={index}>
                  <hr />

                  <h2>
                    {index + 1}.{" "}
                    {career.career}
                  </h2>

                  <h3>
                     Match:
                    {" "}
                    {career.matchPercentage}%
                  </h3>

                  <h3>
                     Why This Career?
                  </h3>

                  <p>
                    {career.reason}
                  </p>

                  <h3>
                     Required Skills
                  </h3>

                  {career.requiredSkills
                    ?.length > 0 ? (
                    <ul>
                      {career.requiredSkills.map(
                        (
                          skill,
                          skillIndex
                        ) => (
                          <li
                            key={
                              skillIndex
                            }
                          >
                            {skill}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      No skills listed.
                    </p>
                  )}

                  <h3>
                     Skills to Improve
                  </h3>

                  {career.skillsToImprove
                    ?.length > 0 ? (
                    <ul>
                      {career.skillsToImprove.map(
                        (
                          skill,
                          skillIndex
                        ) => (
                          <li
                            key={
                              skillIndex
                            }
                          >
                            {skill}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      No additional skills
                      suggested.
                    </p>
                  )}
                </div>
              )
            )
          ) : (
            <p>
              No career recommendations
              available.
            </p>
          )}

          {/* ------------------------------------- */}
          {/* Overall Advice */}
          {/* ------------------------------------- */}

          <hr />

          <h2>
             Overall Career Advice
          </h2>

          <p>
            {guidance.overallAdvice}
          </p>

          {/* ------------------------------------- */}
          {/* Next Steps */}
          {/* ------------------------------------- */}

          <h2>
             Recommended Next Steps
          </h2>

          {guidance.nextSteps
            ?.length > 0 ? (
            <ol>
              {guidance.nextSteps.map(
                (
                  step,
                  index
                ) => (
                  <li key={index}>
                    {step}
                  </li>
                )
              )}
            </ol>
          ) : (
            <p>
              No next steps available.
            </p>
          )}
        </div>
      )}

      <hr />

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

export default CareerGuidance;