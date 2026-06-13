import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";

function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    career_role: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        mobile: res.data.user.mobile || "",
        career_role: res.data.user.career_role || "React Developer",
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    if (!profile.name || !profile.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put("/auth/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await API.put("/auth/change-password", passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Account deleted successfully");

      setShowDeleteModal(false);

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your profile, contact details, and account preferences."
    >
      <section className="settings-hero">
        <div>
          <div className="next-hero-badge">⚙️ Account Control Center</div>

          <h1>Manage your career workspace.</h1>

          <p>
            Update your personal information, contact details, security
            preferences, and account settings from one professional dashboard.
          </p>
        </div>
      </section>

      <section className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">👤</div>

            <div>
              <h2>Personal Details</h2>
              <p>Manage your basic profile information.</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Darshan Ahire"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="settings-form-group">
              <label>Career Role</label>

              <input
                type="text"
                name="career_role"
                placeholder="React Developer"
                value={profile.career_role}
                onChange={handleChange}
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">📧</div>

            <div>
              <h2>Email Address</h2>
              <p>Update your account email address.</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="darshan@example.com"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Email"}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">📱</div>

            <div>
              <h2>Mobile Number</h2>
              <p>Add your contact number for placement communication.</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                placeholder="+91 98765 43210"
                value={profile.mobile}
                onChange={handleChange}
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Number"}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🔐</div>

            <div>
              <h2>Change Password</h2>
              <p>Update your account password securely.</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-form-group">
              <label>Current Password</label>

              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="settings-form-group">
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="settings-form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={changePassword}
              disabled={passwordLoading}
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        <div className="settings-card danger-settings-card">
          <div className="settings-card-header">
            <div className="settings-icon danger-icon">⚠️</div>

            <div>
              <h2>Delete Account</h2>
              <p>Permanently delete your account and all stored data.</p>
            </div>
          </div>

          <div className="danger-zone-box">
            <p>
              This action will permanently delete your jobs, resumes, and
              account details. This cannot be undone.
            </p>

            <button
              className="delete-account-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Account?"
        message="This will permanently delete your account, jobs, resumes, and all saved data. This action cannot be undone."
        onConfirm={deleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
    </DashboardLayout>
  );
}

export default Settings;