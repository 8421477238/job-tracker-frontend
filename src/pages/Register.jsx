import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      toast.success(
        res.data.message || "Account created successfully"
      );

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page modern-auth-page">
      <div className="auth-bg-orb orb-1"></div>
      <div className="auth-bg-orb orb-2"></div>
      <div className="auth-bg-orb orb-3"></div>

      {/* LEFT SIDE */}

      <div className="auth-left modern-auth-left">
        <div className="brand-box premium-brand">
          <div className="brand-icon">JT</div>

          <div>
            <h2>Job Tracker AI</h2>
            <p>Career Operating System</p>
          </div>
        </div>

        <div className="hero-content">
          <span className="hero-badge">
            🚀 Trusted by Students & Job Seekers
          </span>

          <h1>
            Turn your job search into a
            <span> structured career journey.</span>
          </h1>

          <p>
            Track applications, manage interviews, organize resumes,
            prepare for placements, and grow faster with AI-powered
            career tools.
          </p>

          <div className="modern-feature-grid">
            <div className="feature-card-mini">
              <span>📊</span>
              <h4>Smart Dashboard</h4>
            </div>

            <div className="feature-card-mini">
              <span>📄</span>
              <h4>Resume Vault</h4>
            </div>

            <div className="feature-card-mini">
              <span>🤖</span>
              <h4>AI Interview Prep</h4>
            </div>

            <div className="feature-card-mini">
              <span>🚀</span>
              <h4>Career Copilot</h4>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">
        <div className="modern-auth-card">
          <div className="card-header">
            <span className="eyebrow">
              Create Account
            </span>

            <h2>Join Job Tracker AI</h2>

            <p>
              Create your account and start tracking your career
              growth today.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modern-input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Darshan Ahire"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="modern-input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="darshan@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="modern-input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create secure password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="modern-auth-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-link">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;