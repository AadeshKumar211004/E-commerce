import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

function LoginForm() {
  const [username, setUsername] = useState(""); // email OR phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔴 BASIC VALIDATION
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      const res = await API.post("/login", {
        username,
        password,
      });

      // 🔥 SAVE TOKEN + ROLE
      login(res.data.token, res.data.role);

      toast.success("Login successful!");
      // alert("Login successful. Welcome back!");

      navigate("/");
    } catch (error) {
      toast.error(
          "Invalid credentials. Please try again.",
      );
    }
  };

  return (
    <div className="card p-4 shadow" style={{ width: "400px" }}>
      {/* 🔥 HEADING */}
      <h2
        className="text-center mb-4"
        style={{ color: "#C8A96A", fontWeight: "600" }}
      >
        Login
      </h2>

      <form onSubmit={handleLogin}>
        {/* USERNAME */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold d-flex align-items-center gap-2">
            <FaUser style={{ color: "#C8A96A" }} />
            Username
          </label>
          <input
            type="text"
            className="form-control "
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2 text-start position-relative">
          <label className="form-label fw-bold d-flex align-items-center gap-2">
            <FaLock style={{ color: "#C8A96A" }} />
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 👁️ ICON */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "38px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* FORGOT */}
        <div className="d-flex justify-content-between mb-3">
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/forgot-password")}
            style={{ color: "#C8A96A", textDecoration: "none" }}
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className=" login-btn btn w-100"
          // style={{
          //   backgroundColor: "#1A1A1A",
          //   color: "#F5F2EB",
          // }}
        >
          Login
        </button>
      </form>

      {/* REGISTER */}
      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <button
          className="btn btn-link p-0"
          onClick={() => navigate("/register")}
          style={{ color: "#C8A96A" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
