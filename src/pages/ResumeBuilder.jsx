import { useRef, useState } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DashboardLayout from "../layouts/DashboardLayout";

function ResumeBuilder() {
  const resumeRef = useRef(null);

  const [template, setTemplate] = useState("modernTech");

  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    careerObjective: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };

  const clearResume = () => {
    setResumeData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      careerObjective: "",
      education: "",
      skills: "",
      projects: "",
      experience: "",
      certifications: "",
    });

    toast.success("Resume form cleared");
  };

  const copyResumeText = () => {
    const resumeText = `
${resumeData.fullName}

${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
LinkedIn: ${resumeData.linkedin}
GitHub: ${resumeData.github}
Portfolio: ${resumeData.portfolio}

CAREER OBJECTIVE
${resumeData.careerObjective}

EDUCATION
${resumeData.education}

SKILLS
${resumeData.skills}

PROJECTS
${resumeData.projects}

EXPERIENCE / INTERNSHIP
${resumeData.experience}

CERTIFICATIONS
${resumeData.certifications}
`;

    navigator.clipboard.writeText(resumeText);

    toast.success("Resume text copied");
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast.loading("Generating PDF...", {
        id: "resume-pdf",
      });

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = resumeData.fullName
        ? `${resumeData.fullName.replaceAll(" ", "_")}_Resume.pdf`
        : "Professional_Resume.pdf";

      pdf.save(fileName);

      toast.success("Resume downloaded successfully", {
        id: "resume-pdf",
      });
    } catch (error) {
      toast.error("Failed to generate PDF", {
        id: "resume-pdf",
      });
    }
  };

  const skillsList = resumeData.skills
    ? resumeData.skills.split(",").map((skill) => skill.trim())
    : [];

  const getInitial = () => {
    return resumeData.fullName
      ? resumeData.fullName.charAt(0).toUpperCase()
      : "Y";
  };

  return (
    <DashboardLayout
      title="Resume Builder"
      subtitle="Generate a professional resume by filling your details."
    >
      <section className="resume-builder-hero">
        <div>
          <div className="next-hero-badge">🧾 Resume Generator</div>

          <h1>Build a premium resume in minutes.</h1>

          <p>
            Fill your details, select a professional template, preview your
            resume live, and download a polished PDF instantly.
          </p>
        </div>

        <div className="resume-builder-score">
          <span>Resume Quality</span>
          <h2>96%</h2>
          <p>Premium recruiter-ready layout</p>
        </div>
      </section>

      <section className="resume-builder-layout">
        <div className="resume-builder-form-card">
          <div className="resume-builder-card-header">
            <div>
              <p className="eyebrow">Resume Details</p>
              <h2>Fill Your Information</h2>
            </div>

            <button className="resume-clear-btn" onClick={clearResume}>
              Clear
            </button>
          </div>

          <div className="resume-builder-group full">
            <label>Choose Resume Template</label>

            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="resume-template-select"
            >
              <option value="modernTech">Modern Tech Resume</option>
              <option value="premiumBlue">Premium Blue Resume</option>
              <option value="developerDark">Developer Dark Resume</option>
              <option value="ats">ATS Professional Resume</option>
            </select>
          </div>

          <div className="resume-builder-form-grid">
            <div className="resume-builder-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Darshan Ahire"
                value={resumeData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="darshan@example.com"
                value={resumeData.email}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={resumeData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Nashik, Maharashtra"
                value={resumeData.location}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                placeholder="linkedin.com/in/your-profile"
                value={resumeData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group">
              <label>GitHub</label>
              <input
                type="text"
                name="github"
                placeholder="github.com/your-username"
                value={resumeData.github}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Portfolio</label>
              <input
                type="text"
                name="portfolio"
                placeholder="yourportfolio.com"
                value={resumeData.portfolio}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Career Objective</label>
              <textarea
                name="careerObjective"
                placeholder="Motivated Full Stack Developer with hands-on experience in React.js, Node.js, Express.js and MySQL..."
                value={resumeData.careerObjective}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Education</label>
              <textarea
                name="education"
                placeholder="B.Tech Computer Science Engineering, Parul University..."
                value={resumeData.education}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Skills</label>
              <textarea
                name="skills"
                placeholder="HTML, CSS, JavaScript, React.js, Node.js, Express.js, MySQL, Git, REST APIs"
                value={resumeData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Projects</label>
              <textarea
                name="projects"
                placeholder="Job Tracker - Full stack placement management platform using React, Express, MySQL, JWT authentication, Resume Vault, PWA and AI career features."
                value={resumeData.projects}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Experience / Internship</label>
              <textarea
                name="experience"
                placeholder="Full Stack Developer Intern at Aenexz Tech Pvt Ltd. Worked on employee task and attendance management system using React, PHP and MySQL."
                value={resumeData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="resume-builder-group full">
              <label>Certifications</label>
              <textarea
                name="certifications"
                placeholder="AWS Basics, React Certification, JavaScript Course..."
                value={resumeData.certifications}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="resume-preview-card">
          <div className="resume-preview-actions">
            <p className="eyebrow">Live Preview</p>

            <div className="resume-action-group">
              <button className="resume-copy-btn" onClick={copyResumeText}>
                Copy
              </button>

              <button className="resume-download-btn-ui" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>

          {template === "modernTech" && (
            <div
              className="premium-resume-paper modern-tech-template"
              ref={resumeRef}
            >
              <div className="modern-tech-header">
                <div>
                  <span className="modern-tech-label">Modern Tech Resume</span>
                  <h1>{resumeData.fullName || "Your Name"}</h1>
                  <p>
                    {resumeData.careerObjective ||
                      "A motivated technology professional focused on building scalable, modern, and user-friendly digital products."}
                  </p>
                </div>

                <div className="modern-tech-avatar">{getInitial()}</div>
              </div>

              <div className="modern-tech-contact">
                <span>{resumeData.email || "email@example.com"}</span>
                <span>{resumeData.phone || "+91 XXXXX XXXXX"}</span>
                <span>{resumeData.location || "City, State"}</span>
              </div>

              <div className="modern-tech-body">
                <main>
                  <section>
                    <h3>Projects</h3>
                    <p>{resumeData.projects || "Your project details."}</p>
                  </section>

                  <section>
                    <h3>Experience / Internship</h3>
                    <p>
                      {resumeData.experience ||
                        "Your internship or work experience."}
                    </p>
                  </section>

                  <section>
                    <h3>Education</h3>
                    <p>{resumeData.education || "Your education details."}</p>
                  </section>
                </main>

                <aside>
                  <section>
                    <h3>Skills</h3>
                    <div className="modern-skill-stack">
                      {skillsList.length === 0 ? (
                        <>
                          <span>React.js</span>
                          <span>JavaScript</span>
                          <span>Node.js</span>
                          <span>MySQL</span>
                        </>
                      ) : (
                        skillsList.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))
                      )}
                    </div>
                  </section>

                  <section>
                    <h3>Links</h3>
                    <p>{resumeData.linkedin || "LinkedIn Profile"}</p>
                    <p>{resumeData.github || "GitHub Profile"}</p>
                    <p>{resumeData.portfolio || "Portfolio Website"}</p>
                  </section>

                  <section>
                    <h3>Certifications</h3>
                    <p>
                      {resumeData.certifications || "Your certifications."}
                    </p>
                  </section>
                </aside>
              </div>
            </div>
          )}

          {template === "premiumBlue" && (
            <div
              className="premium-resume-paper premium-blue-template"
              ref={resumeRef}
            >
              <aside className="premium-blue-left">
                <div className="premium-blue-avatar">{getInitial()}</div>

                <h2>{resumeData.fullName || "Your Name"}</h2>
                <p className="premium-blue-role">Career Candidate</p>

                <div className="premium-blue-section">
                  <h4>Contact</h4>
                  <p>{resumeData.email || "email@example.com"}</p>
                  <p>{resumeData.phone || "+91 XXXXX XXXXX"}</p>
                  <p>{resumeData.location || "City, State"}</p>
                </div>

                <div className="premium-blue-section">
                  <h4>Skills</h4>
                  <div className="premium-blue-skills">
                    {skillsList.length === 0 ? (
                      <>
                        <span>React.js</span>
                        <span>JavaScript</span>
                        <span>Node.js</span>
                      </>
                    ) : (
                      skillsList.slice(0, 12).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    )}
                  </div>
                </div>

                <div className="premium-blue-section">
                  <h4>Links</h4>
                  <p>{resumeData.linkedin || "LinkedIn Profile"}</p>
                  <p>{resumeData.github || "GitHub Profile"}</p>
                  <p>{resumeData.portfolio || "Portfolio Website"}</p>
                </div>
              </aside>

              <main className="premium-blue-main">
                <section>
                  <h3>Profile Summary</h3>
                  <p>
                    {resumeData.careerObjective ||
                      "Write a strong career objective to introduce your skills, goals, and professional direction."}
                  </p>
                </section>

                <section>
                  <h3>Projects</h3>
                  <p>{resumeData.projects || "Your project details."}</p>
                </section>

                <section>
                  <h3>Experience</h3>
                  <p>
                    {resumeData.experience ||
                      "Your internship or work experience."}
                  </p>
                </section>

                <section>
                  <h3>Education</h3>
                  <p>{resumeData.education || "Your education details."}</p>
                </section>

                <section>
                  <h3>Certifications</h3>
                  <p>{resumeData.certifications || "Your certifications."}</p>
                </section>
              </main>
            </div>
          )}

          {template === "developerDark" && (
            <div
              className="premium-resume-paper developer-dark-template"
              ref={resumeRef}
            >
              <div className="developer-dark-top">
                <div className="developer-dark-avatar">{getInitial()}</div>

                <div>
                  <span>Developer Resume</span>
                  <h1>{resumeData.fullName || "Your Name"}</h1>
                  <p>
                    {resumeData.email || "email@example.com"} •{" "}
                    {resumeData.phone || "+91 XXXXX XXXXX"} •{" "}
                    {resumeData.location || "City, State"}
                  </p>
                </div>
              </div>

              <div className="developer-dark-grid">
                <section className="developer-dark-panel large">
                  <h3>Professional Summary</h3>
                  <p>
                    {resumeData.careerObjective ||
                      "Write a professional summary focused on your technical skills, project experience, and career goal."}
                  </p>
                </section>

                <section className="developer-dark-panel">
                  <h3>Tech Stack</h3>
                  <div className="developer-dark-skills">
                    {skillsList.length === 0 ? (
                      <>
                        <span>React.js</span>
                        <span>Node.js</span>
                        <span>Express.js</span>
                        <span>MySQL</span>
                      </>
                    ) : (
                      skillsList.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    )}
                  </div>
                </section>

                <section className="developer-dark-panel large">
                  <h3>Projects</h3>
                  <p>{resumeData.projects || "Your project details."}</p>
                </section>

                <section className="developer-dark-panel">
                  <h3>Links</h3>
                  <p>{resumeData.linkedin || "LinkedIn Profile"}</p>
                  <p>{resumeData.github || "GitHub Profile"}</p>
                  <p>{resumeData.portfolio || "Portfolio Website"}</p>
                </section>

                <section className="developer-dark-panel large">
                  <h3>Experience</h3>
                  <p>
                    {resumeData.experience ||
                      "Your internship or work experience."}
                  </p>
                </section>

                <section className="developer-dark-panel">
                  <h3>Education</h3>
                  <p>{resumeData.education || "Your education details."}</p>
                </section>

                <section className="developer-dark-panel large">
                  <h3>Certifications</h3>
                  <p>{resumeData.certifications || "Your certifications."}</p>
                </section>
              </div>
            </div>
          )}

          {template === "ats" && (
            <div
              className="premium-resume-paper ats-resume-template"
              ref={resumeRef}
            >
              <div className="ats-header">
                <h1>{resumeData.fullName || "Your Name"}</h1>

                <p>
                  {resumeData.email || "email@example.com"} |{" "}
                  {resumeData.phone || "+91 XXXXX XXXXX"} |{" "}
                  {resumeData.location || "City, State"}
                </p>

                <p>
                  {resumeData.linkedin || "LinkedIn"} |{" "}
                  {resumeData.github || "GitHub"} |{" "}
                  {resumeData.portfolio || "Portfolio"}
                </p>
              </div>

              <div className="ats-section">
                <h3>Career Objective</h3>
                <p>
                  {resumeData.careerObjective ||
                    "Your career objective will appear here."}
                </p>
              </div>

              <div className="ats-section">
                <h3>Education</h3>
                <p>{resumeData.education || "Your education details."}</p>
              </div>

              <div className="ats-section">
                <h3>Technical Skills</h3>
                <p>{resumeData.skills || "Your technical skills."}</p>
              </div>

              <div className="ats-section">
                <h3>Projects</h3>
                <p>{resumeData.projects || "Your project details."}</p>
              </div>

              <div className="ats-section">
                <h3>Experience / Internship</h3>
                <p>
                  {resumeData.experience ||
                    "Your internship or work experience."}
                </p>
              </div>

              <div className="ats-section">
                <h3>Certifications</h3>
                <p>{resumeData.certifications || "Your certifications."}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ResumeBuilder;