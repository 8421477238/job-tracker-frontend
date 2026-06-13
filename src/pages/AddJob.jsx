import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    status: "Applied",
    notes: "",
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

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job application added successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Add Application"
      subtitle="Create a new opportunity inside your placement pipeline."
    >
      <section className="next-add-hero">
        <div>
          <div className="next-hero-badge">💼 Application Builder</div>

          <h1>Add a new job opportunity.</h1>

          <p>
            Save company details, role information, current status, and personal
            notes so you never lose track of your placement journey.
          </p>
        </div>

        <div className="add-hero-preview">
          <div className="preview-card-line"></div>
          <div className="preview-card-line small"></div>
          <div className="preview-stage-pill">Applied</div>
          <div className="preview-stage-pill purple">Technical Round</div>
        </div>
      </section>

      <section className="next-add-grid">
        <aside className="next-add-guide">
          <p className="eyebrow">Quick Guide</p>

          <h2>Build a clean application record</h2>

          <p>
            A good job record helps you explain your job search clearly and
            track your interview progress professionally.
          </p>

          <div className="next-guide-list">
            <div>
              <span>01</span>
              <div>
                <h4>Company Details</h4>
                <p>Add the company name exactly as you want it to appear.</p>
              </div>
            </div>

            <div>
              <span>02</span>
              <div>
                <h4>Target Role</h4>
                <p>Write the role clearly, like React Developer or MERN Intern.</p>
              </div>
            </div>

            <div>
              <span>03</span>
              <div>
                <h4>Status Tracking</h4>
                <p>Select the current stage of your application pipeline.</p>
              </div>
            </div>

            <div>
              <span>04</span>
              <div>
                <h4>Smart Notes</h4>
                <p>Add recruiter details, interview links, or preparation points.</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="next-add-form-card">
          <div className="next-form-header">
            <div>
              <p className="eyebrow">New Record</p>
              <h2>Application Details</h2>
            </div>

            <span className="form-status-chip">Draft</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="next-form-row">
              <div className="next-form-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="company_name"
                  placeholder="Google, Amazon, Microsoft..."
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="next-form-group">
                <label>Job Role</label>

                <input
                  type="text"
                  name="role"
                  placeholder="Frontend Developer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="next-form-group">
              <label>Application Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview Scheduled">
                  Interview Scheduled
                </option>
                <option value="Technical Round">Technical Round</option>
                <option value="HR Round">HR Round</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="next-form-group">
              <label>Application Notes</label>

              <textarea
                name="notes"
                placeholder="Add recruiter name, interview date, job link, preparation notes, or salary discussion..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="next-form-actions">
              <button
                type="button"
                className="next-secondary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                className="next-save-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AddJob;