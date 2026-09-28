import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LearningRoadmap() {
  const navigate = useNavigate();

  const [missingSkills, setMissingSkills] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(false);
  const [resourceLoading, setResourceLoading] = useState(false);

  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // Load Missing Skills
  // --------------------------------------------------

  useEffect(() => {
    const storedSkills =
      localStorage.getItem("missingSkills");

    if (storedSkills) {
      try {
        const skills = JSON.parse(storedSkills);

        if (Array.isArray(skills)) {
          setMissingSkills(skills);
        }
      } catch (error) {
        console.error(
          "Failed to load missing skills:",
          error
        );
      }
    }
  }, []);

  // --------------------------------------------------
  // Generate Learning Roadmap
  // --------------------------------------------------

  const generateRoadmap = async () => {
    if (missingSkills.length === 0) {
      setMessage(
        "No missing skills found. Please perform Skill Gap Analysis first."
      );
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");
    setRoadmap([]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/roadmap/generate",
        {
          missingSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Learning Roadmap:",
        response.data
      );

      setRoadmap(
        response.data.roadmap || []
      );

      setMessage(
        "Learning roadmap generated successfully!"
      );
    } catch (error) {
      console.error(
        "Learning Roadmap Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to generate learning roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Get Resources
  // --------------------------------------------------

  const getResources = async () => {
    if (missingSkills.length === 0) {
      setMessage(
        "No missing skills available."
      );
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
          skills: missingSkills,
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

      setResources(
        response.data.resources || []
      );

      setMessage(
        "Learning resources loaded successfully!"
      );
    } catch (error) {
      console.error(
        "Learning Resources Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to load learning resources."
      );
    } finally {
      setResourceLoading(false);
    }
  };

  // --------------------------------------------------
  // Find resources for roadmap skill
  // --------------------------------------------------

  const getSkillResources = (skill) => {
    return resources.find(
      (resource) =>
        resource.skill?.toLowerCase().trim() ===
        skill?.toLowerCase().trim()
    );
  };

  return (
    <div>
      <h1> Learning Roadmap</h1>

      <p>
        Follow this personalized roadmap to
        improve your missing skills.
      </p>

      <hr />

      {/* ------------------------------------------------ */}
      {/* Missing Skills */}
      {/* ------------------------------------------------ */}

      <h2> Missing Skills</h2>

      {missingSkills.length > 0 ? (
        <ul>
          {missingSkills.map(
            (skill, index) => (
              <li key={index}>
                {skill}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>
          No missing skills found.
        </p>
      )}

      <br />

      {/* ------------------------------------------------ */}
      {/* Buttons */}
      {/* ------------------------------------------------ */}

      <button
        onClick={generateRoadmap}
        disabled={
          loading ||
          missingSkills.length === 0
        }
      >
        {loading
          ? "Generating Roadmap..."
          : "Generate Learning Roadmap"}
      </button>

      {" "}

      <button
        onClick={getResources}
        disabled={
          resourceLoading ||
          missingSkills.length === 0
        }
      >
        {resourceLoading
          ? "Loading Resources..."
          : "Get Learning Resources"}
      </button>

      {message && (
        <p>{message}</p>
      )}

      {/* ------------------------------------------------ */}
      {/* Roadmap */}
      {/* ------------------------------------------------ */}

      {roadmap.length > 0 && (
        <div>
          <hr />

          <h2>
             Your Personalized Roadmap
          </h2>

          {roadmap.map(
            (item, index) => {
              const skillResource =
                getSkillResources(
                  item.skill
                );

              return (
                <div key={index}>
                  <hr />

                  <h2>
                    {index + 1}.{" "}
                    {item.skill}
                  </h2>

                  {/* Priority */}

                  <p>
                    <strong>
                      Priority:
                    </strong>{" "}
                    {item.priority}
                  </p>

                  {/* Reason */}

                  <h3>
                     Why Learn This?
                  </h3>

                  <p>
                    {item.reason}
                  </p>

                  {/* Topics */}

                  <h3>
                     Topics to Learn
                  </h3>

                  {item.topics?.length >
                  0 ? (
                    <ul>
                      {item.topics.map(
                        (
                          topic,
                          topicIndex
                        ) => (
                          <li
                            key={
                              topicIndex
                            }
                          >
                            {topic}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      No topics available.
                    </p>
                  )}

                  {/* Projects */}

                  <h3>
                     Practice Projects
                  </h3>

                  {item.practiceProjects
                    ?.length > 0 ? (
                    <ul>
                      {item.practiceProjects.map(
                        (
                          project,
                          projectIndex
                        ) => (
                          <li
                            key={
                              projectIndex
                            }
                          >
                            {project}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      No projects available.
                    </p>
                  )}

                  {/* Time */}

                  <h3>
                     Estimated Time
                  </h3>

                  <p>
                    {item.estimatedTime}
                  </p>

                  {/* ------------------------------------------------ */}
                  {/* Resources for this skill */}
                  {/* ------------------------------------------------ */}

                  {skillResource && (
                    <div>
                      <hr />

                      <h3>
                         Resources for{" "}
                        {item.skill}
                      </h3>

                      {/* AI Notes */}

                      {skillResource.notes
                        ?.length > 0 && (
                        <div>
                          <h4>
                             AI Study Notes
                          </h4>

                          {skillResource.notes.map(
                            (
                              note,
                              noteIndex
                            ) => (
                              <div
                                key={
                                  noteIndex
                                }
                              >
                                <h5>
                                  {
                                    note.topic
                                  }
                                </h5>

                                <p>
                                  {
                                    note.explanation
                                  }
                                </p>

                                {note
                                  .importantPoints
                                  ?.length >
                                  0 && (
                                  <ul>
                                    {note.importantPoints.map(
                                      (
                                        point,
                                        pointIndex
                                      ) => (
                                        <li
                                          key={
                                            pointIndex
                                          }
                                        >
                                          {
                                            point
                                          }
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* YouTube Videos */}

                      {skillResource.videos
                        ?.length > 0 && (
                        <div>
                          <h4>
                             YouTube Videos
                          </h4>

                          {skillResource.videos.map(
                            (
                              video,
                              videoIndex
                            ) => (
                              <div
                                key={
                                  videoIndex
                                }
                              >
                                <p>
                                  <strong>
                                    {
                                      video.title
                                    }
                                  </strong>
                                </p>

                                <p>
                                  Channel:{" "}
                                  {
                                    video.channelTitle
                                  }
                                </p>

                                <a
                                  href={
                                    video.url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                   Watch Video
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* YouTube Channels */}

                      {skillResource.channels
                        ?.length > 0 && (
                        <div>
                          <h4>
                             YouTube Channels
                          </h4>

                          {skillResource.channels.map(
                            (
                              channel,
                              channelIndex
                            ) => (
                              <div
                                key={
                                  channelIndex
                                }
                              >
                                <p>
                                  <strong>
                                    {
                                      channel.channelTitle
                                    }
                                  </strong>
                                </p>

                                <a
                                  href={
                                    channel.url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Visit Channel
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* Practice Websites */}

                      {skillResource
                        .practiceWebsites
                        ?.length > 0 && (
                        <div>
                          <h4>
                             Practice Websites
                          </h4>

                          <ul>
                            {skillResource.practiceWebsites.map(
                              (
                                website,
                                websiteIndex
                              ) => (
                                <li
                                  key={
                                    websiteIndex
                                  }
                                >
                                  <a
                                    href={
                                      website.url
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {
                                      website.name
                                    }
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      <hr />

      {/* Navigation */}

      <button
        onClick={() =>
          navigate("/skill-gap")
        }
      >
        ← Back to Skill Gap
      </button>

      {" "}

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Dashboard
      </button>
    </div>
  );
}

export default LearningRoadmap;