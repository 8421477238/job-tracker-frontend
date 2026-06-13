import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";

const roleInsights = {
  React: {
    title: "React Developer",
    skills: [
      "React.js",
      "JavaScript ES6",
      "React Hooks",
      "API Integration",
      "React Router",
      "State Management",
      "Git & GitHub",
    ],
    roadmap: [
      "Revise JavaScript fundamentals",
      "Master React components, props, and state",
      "Practice hooks like useState and useEffect",
      "Build projects using REST APIs",
      "Learn authentication and protected routes",
      "Deploy projects and explain them clearly",
    ],
    interviewTips: [
      "Prepare useState, useEffect, props, and state properly",
      "Explain your Job Tracker project confidently",
      "Practice API integration questions",
      "Revise localStorage, JWT, and routing",
    ],
    resumeTips: [
      "Mention React.js clearly in skills",
      "Add Job Tracker as a full-stack project",
      "Highlight PWA, JWT, MySQL, and Resume Upload",
      "Write project impact, not only technology names",
    ],
  },

  Frontend: {
    title: "Frontend Developer",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "React.js",
      "UI/UX Basics",
      "API Handling",
    ],
    roadmap: [
      "Revise HTML semantic tags",
      "Master CSS Flexbox and Grid",
      "Practice responsive layouts",
      "Improve JavaScript DOM and ES6 concepts",
      "Build modern UI projects",
      "Learn React and API integration",
    ],
    interviewTips: [
      "Explain responsive design with examples",
      "Prepare CSS layout questions",
      "Practice JavaScript fundamentals",
      "Show UI quality in your project",
    ],
    resumeTips: [
      "Mention responsive UI and modern design",
      "Add screenshots or live links if possible",
      "Highlight React and API-based frontend work",
      "Show GitHub and deployed project links",
    ],
  },

  MERN: {
    title: "MERN Stack Developer",
    skills: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "JWT Authentication",
      "Git & GitHub",
    ],
    roadmap: [
      "Master React frontend concepts",
      "Learn Node.js and Express routing",
      "Understand MongoDB collections and schemas",
      "Build REST APIs with authentication",
      "Connect frontend and backend using Axios",
      "Deploy full-stack MERN projects",
    ],
    interviewTips: [
      "Explain MERN architecture clearly",
      "Prepare REST API and middleware questions",
      "Revise JWT authentication",
      "Be ready to explain frontend-backend flow",
    ],
    resumeTips: [
      "Mention MERN stack clearly",
      "Add full-stack project with APIs",
      "Highlight authentication and database usage",
      "Show deployed project and GitHub links",
    ],
  },

  Backend: {
    title: "Backend Developer",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MySQL / MongoDB",
      "JWT Authentication",
      "Middleware",
      "API Testing",
    ],
    roadmap: [
      "Revise JavaScript and Node.js basics",
      "Learn Express routing and middleware",
      "Practice CRUD APIs",
      "Understand authentication and authorization",
      "Learn SQL/NoSQL database operations",
      "Test APIs using Postman or Thunder Client",
    ],
    interviewTips: [
      "Explain API request-response flow",
      "Prepare middleware and JWT questions",
      "Revise database queries",
      "Be ready to debug backend errors",
    ],
    resumeTips: [
      "Mention backend APIs clearly",
      "Show database and authentication work",
      "Highlight protected routes and error handling",
      "Add API testing tools used",
    ],
  },

  FullStack: {
    title: "Full Stack Developer",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "REST APIs",
      "JWT Authentication",
      "Deployment",
    ],
    roadmap: [
      "Strengthen React frontend concepts",
      "Practice Node.js and Express routing",
      "Learn REST API structure",
      "Revise SQL queries and database relations",
      "Understand authentication flow",
      "Deploy frontend and backend separately",
    ],
    interviewTips: [
      "Explain frontend-backend-database flow",
      "Prepare REST API questions",
      "Explain JWT authentication clearly",
      "Be ready to debug full-stack errors",
    ],
    resumeTips: [
      "Mention full-stack architecture",
      "Add backend APIs and database details",
      "Highlight authentication and protected routes",
      "Mention deployment-ready PWA feature",
    ],
  },

  DataAnalyst: {
    title: "Data Analyst",
    skills: [
      "Excel",
      "SQL",
      "Python Basics",
      "Pandas",
      "Power BI / Tableau",
      "Data Cleaning",
      "Dashboarding",
    ],
    roadmap: [
      "Master Excel formulas and pivot tables",
      "Practice SQL queries and joins",
      "Learn Python basics for data analysis",
      "Use Pandas for cleaning and analysis",
      "Build dashboards in Power BI or Tableau",
      "Practice explaining insights in simple language",
    ],
    interviewTips: [
      "Prepare SQL queries and aggregation questions",
      "Explain data cleaning process",
      "Practice dashboard explanation",
      "Use business-impact language, not only technical terms",
    ],
    resumeTips: [
      "Mention SQL, Excel, Power BI, and Python",
      "Add dashboard projects with insights",
      "Show measurable impact from analysis",
      "Include dataset, tools, and final findings",
    ],
  },

  DataScientist: {
    title: "Data Scientist",
    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Model Evaluation",
    ],
    roadmap: [
      "Revise Python and statistics basics",
      "Learn data cleaning and feature engineering",
      "Practice ML algorithms",
      "Understand model evaluation metrics",
      "Build end-to-end ML projects",
      "Learn storytelling with data",
    ],
    interviewTips: [
      "Prepare overfitting, bias-variance, and metrics",
      "Explain ML project pipeline",
      "Revise classification and regression",
      "Be ready to explain model improvement steps",
    ],
    resumeTips: [
      "Mention Python, ML, statistics, and projects",
      "Add metrics like accuracy, F1-score, RMSE, or R2",
      "Highlight dataset and model used",
      "Explain business value of the prediction",
    ],
  },

  MachineLearning: {
    title: "Machine Learning Engineer",
    skills: [
      "Python",
      "Machine Learning Algorithms",
      "Scikit-learn",
      "Feature Engineering",
      "Model Evaluation",
      "Data Preprocessing",
      "Deployment Basics",
    ],
    roadmap: [
      "Revise Python and math basics",
      "Learn supervised and unsupervised learning",
      "Practice classification and regression projects",
      "Understand evaluation metrics",
      "Learn model tuning",
      "Deploy a simple ML model",
    ],
    interviewTips: [
      "Prepare supervised vs unsupervised learning",
      "Explain train-test split clearly",
      "Revise accuracy, precision, recall, and F1-score",
      "Prepare one ML project explanation",
    ],
    resumeTips: [
      "Mention ML algorithms used",
      "Add model performance metrics",
      "Highlight data preprocessing steps",
      "Show GitHub project notebooks or app demo",
    ],
  },

  DeepLearning: {
    title: "Deep Learning Engineer",
    skills: [
      "Neural Networks",
      "TensorFlow / PyTorch",
      "CNN",
      "RNN / LSTM Basics",
      "Data Augmentation",
      "Model Training",
      "GPU Basics",
    ],
    roadmap: [
      "Understand neural network basics",
      "Learn TensorFlow or PyTorch",
      "Practice CNN for image classification",
      "Understand overfitting and regularization",
      "Learn model evaluation",
      "Build one computer vision or NLP project",
    ],
    interviewTips: [
      "Prepare neural network and activation functions",
      "Explain CNN and overfitting",
      "Revise dropout and data augmentation",
      "Be ready to explain training process",
    ],
    resumeTips: [
      "Mention TensorFlow/PyTorch projects",
      "Add dataset, model architecture, and results",
      "Highlight accuracy improvement methods",
      "Show trained model or demo if possible",
    ],
  },

  AIEngineer: {
    title: "AI Engineer",
    skills: [
      "Python",
      "AI Concepts",
      "Machine Learning",
      "Prompt Engineering",
      "APIs",
      "LLM Basics",
      "Automation",
    ],
    roadmap: [
      "Learn AI, ML, and DL differences",
      "Revise Python basics",
      "Build AI API-based projects",
      "Practice prompt engineering",
      "Learn basic model evaluation",
      "Integrate AI features into web apps",
    ],
    interviewTips: [
      "Explain AI vs ML vs DL clearly",
      "Prepare prompt engineering examples",
      "Explain how AI improves a project",
      "Be honest about AI model limitations",
    ],
    resumeTips: [
      "Add AI-powered project features",
      "Mention prompt engineering and API integration",
      "Highlight automation and smart insights",
      "Explain how AI improved user experience",
    ],
  },

  Python: {
    title: "Python Developer",
    skills: [
      "Python Basics",
      "OOP",
      "File Handling",
      "Exception Handling",
      "Flask / Django / FastAPI",
      "SQL",
      "APIs",
    ],
    roadmap: [
      "Master Python syntax and data structures",
      "Practice OOP concepts",
      "Learn file handling and exceptions",
      "Build APIs using Flask/FastAPI/Django",
      "Connect Python with databases",
      "Deploy a Python backend project",
    ],
    interviewTips: [
      "Prepare lists, tuples, dictionaries, and sets",
      "Revise OOP and exception handling",
      "Explain Python project structure",
      "Practice basic coding problems",
    ],
    resumeTips: [
      "Mention Python frameworks used",
      "Add backend or automation projects",
      "Highlight database/API work",
      "Show clean code and project structure",
    ],
  },

  Java: {
    title: "Java Developer",
    skills: [
      "Core Java",
      "OOP",
      "Collections",
      "Exception Handling",
      "JDBC",
      "Spring Boot Basics",
      "SQL",
    ],
    roadmap: [
      "Revise Java syntax and OOP",
      "Practice collections and exception handling",
      "Learn JDBC and database operations",
      "Understand Spring Boot basics",
      "Build CRUD backend APIs",
      "Practice DSA basics in Java",
    ],
    interviewTips: [
      "Prepare OOP pillars",
      "Revise inheritance, polymorphism, and abstraction",
      "Practice Java collections",
      "Explain one Java project confidently",
    ],
    resumeTips: [
      "Mention Java and OOP concepts",
      "Add database-connected Java project",
      "Highlight Spring Boot if known",
      "Show problem-solving practice",
    ],
  },

  DevOps: {
    title: "DevOps Engineer",
    skills: [
      "Linux",
      "Git",
      "CI/CD",
      "Docker",
      "Cloud Basics",
      "Deployment",
      "Monitoring Basics",
    ],
    roadmap: [
      "Learn Linux commands",
      "Practice Git and GitHub workflows",
      "Understand CI/CD pipelines",
      "Learn Docker basics",
      "Deploy frontend and backend apps",
      "Study AWS or any cloud platform basics",
    ],
    interviewTips: [
      "Prepare Linux and Git commands",
      "Explain CI/CD in simple words",
      "Revise Docker container basics",
      "Explain deployment process",
    ],
    resumeTips: [
      "Mention deployment and CI/CD work",
      "Add Docker or cloud exposure",
      "Highlight GitHub actions or hosting experience",
      "Show live project links",
    ],
  },

  QA: {
    title: "QA Engineer",
    skills: [
      "Manual Testing",
      "Test Cases",
      "Bug Reporting",
      "SDLC / STLC",
      "API Testing",
      "Postman",
      "Automation Basics",
    ],
    roadmap: [
      "Learn software testing fundamentals",
      "Practice writing test cases",
      "Understand bug lifecycle",
      "Learn API testing using Postman",
      "Study automation basics",
      "Test real applications and document bugs",
    ],
    interviewTips: [
      "Prepare manual testing concepts",
      "Explain test case and bug report format",
      "Practice login and file upload test cases",
      "Revise SDLC and STLC",
    ],
    resumeTips: [
      "Mention test cases and bug reporting",
      "Add manual/API testing projects",
      "Highlight Postman usage",
      "Show testing documentation if possible",
    ],
  },

  UIUX: {
    title: "UI/UX Designer",
    skills: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Design Systems",
      "Typography",
      "Responsive Design",
    ],
    roadmap: [
      "Learn UI/UX fundamentals",
      "Practice wireframes and user flows",
      "Learn Figma tools",
      "Study typography and spacing",
      "Create design systems",
      "Build portfolio case studies",
    ],
    interviewTips: [
      "Explain UI vs UX clearly",
      "Prepare design process explanation",
      "Show before-after design improvements",
      "Talk about user needs and accessibility",
    ],
    resumeTips: [
      "Add Figma portfolio links",
      "Show case studies, not only screens",
      "Mention design systems and user flows",
      "Highlight responsive UI work",
    ],
  },

  Android: {
    title: "Android Developer",
    skills: [
      "Java / Kotlin",
      "Android Studio",
      "Activities",
      "Layouts",
      "RecyclerView",
      "API Integration",
      "Firebase Basics",
    ],
    roadmap: [
      "Learn Java or Kotlin basics",
      "Understand Android Studio",
      "Practice Activities and layouts",
      "Build list-based apps using RecyclerView",
      "Learn API integration",
      "Build and publish a basic Android app",
    ],
    interviewTips: [
      "Prepare Activity lifecycle",
      "Explain RecyclerView",
      "Revise API integration in Android",
      "Be ready to explain one Android project",
    ],
    resumeTips: [
      "Mention Android Studio and Java/Kotlin",
      "Add mobile app projects",
      "Highlight API/Firebase integration",
      "Show APK or GitHub link",
    ],
  },

  CyberSecurity: {
    title: "Cyber Security Analyst",
    skills: [
      "Networking Basics",
      "Linux",
      "Authentication",
      "OWASP Basics",
      "SQL Injection",
      "Security Testing",
      "Risk Awareness",
    ],
    roadmap: [
      "Learn networking basics",
      "Practice Linux commands",
      "Understand web security fundamentals",
      "Study OWASP Top 10",
      "Practice basic security labs",
      "Learn secure coding basics",
    ],
    interviewTips: [
      "Prepare authentication vs authorization",
      "Explain SQL injection and prevention",
      "Revise password hashing",
      "Discuss secure API design",
    ],
    resumeTips: [
      "Mention security concepts learned",
      "Add security testing labs/projects",
      "Highlight JWT, bcrypt, protected APIs",
      "Show awareness of OWASP basics",
    ],
  },

  Cloud: {
    title: "Cloud Engineer",
    skills: [
      "AWS Basics",
      "Linux",
      "Networking Basics",
      "Deployment",
      "Storage Services",
      "Databases",
      "Monitoring Basics",
    ],
    roadmap: [
      "Learn cloud computing fundamentals",
      "Understand AWS core services",
      "Practice Linux and networking",
      "Deploy frontend/backend projects",
      "Learn environment variables",
      "Study monitoring and scaling basics",
    ],
    interviewTips: [
      "Explain cloud computing simply",
      "Prepare AWS EC2, S3, and RDS basics",
      "Explain deployment flow",
      "Revise environment variables",
    ],
    resumeTips: [
      "Mention cloud deployment experience",
      "Add live hosted project links",
      "Highlight AWS basics",
      "Show frontend/backend deployment knowledge",
    ],
  },
};

function AIJobAssistant() {
  const [role, setRole] = useState("React");
  const [insight, setInsight] = useState(null);
  const [careerScore, setCareerScore] = useState(0);

  const scoreMap = {
    React: 84,
    Frontend: 79,
    MERN: 86,
    Backend: 82,
    FullStack: 88,
    DataAnalyst: 81,
    DataScientist: 85,
    MachineLearning: 87,
    DeepLearning: 86,
    AIEngineer: 89,
    Python: 80,
    Java: 78,
    DevOps: 83,
    QA: 77,
    UIUX: 82,
    Android: 80,
    CyberSecurity: 85,
    Cloud: 84,
  };

  const generateInsight = () => {
    setInsight(roleInsights[role]);

    setCareerScore(scoreMap[role] || 80);

    toast.success("Career insights generated");
  };

  return (
    <DashboardLayout
      title="AI Job Assistant"
      subtitle="Get role-based skills, roadmap, interview tips, and resume suggestions."
    >
      <section className="career-copilot-hero">
        <div>
          <div className="next-hero-badge">🚀 AI Career Copilot</div>

          <h1>Plan your career like a top candidate.</h1>

          <p>
            Get personalized skills, interview preparation, roadmap guidance,
            resume improvement advice, and placement readiness insights.
          </p>
        </div>

        <div className="career-score-card">
          <span>Career Readiness</span>

          <h2>{careerScore}%</h2>

          <p>
            {careerScore > 0
              ? "Profile Analysis Complete"
              : "Generate Insights"}
          </p>
        </div>
      </section>

      <section className="career-generator">
        <div className="next-form-group">
          <label>Select Career Path</label>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="React">React Developer</option>
            <option value="Frontend">Frontend Developer</option>
            <option value="MERN">MERN Stack Developer</option>
            <option value="Backend">Backend Developer</option>
            <option value="FullStack">Full Stack Developer</option>
            <option value="DataAnalyst">Data Analyst</option>
            <option value="DataScientist">Data Scientist</option>
            <option value="MachineLearning">Machine Learning Engineer</option>
            <option value="DeepLearning">Deep Learning Engineer</option>
            <option value="AIEngineer">AI Engineer</option>
            <option value="Python">Python Developer</option>
            <option value="Java">Java Developer</option>
            <option value="DevOps">DevOps Engineer</option>
            <option value="QA">QA Engineer</option>
            <option value="UIUX">UI/UX Designer</option>
            <option value="Android">Android Developer</option>
            <option value="CyberSecurity">Cyber Security Analyst</option>
            <option value="Cloud">Cloud Engineer</option>
          </select>
        </div>

        <button className="career-generate-btn" onClick={generateInsight}>
          Generate AI Insights
        </button>
      </section>

      {insight && (
        <>
          <section className="career-metrics">
            <div className="career-metric-card blue">
              <span>Skills Match</span>
              <h2>{careerScore + 4 > 100 ? 100 : careerScore + 4}%</h2>
            </div>

            <div className="career-metric-card purple">
              <span>Interview Ready</span>
              <h2>{careerScore + 1 > 100 ? 100 : careerScore + 1}%</h2>
            </div>

            <div className="career-metric-card green">
              <span>Resume Score</span>
              <h2>{careerScore + 3 > 100 ? 100 : careerScore + 3}%</h2>
            </div>

            <div className="career-metric-card orange">
              <span>Placement Chance</span>
              <h2>{careerScore - 2 < 0 ? 0 : careerScore - 2}%</h2>
            </div>
          </section>

          <section className="career-insight-grid">
            <div className="career-insight-main-card">
              <p className="eyebrow">Target Role</p>

              <h2>{insight.title}</h2>

              <p>
                This roadmap is designed for fresher-level interviews and
                placement preparation.
              </p>
            </div>

            <div className="career-panel">
              <h3>Required Skills</h3>

              <div className="skill-pill-wrap">
                {insight.skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="career-panel">
              <h3>Learning Roadmap</h3>

              <ul>
                {insight.roadmap.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="career-panel">
              <h3>Interview Tips</h3>

              <ul>
                {insight.interviewTips.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="career-panel">
              <h3>Resume Tips</h3>

              <ul>
                {insight.resumeTips.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}

export default AIJobAssistant;