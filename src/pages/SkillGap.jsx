import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SkillGap() {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const [resources, setResources] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resourceLoading, setResourceLoading] = useState(false);

  // ---------------------------------------------
  // Analyze Skill Gap
  // ---------------------------------------------

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
    setResources([]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/skill-gap/analyze",
        {
          jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data);

      setMessage(
        "Skill Gap Analysis completed successfully!"
      );
    } catch (error) {
      console.error("Skill Gap Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to perform Skill Gap Analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------
  // Get Learning Resources
  // ---------------------------------------------

  const handleLearningResources = async () => {
    if (
      !result?.missingSkills ||
      result.missingSkills.length === 0
    ) {
      setMessage("No missing skills available.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setResourceLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resources/recommend",
        {
          skills: result.missingSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Learning Resources:",
        response.data
      );

      setResources(response.data.resources || []);

      setMessage(
        "Learning resources generated successfully!"
      );
    } catch (error) {
      console.error(
        "Learning Resource Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch learning resources."
      );
    } finally {
      setResourceLoading(false);
    }
  };

  // ---------------------------------------------
  // Generate Learning Roadmap
  // ---------------------------------------------

  const handleLearningRoadmap = () => {
    if (
      !result?.missingSkills ||
      result.missingSkills.length === 0
    ) {
      setMessage("No missing skills available.");
      return;
    }

    // Store missing skills temporarily
    localStorage.setItem(
      "missingSkills",
      JSON.stringify(result.missingSkills)
    );

    // Navigate to roadmap page
    navigate("/learning-roadmap");
  };

  return (
    <div>
      <h1>Skill Gap Analysis</h1>

      <p>
        Compare your current skills with the skills
        required for a Job Description.
      </p>

      {/* ----------------------------------------- */}
      {/* Job Description Form */}
      {/* ----------------------------------------- */}

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

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Skill Gap"}
        </button>
      </form>

      <br />

      {message && <p>{message}</p>}

      {/* ----------------------------------------- */}
      {/* Skill Gap Result */}
      {/* ----------------------------------------- */}

      {result && (
        <div>
          <hr />

          <h2>Skill Gap Result</h2>

          {/* Job Information */}

          <h3>Job</h3>

          <p>
            <strong>Position:</strong>{" "}
            {result.job?.title}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {result.job?.experience ||
              "Not specified"}
          </p>

          {/* Skill Match */}

          <h3>Skill Match</h3>

          <h1>{result.matchPercentage}%</h1>

          {/* Student Skills */}

          <h3>My Skills</h3>

          {result.studentSkills?.length > 0 ? (
            <ul>
              {result.studentSkills.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          ) : (
            <p>No skills found in your profile.</p>
          )}

          {/* Matched Skills */}

          <h3>Matched Skills </h3>

          {result.matchedSkills?.length > 0 ? (
            <ul>
              {result.matchedSkills.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          ) : (
            <p>No matched skills found.</p>
          )}

          {/* Missing Skills */}

          <h3>Missing Skills </h3>

          {result.missingSkills?.length > 0 ? (
            <ul>
              {result.missingSkills.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          ) : (
            <p>
              Excellent! No required skills are
              missing.
            </p>
          )}

          {/* Preferred Skills */}

          <h3>Preferred Skills </h3>

          {result.preferredSkills?.length > 0 ? (
            <ul>
              {result.preferredSkills.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          ) : (
            <p>No preferred skills specified.</p>
          )}

          {/* Missing Preferred Skills */}

          <h3>Missing Preferred Skills</h3>

          {result.missingPreferredSkills?.length >
          0 ? (
            <ul>
              {result.missingPreferredSkills.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
          ) : (
            <p>
              You have all the preferred skills.
            </p>
          )}

          {/* Qualifications */}

          <h3>Qualifications</h3>

          {result.job?.qualifications?.length > 0 ? (
            <ul>
              {result.job.qualifications.map(
                (qualification, index) => (
                  <li key={index}>
                    {qualification}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No qualifications specified.</p>
          )}

          {/* ------------------------------------- */}
          {/* Learning Resources */}
          {/* ------------------------------------- */}

          {result.missingSkills?.length > 0 && (
            <div>
              <hr />

              <h2>📚 Learning Resources</h2>

              <p>
                Get AI notes, YouTube videos,
                YouTube channels and practice
                websites for your missing skills.
              </p>

              <button
                onClick={handleLearningResources}
                disabled={resourceLoading}
              >
                {resourceLoading
                  ? "Finding Resources..."
                  : "Get Learning Resources"}
              </button>

              {/* --------------------------------- */}
              {/* Learning Roadmap */}
              {/* --------------------------------- */}

              <br />
              <br />

              <h2>
                 Personalized Learning Roadmap
              </h2>

              <p>
                Generate a step-by-step learning
                roadmap based on your missing skills.
              </p>

              <button
                onClick={handleLearningRoadmap}
              >
                Generate Learning Roadmap
              </button>
            </div>
          )}

          {/* ------------------------------------- */}
          {/* Resource Results */}
          {/* ------------------------------------- */}

          {resources.length > 0 && (
            <div>
              <hr />

              <h2>Recommended Resources</h2>

              {resources.map(
                (resource, index) => (
                  <div key={index}>
                    <hr />

                    <h2>
                       {resource.skill}
                    </h2>

                    {/* AI Notes */}

                    <h3> AI Study Notes</h3>

                    {resource.notes?.length > 0 ? (
                      resource.notes.map(
                        (note, noteIndex) => (
                          <div key={noteIndex}>
                            <h4>
                              {note.topic}
                            </h4>

                            <p>
                              {note.explanation}
                            </p>

                            <ul>
                              {note.importantPoints?.map(
                                (
                                  point,
                                  pointIndex
                                ) => (
                                  <li
                                    key={
                                      pointIndex
                                    }
                                  >
                                    {point}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )
                      )
                    ) : (
                      <p>
                        No notes available.
                      </p>
                    )}

                    {/* YouTube Videos */}

                    <h3>
                       Recommended YouTube
                      Videos
                    </h3>

                    {resource.videos?.length > 0 ? (
                      resource.videos.map(
                        (
                          video,
                          videoIndex
                        ) => (
                          <div
                            key={videoIndex}
                          >
                            <img
                              src={
                                video.thumbnail
                              }
                              alt={video.title}
                              width="200"
                            />

                            <p>
                              <strong>
                                {video.title}
                              </strong>
                            </p>

                            <p>
                              Channel:{" "}
                              {
                                video.channelTitle
                              }
                            </p>

                            <a
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Watch Video
                            </a>

                            <hr />
                          </div>
                        )
                      )
                    ) : (
                      <p>
                        No YouTube videos found.
                      </p>
                    )}

                    {/* YouTube Channels */}

                    <h3>
                       Recommended YouTube
                      Channels
                    </h3>

                    {resource.channels?.length > 0 ? (
                      resource.channels.map(
                        (
                          channel,
                          channelIndex
                        ) => (
                          <div
                            key={channelIndex}
                          >
                            <img
                              src={
                                channel.thumbnail
                              }
                              alt={
                                channel.channelTitle
                              }
                              width="100"
                            />

                            <p>
                              <strong>
                                {
                                  channel.channelTitle
                                }
                              </strong>
                            </p>

                            <a
                              href={channel.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Visit Channel
                            </a>

                            <hr />
                          </div>
                        )
                      )
                    ) : (
                      <p>
                        No YouTube channels found.
                      </p>
                    )}

                    {/* Practice Websites */}

                    <h3>
                       Practice Websites
                    </h3>

                    {resource.practiceWebsites
                      ?.length > 0 ? (
                      resource.practiceWebsites.map(
                        (
                          website,
                          websiteIndex
                        ) => (
                          <div
                            key={websiteIndex}
                          >
                            <p>
                              <strong>
                                {website.name}
                              </strong>
                            </p>

                            <a
                              href={website.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Practice Here
                            </a>
                          </div>
                        )
                      )
                    ) : (
                      <p>
                        No practice websites
                        available.
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      <br />

      {/* Back to Dashboard */}

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default SkillGap;