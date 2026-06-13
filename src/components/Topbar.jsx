import { useEffect, useState } from "react";

function Topbar({ title, subtitle, onMenuClick }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <header className="premium-topbar">
      <div className="premium-topbar-left">
        <button
          className="mobile-menu-btn premium-menu-btn"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <div>
          <p className="topbar-label">WORKSPACE</p>

          <h1>{title}</h1>

          <p className="topbar-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="premium-topbar-right">
        <button
          className="premium-theme-btn"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="premium-profile-pill">
          <div className="profile-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h4>{user?.name || "User"}</h4>

            <p>
              {user?.email || "Logged in"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;