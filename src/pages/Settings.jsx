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

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    interviewReminders: true,
    resumeTips: true,
    jobAlerts: true,
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

  const togglePreference = (key) => {
    const updatedPreferences = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(updatedPreferences);

    localStorage.setItem(
      "jobTrackerPreferences",
      JSON.stringify(updatedPreferences)
    );

    toast.success("Preference updated");
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

  const exportAccountData = () => {
    const data = {
      profile,
      preferences,
      exportedAt: new Date().toLocaleString(),
      app: "Job Tracker",
    };

    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "job-tracker-account-data.json";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Account data exported");
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

  const getInitials = () => {
    if (!profile.name) return "U";

    return profile.name
      .split(" ")
      .map((item) => item.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const profileCompletion = Math.round(
    ([profile.name, profile.email, profile.mobile, profile.career_role].filter(
      Boolean
    ).length /
      4) *
      100
  );

  useEffect(() => {
    fetchProfile();

    const savedPreferences = localStorage.getItem("jobTrackerPreferences");

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your profile, security, preferences, and career workspace."
    >
      <section className="premium-settings-hero">
        <div>
          <div className="next-hero-badge">⚙️ Career Control Center</div>

          <h1>Personalize your career workspace.</h1>

          <p>
            Manage your profile, account security, notifications, data export,
            and workspace preferences from one premium dashboard.
          </p>
        </div>

        <div className="settings-profile-preview">
          <div className="settings-avatar-xl">{getInitials()}</div>

          <h2>{profile.name || "Your Name"}</h2>

          <p>{profile.career_role || "Career Candidate"}</p>

          <div className="profile-completion">
            <div>
              <span>Profile Completion</span>
              <strong>{profileCompletion}%</strong>
            </div>

            <div className="completion-track">
              <div style={{ width: `${profileCompletion}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-insight-grid">
        <div className="settings-insight-card blue">
          <span>Career Score</span>
          <h2>{profileCompletion}%</h2>
          <p>Profile completion status</p>
        </div>

        <div className="settings-insight-card purple">
          <span>Account Type</span>
          <h2>Pro</h2>
          <p>Premium workspace</p>
        </div>

        <div className="settings-insight-card green">
          <span>Security</span>
          <h2>100%</h2>
          <p>Account protected</p>
        </div>

        <div className="settings-insight-card orange">
          <span>Status</span>
          <h2>Active</h2>
          <p>Workspace operational</p>
        </div>
      </section>

      <section className="premium-settings-grid">
        <div className="premium-settings-card large">
          <div className="premium-settings-header">
            <div className="settings-icon premium-icon">👤</div>

            <div>
              <h2>Profile Information</h2>
              <p>Update your personal and career identity.</p>
            </div>
          </div>

          <div className="premium-settings-form two-column">
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

            <div className="settings-form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="darshan@example.com"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="settings-form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                placeholder="+919876543210"
                value={profile.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="settings-primary-btn"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? "Saving Profile..." : "Save Profile Changes"}
          </button>
        </div>

        <div className="premium-settings-card large">
          <div className="premium-settings-header">
            <div className="settings-icon premium-icon">🔔</div>

            <div>
              <h2>Notification Center</h2>
              <p>Enable or disable career workflow alerts.</p>
            </div>
          </div>

          <div className="notification-list">
            <button
              className={
                preferences.emailNotifications
                  ? "notification-toggle active"
                  : "notification-toggle"
              }
              onClick={() => togglePreference("emailNotifications")}
            >
              <span>📧 Email Notifications</span>
              <strong>{preferences.emailNotifications ? "ON" : "OFF"}</strong>
            </button>

            <button
              className={
                preferences.interviewReminders
                  ? "notification-toggle active"
                  : "notification-toggle"
              }
              onClick={() => togglePreference("interviewReminders")}
            >
              <span>🎯 Interview Reminders</span>
              <strong>{preferences.interviewReminders ? "ON" : "OFF"}</strong>
            </button>

            <button
              className={
                preferences.resumeTips
                  ? "notification-toggle active"
                  : "notification-toggle"
              }
              onClick={() => togglePreference("resumeTips")}
            >
              <span>📄 Resume Tips</span>
              <strong>{preferences.resumeTips ? "ON" : "OFF"}</strong>
            </button>

            <button
              className={
                preferences.jobAlerts
                  ? "notification-toggle active"
                  : "notification-toggle"
              }
              onClick={() => togglePreference("jobAlerts")}
            >
              <span>💼 Job Application Alerts</span>
              <strong>{preferences.jobAlerts ? "ON" : "OFF"}</strong>
            </button>
          </div>
        </div>

        <div className="premium-settings-card">
          <div className="premium-settings-header">
            <div className="settings-icon premium-icon">🔐</div>

            <div>
              <h2>Security</h2>
              <p>Update your password securely.</p>
            </div>
          </div>

          <div className="premium-settings-form">
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
          </div>

          <button
            className="settings-primary-btn"
            onClick={changePassword}
            disabled={passwordLoading}
          >
            {passwordLoading ? "Updating Password..." : "Update Password"}
          </button>
        </div>

        <div className="premium-settings-card danger-premium-card">
          <div className="premium-settings-header">
            <div className="settings-icon danger-icon">⚠️</div>

            <div>
              <h2>Data & Account</h2>
              <p>Export your data or permanently delete your account.</p>
            </div>
          </div>

          <div className="data-action-box">
            <button className="export-data-btn" onClick={exportAccountData}>
              Export My Data
            </button>

            <button
              className="delete-account-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>

          <p className="danger-note">
            Deleting your account will permanently remove your jobs, resumes,
            profile, and saved data. This action cannot be undone.
          </p>
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