function AuthVisual() {
  return (
    <div className="auth-visual">
      <div className="gradient-orb orb-one"></div>
      <div className="gradient-orb orb-two"></div>
      <div className="gradient-orb orb-three"></div>

      <div className="floating-grid">
        <div className="floating-card card-one">
          <span>📊</span>
          <h4>Applications</h4>
          <p>Track every company</p>
        </div>

        <div className="floating-card card-two">
          <span>🤖</span>
          <h4>AI Prep</h4>
          <p>Smart interview help</p>
        </div>

        <div className="floating-card card-three">
          <span>📄</span>
          <h4>Resume Vault</h4>
          <p>Store career assets</p>
        </div>
      </div>

      <div className="hero-3d-card">
        <div className="hero-card-top">
          <div className="hero-logo">JT</div>
          <p>Placement OS</p>
        </div>

        <h1>Job Tracker</h1>

        <p>
          A modern career dashboard for students to manage jobs, resumes,
          interviews, and AI preparation.
        </p>

        <div className="hero-progress">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AuthVisual;