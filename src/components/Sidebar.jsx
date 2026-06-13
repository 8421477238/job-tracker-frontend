import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside
      className={
        isOpen
          ? "sidebar sidebar-open premium-sidebar"
          : "sidebar premium-sidebar"
      }
    >
      <div className="sidebar-glow"></div>

      <div>
        <div className="sidebar-mobile-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <span>JT</span>
            </div>

            <div>
              <h2>Job Tracker</h2>
              <p>Career OS</p>
            </div>
          </div>

          <button
  type="button"
  className="sidebar-close-btn"
  onClick={() => {
    if (onClose) {
      onClose();
    }
  }}
>
  ✕
</button>
        </div>

        <div className="sidebar-section-title">WORKSPACE</div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            onClick={handleNavClick}
            className={
              isActive("/dashboard")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/add-job"
            onClick={handleNavClick}
            className={
              isActive("/add-job")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">💼</span>
            <span>Add Job</span>
          </Link>

          <Link
            to="/resume-vault"
            onClick={handleNavClick}
            className={
              isActive("/resume-vault")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">📄</span>
            <span>Resume Vault</span>
          </Link>

          <Link
            to="/resume-builder"
            onClick={handleNavClick}
            className={
              isActive("/resume-builder")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">🧾</span>
            <span>Resume Builder</span>
          </Link>

          <Link
            to="/interview-prep"
            onClick={handleNavClick}
            className={
              isActive("/interview-prep")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">🎯</span>
            <span>Interview Prep</span>
          </Link>

          <Link
            to="/ai-job-assistant"
            onClick={handleNavClick}
            className={
              isActive("/ai-job-assistant")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">✨</span>
            <span>AI Assistant</span>
          </Link>

          <Link
            to="/settings"
            onClick={handleNavClick}
            className={
              isActive("/settings")
                ? "sidebar-link active-sidebar-link"
                : "sidebar-link"
            }
          >
            <span className="sidebar-icon">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user premium-user-card">
          <div className="user-avatar">
            {getInitials(user?.name)}
          </div>

          <div>
            <h4>{user?.name || "User"}</h4>
            <p>{user?.career_role || "Career Candidate"}</p>
          </div>
        </div>

        <button
          className="sidebar-logout premium-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;