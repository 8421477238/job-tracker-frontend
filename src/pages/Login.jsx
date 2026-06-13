import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import AuthVisual from "../components/AuthVisual";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page modern-auth-page">
      <AuthVisual />

      <div className="auth-right modern-auth-right">
        <div className="auth-card modern-auth-card">
          <div className="auth-mobile-brand">
            <span className="brand-icon">JT</span>
            <h2>Job Tracker</h2>
          </div>

          <p className="eyebrow">Welcome back</p>

          <h2>Login to your account</h2>

          <p className="auth-subtitle">
            Enter your email and password to continue your placement journey.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="darshan@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-link">
            Don&apos;t have an account? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;