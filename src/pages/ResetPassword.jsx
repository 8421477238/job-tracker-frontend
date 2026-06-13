import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import AuthVisual from "../components/AuthVisual";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
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

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put(`/auth/reset-password/${token}`, formData);

      toast.success(res.data.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password"
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

          <p className="eyebrow">Create New Password</p>

          <h2>Reset Password</h2>

          <p className="auth-subtitle">
            Enter your new password and confirm it to recover your account.
          </p>

          <form onSubmit={handleSubmit}>
            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Updating Password..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-link">
            Back to <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;