import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";


function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    securityQuestions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });

  const [showPassword, setShowPassword] = useState(false);

  const questionsList = [
    "What is your pet name?",
    "What is your school name?",
    "What is your favorite color?",
    "What is your birthplace?",
    "What is your best friend name?",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...form.securityQuestions];
    updated[index][field] = value;
    setForm({ ...form, securityQuestions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div
      className="container mt-5 p-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "750px" }}>
        <h4 className="text-center mb-4" style={{ color: "#C8A96A" }}>
          Register
        </h4>

        <form onSubmit={handleSubmit}>

          {/* 🔹 NAME + EMAIL + PHONE */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label d-flex gap-2">
                <FaUser /> Name
              </label>
              <input type="text" className="form-control" name="name" onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label d-flex gap-2">
                <FaEnvelope /> Email
              </label>
              <input type="email" className="form-control" name="email" onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label d-flex gap-2">
                <FaPhone /> Phone
              </label>
              <input type="text" className="form-control" name="phone" onChange={handleChange} />
            </div>
          </div>

          {/* 🔹 PASSWORD + CONFIRM */}
          <div className="row">
            <div className="col-md-6 mb-3 position-relative">
              <label className="form-label d-flex gap-2">
                <FaLock /> Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "38px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label d-flex gap-2">
                <FaLock /> Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 🔹 SECURITY QUESTIONS */}
          {form.securityQuestions.map((q, i) => (
            <div className="row" key={i}>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Question {i + 1}
                </label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleQuestionChange(i, "question", e.target.value)
                  }
                >
                  <option value="">Select Question</option>
                  {questionsList.map((ques, index) => (
                    <option key={index} value={ques}>
                      {ques}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Answer"
                  onChange={(e) =>
                    handleQuestionChange(i, "answer", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* 🔹 BUTTON */}
          <button className="btn w-100 login-btn mt-2">
            Register
          </button>

          {/* 🔹 LOGIN LINK */}
          <div className="text-center mt-3">
            Already have an account?{" "}
            <span
              style={{ color: "#C8A96A", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;