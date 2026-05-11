import { useState } from "react";
import API from "../services/api";
import { FaArrowLeft, FaUserLock } from "react-icons/fa";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGetQuestions = async () => {
    try {
      const res = await API.post("/forgot-password", { username });

      setQuestions(res.data.questions);
      setUserId(res.data.userId);
      setStep(2);
    } catch (error) {
      toast.error("User not found");
    }
  };

  const handleReset = async () => {

    // 🔴 PASSWORD MATCH CHECK
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/reset-password", {
        userId,
        answers,
        newPassword,
      });

      toast.success("Password reset successful");

      // ✅ RESET ALL FIELDS
      setStep(1);
      setUsername("");
      setAnswers(["", "", ""]);
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      toast.error("Incorrect answers");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <div className="card p-4 shadow" style={{ width: "720px" }}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            {/* 🔙 BACK + HEADING */}
            <div className="d-flex align-items-center mb-3">
              <FaArrowLeft
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => window.history.back()}
              />

              <h4 className="fw-bold" style={{ color: "#C8A96A", margin: 0 }}>
                Forgot Password
              </h4>
            </div>

            {/* 🔐 LABEL WITH ICON */}
            <label className="d-flex align-items-center gap-2 fw-bold">
              <FaUserLock style={{ color: "#C8A96A" }} />
              Username
            </label>

            <input
              className="form-control my-3"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              className="btn login-btn w-100"
              onClick={handleGetQuestions}
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h4 className="mb-3 text-center" style={{ color: "#C8A96A" }}>
              Security Verification
            </h4>

            {questions.map((q, i) => (
              <div key={i} className="mb-3">
                <label>{q}</label>
                <input
                  className="form-control"
                  placeholder="Your Answer"
                  onChange={(e) => {
                    const updated = [...answers];
                    updated[i] = e.target.value;
                    setAnswers(updated);
                  }}
                />
              </div>
            ))}

            {/* NEW PASSWORD */}
            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="btn login-btn w-100"
              onClick={handleReset}
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;