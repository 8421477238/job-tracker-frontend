import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import AuthVisual from "../components/AuthVisual";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message || "Reset link sent");
      setSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link"
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

          <p className="eyebrow">Account Recovery</p>

          <h2>Forgot Password?</h2>

          <p className="auth-subtitle">
            Enter your registered email. We will send you a secure password
            reset link.
          </p>

          {sent ? (
            <div className="reset-success-box">
              <h3>Check your email</h3>
              <p>
                We sent a password reset link to <strong>{email}</strong>.
                Please open Gmail and click the reset link.
              </p>

              <Link className="back-login-link" to="/">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Registered Email Address</label>

              <input
                type="email"
                placeholder="darshan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <p className="auth-link">
            Remember password? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;