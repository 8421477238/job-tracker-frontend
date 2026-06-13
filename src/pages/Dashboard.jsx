import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicationTimeline from "../components/ApplicationTimeline";
import ConfirmModal from "../components/ConfirmModal";

const statusOptions = [
  "Applied",
  "Interview Scheduled",
  "Technical Round",
  "HR Round",
  "Selected",
  "Rejected",
];

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/jobs/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.stats);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const updateJobStatus = async (id, status) => {
    try {
      await API.put(
        `/jobs/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job status updated");

      fetchJobs();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedJobId(id);
    setShowDeleteModal(true);
  };

  const deleteJob = async () => {
    try {
      await API.delete(`/jobs/${selectedJobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job deleted successfully");

      setShowDeleteModal(false);
      setSelectedJobId(null);

      fetchJobs();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const getStatCount = (statusName) => {
    const found = stats.find((item) => item.status === statusName);
    return found ? found.count : 0;
  };

  const totalApplications = jobs.length;
  const activeApplications =
    getStatCount("Applied") +
    getStatCount("Interview Scheduled") +
    getStatCount("Technical Round") +
    getStatCount("HR Round");

  const selectedApplications = getStatCount("Selected");
  const rejectedApplications = getStatCount("Rejected");

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.company_name.toLowerCase().includes(searchText) ||
      job.role.toLowerCase().includes(searchText) ||
      job.status.toLowerCase().includes(searchText);

    const matchesFilter = filter ? job.status === filter : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout
      title="Command Center"
      subtitle="Your modern placement control room."
    >
      <section className="next-dashboard-hero">
        <div className="next-hero-content">
          <div className="next-hero-badge">🚀 Career Operating System</div>

          <h1>Build your placement pipeline with clarity.</h1>

          <p>
            Track every company, interview stage, resume asset, and preparation
            workflow inside one premium dashboard.
          </p>

          <div className="next-hero-actions">
            <span>{totalApplications} total applications</span>
            <span>{activeApplications} active opportunities</span>
          </div>
        </div>

        <div className="next-hero-orbit">
          <div className="orbit-card orbit-card-main">
            <span>Placement Score</span>
            <h2>{totalApplications > 0 ? "86%" : "0%"}</h2>
            <p>Based on activity</p>
          </div>

          <div className="orbit-mini-card mini-one">
            <strong>{selectedApplications}</strong>
            <span>Selected</span>
          </div>

          <div className="orbit-mini-card mini-two">
            <strong>{activeApplications}</strong>
            <span>Active</span>
          </div>
        </div>
      </section>

      <section className="next-kpi-grid">
        <div className="next-kpi-card blue-kpi">
          <div>
            <span>Total Applications</span>
            <h2>{totalApplications}</h2>
          </div>
          <div className="kpi-icon">📦</div>
        </div>

        <div className="next-kpi-card green-kpi">
          <div>
            <span>Selected</span>
            <h2>{selectedApplications}</h2>
          </div>
          <div className="kpi-icon">🏆</div>
        </div>

        <div className="next-kpi-card purple-kpi">
          <div>
            <span>Active Pipeline</span>
            <h2>{activeApplications}</h2>
          </div>
          <div className="kpi-icon">⚡</div>
        </div>

        <div className="next-kpi-card red-kpi">
          <div>
            <span>Rejected</span>
            <h2>{rejectedApplications}</h2>
          </div>
          <div className="kpi-icon">🔁</div>
        </div>
      </section>

      <section className="next-dashboard-grid">
        <div className="next-left-panel">
          <ApplicationTimeline jobs={jobs} />
        </div>

        <div className="next-right-panel">
          <div className="next-insight-card">
            <p className="eyebrow">Smart Insight</p>
            <h3>Keep your pipeline moving</h3>
            <p>
              Update job statuses after every interview round. This makes your
              dashboard more useful and improves your placement tracking.
            </p>
          </div>

          <div className="next-status-breakdown">
            {statusOptions.map((status) => (
              <div className="status-row" key={status}>
                <span>{status}</span>
                <strong>{getStatCount(status)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="next-applications-panel">
        <div className="next-panel-header">
          <div>
            <p className="eyebrow">Application CRM</p>
            <h2>All Applications</h2>
            <p>
              Search, filter, update status, and manage applications from one
              clean workspace.
            </p>
          </div>
        </div>

        <div className="next-toolbar">
          <input
            type="text"
            placeholder="Search company, role, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Status</option>

            {statusOptions.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="next-table-wrapper">
          <table className="next-jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No job applications found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="company-cell">
                        <div className="company-logo">
                          {job.company_name.charAt(0).toUpperCase()}
                        </div>

                        <strong>{job.company_name}</strong>
                      </div>
                    </td>

                    <td>{job.role}</td>

                    <td>
                      <select
                        className="next-status-select"
                        value={job.status}
                        onChange={(e) =>
                          updateJobStatus(job.id, e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option value={status} key={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{job.notes || "-"}</td>

                    <td>
                      <button
                        className="next-delete-btn"
                        onClick={() => openDeleteModal(job.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Application?"
        message="This job application will be permanently removed. This action cannot be undone."
        onConfirm={deleteJob}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedJobId(null);
        }}
      />
    </DashboardLayout>
  );
}

export default Dashboard;