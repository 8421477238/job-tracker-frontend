import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-box">JT</div>

        <div>
          <h2>Job Tracker</h2>
          <p>Placement Dashboard</p>
        </div>
      </div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Dashboard
        </Link>

        <Link
          to="/add-job"
          className={
            location.pathname === "/add-job"
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Add Job
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;