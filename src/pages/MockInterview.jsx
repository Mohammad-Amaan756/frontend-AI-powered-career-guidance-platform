import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MockInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState(null);

  const [questionNumber, setQuestionNumber] =
    useState(0);

  const [loadingQuestion, setLoadingQuestion] =
    useState(false);

  const [loadingFeedback, setLoadingFeedback] =
    useState(false);

  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // Get Interview Question
  // --------------------------------------------------

  const getQuestion = async (isNext = false) => {
    if (!role.trim()) {
      setMessage(
        "Please enter a target job role."
      );
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingQuestion(true);
    setMessage("");
    setQuestion("");
    setAnswer("");
    setFeedback(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/interview/question",
        {
          role,
          difficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(
        response.data.question
      );

      if (isNext) {
        setQuestionNumber(
          (previous) => previous + 1
        );
      } else {
        setQuestionNumber(1);
      }

    } catch (error) {
      console.error(
        "Interview Question Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to generate interview question."
      );

    } finally {
      setLoadingQuestion(false);
    }
  };

  // --------------------------------------------------
  // Start Interview
  // --------------------------------------------------

  const startInterview = () => {
    getQuestion(false);
  };

  // --------------------------------------------------
  // Submit Answer
  // --------------------------------------------------

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setMessage(
        "Please write your answer first."
      );
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingFeedback(true);
    setMessage("");
    setFeedback(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/interview/evaluate",
        {
          role,
          difficulty,
          question,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedback(
        response.data.feedback
      );

    } catch (error) {
      console.error(
        "Interview Evaluation Error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to evaluate your answer."
      );

    } finally {
      setLoadingFeedback(false);
    }
  };

  // --------------------------------------------------
  // Next Question
  // --------------------------------------------------

  const nextQuestion = () => {
    getQuestion(true);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div>
      <h1> Mock Interview</h1>

      <p>
        Practice interview questions and receive
        AI-powered feedback on your answers.
      </p>

      <hr />

      {/* Interview Setup */}

      <h2>Interview Setup</h2>

      <label>
        Target Job Role:
      </label>

      <br />

      <input
        type="text"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        placeholder="Example: Backend Developer"
      />

      <br />
      <br />

      <label>
        Difficulty:
      </label>

      <br />

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
      >
        <option value="Easy">
          Easy
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Hard">
          Hard
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={startInterview}
        disabled={loadingQuestion}
      >
        {loadingQuestion
          ? "Generating Question..."
          : "Start Interview"}
      </button>

      {/* Message */}

      {message && (
        <p>
          {message}
        </p>
      )}

      {/* Question */}

      {question && (
        <div>
          <hr />

          <h2>
            Question {questionNumber}
          </h2>

          <p>
            <strong>
              {question}
            </strong>
          </p>

          <h3>
            Your Answer
          </h3>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Write your interview answer here..."
            rows="10"
            cols="70"
          />

          <br />
          <br />

          <button
            onClick={submitAnswer}
            disabled={loadingFeedback}
          >
            {loadingFeedback
              ? "Evaluating Answer..."
              : "Submit Answer"}
          </button>
        </div>
      )}

      {/* Feedback */}

      {feedback && (
        <div>
          <hr />

          <h2>
             Interview Feedback
          </h2>

          <h3>
            Score
          </h3>

          <p>
            <strong>
              {feedback.score}/100
            </strong>
          </p>

          <h3>
             Strengths
          </h3>

          <ul>
            {feedback.strengths?.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h3>
             Areas to Improve
          </h3>

          <ul>
            {feedback.areasToImprove?.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h3>
             Better Answer
          </h3>

          <p>
            {feedback.betterAnswer}
          </p>

          <h3>
             Communication Feedback
          </h3>

          <p>
            {feedback.communicationFeedback}
          </p>

          <br />

          <button
            onClick={nextQuestion}
            disabled={loadingQuestion}
          >
            {loadingQuestion
              ? "Generating..."
              : "Next Question →"}
          </button>
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

export default MockInterview;