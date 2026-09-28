import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    education: "",
    skills: "",
    certifications: "",
    projects: "",
    interests: "",
    careerPreferences: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;

        setFormData({
          name: user.name || "",
          education: user.education || "",
          skills: user.skills?.join(", ") || "",
          certifications:
            user.certifications?.join(", ") || "",
          projects:
            user.projects?.join(", ") || "",
          interests:
            user.interests?.join(", ") || "",
          careerPreferences:
            user.careerPreferences?.join(", ") || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Profile loading error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load profile."
        );

        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      setSaving(false);
      navigate("/login");
      return;
    }

    try {
      const profileData = {
        name: formData.name,
        education: formData.education,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        certifications: formData.certifications
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        projects: formData.projects
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        interests: formData.interests
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        careerPreferences:
          formData.careerPreferences
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
      };

      console.log("Sending profile data:", profileData);

      const response = await axios.put(
        "http://localhost:5000/api/profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile response:", response.data);

      setMessage(" Profile saved successfully!");

    } catch (error) {
      console.error("Profile save error:", error);

      setMessage(
        error.response?.data?.message ||
          " Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>My Profile</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <br />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <br />

        <div>
          <label>Education</label>
          <br />

          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Example: B.Tech Computer Science"
          />
        </div>

        <br />

        <div>
          <label>Skills</label>
          <br />

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />

          <br />

          <small>
            Separate skills using commas.
          </small>
        </div>

        <br />

        <div>
          <label>Certifications</label>
          <br />

          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="AWS, JavaScript Certification"
          />
        </div>

        <br />

        <div>
          <label>Projects</label>
          <br />

          <input
            type="text"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="AI Career Guidance Platform"
          />
        </div>

        <br />

        <div>
          <label>Interests</label>
          <br />

          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Artificial Intelligence, Web Development"
          />
        </div>

        <br />

        <div>
          <label>Career Preferences</label>
          <br />

          <input
            type="text"
            name="careerPreferences"
            value={formData.careerPreferences}
            onChange={handleChange}
            placeholder="Software Developer, AI Engineer"
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>

      </form>

      <br />

      {message && (
        <p>
          {message}
        </p>
      )}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;