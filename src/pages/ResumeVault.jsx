import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

function ResumeVault() {
  const fileInputRef = useRef(null);

  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchResumes = async () => {
    try {
      const res = await API.get("/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(res.data.resumes);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadResume = async () => {
    if (!selectedFile) {
      toast.error("Please choose a resume file first");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      await API.post("/resumes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume uploaded successfully");

      setSelectedFile(null);
      fileInputRef.current.value = "";

      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resume deleted successfully");

      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <DashboardLayout
      title="Resume Vault"
      subtitle="Store, manage, and access all your resumes."
    >
      <section className="next-resume-hero">
        <div>
          <div className="next-hero-badge">📄 Career Asset Center</div>

          <h1>Your Resume Command Center</h1>

          <p>
            Upload, organize, manage and prepare resumes for job applications,
            interviews, ATS optimization and future AI analysis.
          </p>

          <div className="resume-hero-stats">
            <span>{resumes.length} Resume Files</span>
            <span>ATS Ready</span>
            <span>Career Vault</span>
          </div>
        </div>

        <div className="resume-command-panel">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            hidden
          />

          <button className="resume-primary-btn" onClick={handleChooseFile}>
            Choose Resume
          </button>

          <button
            className="resume-secondary-btn"
            onClick={handleUploadResume}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </section>

      {selectedFile && (
        <section className="selected-resume-box">
          <span>Selected File</span>
          <h3>{selectedFile.name}</h3>
          <p>{Math.round(selectedFile.size / 1024)} KB</p>
        </section>
      )}

      <section className="next-resume-stats">
        <div className="resume-stat-pro blue">
          <span>Total Resumes</span>
          <h2>{resumes.length}</h2>
        </div>

        <div className="resume-stat-pro purple">
          <span>Latest Upload</span>
          <h2>{resumes.length > 0 ? "Ready" : "--"}</h2>
        </div>

        <div className="resume-stat-pro green">
          <span>AI Ready</span>
          <h2>{resumes.length > 0 ? "Yes" : "No"}</h2>
        </div>
      </section>

      <section className="resume-library">
        <div className="resume-library-header">
          <h2>Resume Library</h2>

          <p>
            Manage all your resume versions from one clean professional
            workspace.
          </p>
        </div>

        {resumes.length === 0 ? (
          <div className="resume-empty-state">
            <div className="resume-empty-icon">📄</div>

            <h3>No Resumes Uploaded</h3>

            <p>
              Upload your first resume to start building your career vault.
            </p>
          </div>
        ) : (
          <div className="resume-card-grid">
            {resumes.map((resume) => (
              <div className="resume-pro-card" key={resume.id}>
                <div className="resume-pro-top">
                  <div className="resume-pro-icon">📄</div>

                  <span className="resume-chip">Resume</span>
                </div>

                <h3>{resume.original_name}</h3>

                <p>
                  Professional resume stored securely inside your career vault.
                </p>

                <div className="resume-pro-actions">
                  <a
                    href={`http://localhost:5000/${resume.file_path.replace(
                      /\\/g,
                      "/"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-view-btn"
                  >
                    View
                  </a>

                  <button
                    className="resume-delete-modern"
                    onClick={() => handleDeleteResume(resume.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default ResumeVault;