const statusMeta = {
  Applied: {
    icon: "📩",
    label: "Application Submitted",
    description: "You have applied for this opportunity.",
  },
  "Interview Scheduled": {
    icon: "📅",
    label: "Interview Scheduled",
    description: "Interview is scheduled. Prepare well.",
  },
  "Technical Round": {
    icon: "💻",
    label: "Technical Round",
    description: "Technical evaluation is in progress.",
  },
  "HR Round": {
    icon: "🤝",
    label: "HR Round",
    description: "HR discussion and final evaluation stage.",
  },
  Selected: {
    icon: "🏆",
    label: "Selected",
    description: "Congratulations! You are selected.",
  },
  Rejected: {
    icon: "🔁",
    label: "Rejected",
    description: "Not selected this time. Keep improving.",
  },
};

function ApplicationTimeline({ jobs }) {
  const latestJobs = jobs.slice(0, 5);

  return (
    <section className="premium-timeline-section">
      <div className="premium-timeline-header">
        <div>
          <p className="eyebrow">Application Flow</p>
          <h2>Recent Application Progress</h2>
          <p>
            A clean timeline view of your latest job application stages.
          </p>
        </div>
      </div>

      <div className="premium-timeline-list">
        {latestJobs.length === 0 ? (
          <div className="timeline-empty">
            <h3>No applications yet</h3>
            <p>Add your first job to view progress timeline.</p>
          </div>
        ) : (
          latestJobs.map((job) => {
            const meta = statusMeta[job.status] || statusMeta.Applied;

            return (
              <div className="premium-timeline-item" key={job.id}>
                <div className="timeline-icon-ring">
                  <span>{meta.icon}</span>
                </div>

                <div className="premium-timeline-content">
                  <div className="timeline-content-top">
                    <div>
                      <h3>{job.company_name}</h3>
                      <p>{job.role}</p>
                    </div>

                    <span
                      className={
                        job.status === "Rejected"
                          ? "premium-status-badge rejected-premium-badge"
                          : job.status === "Selected"
                          ? "premium-status-badge selected-premium-badge"
                          : "premium-status-badge"
                      }
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="timeline-detail-box">
                    <h4>{meta.label}</h4>
                    <p>{meta.description}</p>
                  </div>

                  {job.notes && (
                    <div className="timeline-note">
                      <strong>Note:</strong> {job.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ApplicationTimeline;