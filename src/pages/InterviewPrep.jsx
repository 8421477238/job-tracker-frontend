import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";

const roles = [
  "React Developer",
  "Frontend Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Python Developer",
  "Java Developer",
  "DevOps Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Android Developer",
  "Cyber Security Analyst",
  "Cloud Engineer",
];

const roleSkillMap = {
  "React Developer": ["React", "Hooks", "Components", "State", "Routing", "API"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "Responsive UI", "DOM", "API"],
  "MERN Stack Developer": ["MongoDB", "Express", "React", "Node", "JWT", "REST API"],
  "Backend Developer": ["Node.js", "Express", "Database", "JWT", "Middleware", "APIs"],
  "Full Stack Developer": ["Frontend", "Backend", "Database", "Auth", "Deployment", "API"],
  "Data Analyst": ["Excel", "SQL", "Power BI", "Data Cleaning", "Dashboard", "Insights"],
  "Data Scientist": ["Python", "Statistics", "ML", "Pandas", "Model", "Metrics"],
  "Machine Learning Engineer": ["ML", "Python", "Model Training", "Features", "Evaluation", "Deployment"],
  "AI Engineer": ["AI", "LLM", "Prompting", "APIs", "Automation", "Model Limits"],
  "Python Developer": ["Python", "OOP", "Functions", "APIs", "Database", "Error Handling"],
  "Java Developer": ["Java", "OOP", "Collections", "JDBC", "Spring Boot", "SQL"],
  "DevOps Engineer": ["Linux", "Git", "CI/CD", "Docker", "Cloud", "Deployment"],
  "QA Engineer": ["Manual Testing", "Test Cases", "Bug Reports", "API Testing", "Postman", "Automation"],
  "UI/UX Designer": ["Figma", "Wireframe", "Prototype", "User Flow", "Design System", "UX"],
  "Android Developer": ["Android", "Kotlin", "Java", "Activity", "API", "Firebase"],
  "Cyber Security Analyst": ["Security", "OWASP", "Authentication", "SQL Injection", "Encryption", "Risk"],
  "Cloud Engineer": ["AWS", "Cloud", "EC2", "S3", "Database", "Deployment"],
};

const questionSeeds = {
  basic: [
    "What is {skill} and why is it important for a {role}?",
    "Explain {skill} in simple words.",
    "What problem does {skill} solve?",
    "What are the basic concepts of {skill}?",
    "How did you learn {skill}?",
  ],
  intermediate: [
    "How do you use {skill} in a real project?",
    "What are common mistakes beginners make in {skill}?",
    "How would you debug an issue related to {skill}?",
    "What is the difference between basic and advanced use of {skill}?",
    "How does {skill} improve project quality?",
  ],
  advanced: [
    "How would you optimize a project using {skill}?",
    "What are limitations of {skill}?",
    "How would you scale a system that depends on {skill}?",
    "How would you explain {skill} architecture in an interview?",
    "What advanced scenario have you handled using {skill}?",
  ],
  project: [
    "Explain where you used {skill} in your project.",
    "Why did you choose {skill} for your project?",
    "What challenge did you face while implementing {skill}?",
    "How would you improve your project using {skill}?",
    "How would you explain your project to a non-technical interviewer?",
  ],
  hr: [
    "Tell me about yourself for a {role} position.",
    "Why should we hire you as a {role}?",
    "What are your strengths and weaknesses?",
    "How do you handle pressure during project deadlines?",
    "Where do you see yourself in the next 3 years?",
  ],
  scenario: [
    "If your project fails in production, how will you debug it?",
    "If your API becomes slow, what steps will you take?",
    "If a user reports a bug, how will you investigate it?",
    "If your teammate disagrees with your approach, what will you do?",
    "If you have only one day before interview, how will you prepare?",
  ],
};

function InterviewPrep() {
  const [role, setRole] = useState("Full Stack Developer");
  const [level, setLevel] = useState("Zero to Hero");
  const [questionCount, setQuestionCount] = useState(20);
  const [projectDescription, setProjectDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [openedAnswers, setOpenedAnswers] = useState({});

  const skills = useMemo(() => {
    return roleSkillMap[role] || ["Project", "API", "Database", "Frontend", "Backend"];
  }, [role]);

  const extractProjectKeywords = () => {
    const commonWords = [
      "the",
      "and",
      "with",
      "using",
      "for",
      "this",
      "that",
      "from",
      "have",
      "built",
      "project",
      "application",
    ];

    return projectDescription
      .split(/[\s,.-]+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 3)
      .filter((word) => !commonWords.includes(word.toLowerCase()))
      .slice(0, 8);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const buildAnswer = (question, category, skill) => {
    if (category === "HR") {
      return `Answer confidently by connecting your education, skills, project experience, and learning attitude with the ${role} role. Keep it simple, honest, and project-focused.`;
    }

    if (category === "Project") {
      return `Explain this using your project. Start with the problem, then explain where you used ${skill}, what challenge you faced, how you solved it, and what result you achieved.`;
    }

    if (category === "Scenario") {
      return `First understand the problem, check logs/errors, reproduce the issue, identify the root cause, fix it step by step, test the solution, and explain what you learned.`;
    }

    return `Start with a simple definition of ${skill}. Then explain why it is used, how it works, where you used it in your project, and one real example.`;
  };

  const generateQuestions = () => {
    const projectKeywords = extractProjectKeywords();
    const mixedSkills = [...skills, ...projectKeywords];

    const generated = [];

    const categories =
      level === "Beginner"
        ? ["basic", "hr", "project"]
        : level === "Intermediate"
        ? ["basic", "intermediate", "project", "hr"]
        : level === "Advanced"
        ? ["intermediate", "advanced", "project", "scenario"]
        : ["basic", "intermediate", "advanced", "project", "hr", "scenario"];

    categories.forEach((category) => {
      const templates = questionSeeds[category];

      mixedSkills.forEach((skill) => {
        const template = templates[Math.floor(Math.random() * templates.length)];

        generated.push({
          category:
            category === "basic"
              ? "Basic"
              : category === "intermediate"
              ? "Intermediate"
              : category === "advanced"
              ? "Advanced"
              : category === "project"
              ? "Project"
              : category === "scenario"
              ? "Scenario"
              : "HR",
          difficulty:
            category === "basic" || category === "hr"
              ? "Easy"
              : category === "intermediate" || category === "project"
              ? "Medium"
              : "Hard",
          skill,
          question: template
            .replaceAll("{skill}", skill)
            .replaceAll("{role}", role),
        });
      });
    });

    const finalQuestions = shuffleArray(generated)
      .slice(0, Number(questionCount))
      .map((item) => ({
        ...item,
        answer: buildAnswer(item.question, item.category, item.skill),
      }));

    setQuestions(finalQuestions);
    setOpenedAnswers({});
    toast.success("AI-style interview questions generated");
  };

  const toggleAnswer = (index) => {
    setOpenedAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyQuestion = (question) => {
    navigator.clipboard.writeText(question);
    toast.success("Question copied");
  };

  const saveQuestion = (question) => {
    const exists = savedQuestions.some((item) => item.question === question.question);

    if (exists) {
      toast.error("Question already saved");
      return;
    }

    setSavedQuestions([...savedQuestions, question]);
    toast.success("Question saved");
  };

  const readinessScore = questions.length > 0 ? Math.min(96, 70 + questions.length) : 0;

  return (
    <DashboardLayout
      title="AI Interview Prep"
      subtitle="Generate project-based interview questions from beginner to advanced level."
    >
      <section className="ai-interview-hero">
        <div>
          <div className="next-hero-badge">🎯 AI Interview Coach</div>

          <h1>Prepare from zero to hero.</h1>

          <p>
            Select your role, describe your project, choose difficulty level,
            and generate fresh interview questions with answers every time.
          </p>

          <div className="ai-interview-tags">
            <span>Technical</span>
            <span>Project Based</span>
            <span>HR Round</span>
            <span>Scenario Based</span>
          </div>
        </div>

        <div className="ai-readiness-card">
          <span>Readiness Score</span>
          <h2>{readinessScore}%</h2>
          <p>{questions.length > 0 ? "Practice set generated" : "Start preparation"}</p>
        </div>
      </section>

      <section className="ai-interview-generator">
        <div className="ai-generator-grid">
          <div className="ai-form-group">
            <label>Select Target Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="ai-form-group">
            <label>Preparation Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Zero to Hero">Zero to Hero</option>
            </select>
          </div>

          <div className="ai-form-group">
            <label>Number of Questions</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
            >
              <option value="10">10 Questions</option>
              <option value="20">20 Questions</option>
              <option value="30">30 Questions</option>
              <option value="50">50 Questions</option>
            </select>
          </div>
        </div>

        <div className="ai-project-box">
          <label>Describe Your Project</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Example: I built a Job Tracker SaaS using React, Node.js, Express, MySQL, JWT authentication, Resume Builder, Railway backend deployment and Vercel frontend deployment..."
          />
        </div>

        <button className="ai-generate-question-btn" onClick={generateQuestions}>
          Generate Questions & Answers
        </button>
      </section>

      {questions.length > 0 && (
        <section className="ai-question-output">
          <div className="ai-output-header">
            <div>
              <p className="eyebrow">Generated Practice Set</p>
              <h2>{role} Interview Questions</h2>
            </div>

            <span>{questions.length} Questions</span>
          </div>

          <div className="ai-question-list">
            {questions.map((item, index) => (
              <div className="ai-question-card" key={`${item.question}-${index}`}>
                <div className="ai-question-top">
                  <span className="ai-question-number">Q{index + 1}</span>

                  <div>
                    <span className="ai-category-pill">{item.category}</span>
                    <span
                      className={
                        item.difficulty === "Easy"
                          ? "ai-difficulty easy"
                          : item.difficulty === "Medium"
                          ? "ai-difficulty medium"
                          : "ai-difficulty hard"
                      }
                    >
                      {item.difficulty}
                    </span>
                  </div>
                </div>

                <h3>{item.question}</h3>

                {openedAnswers[index] && (
                  <div className="ai-answer-box">
                    <strong>Suggested Answer</strong>
                    <p>{item.answer}</p>
                  </div>
                )}

                <div className="ai-question-actions">
                  <button onClick={() => toggleAnswer(index)}>
                    {openedAnswers[index] ? "Hide Answer" : "Show Answer"}
                  </button>

                  <button onClick={() => copyQuestion(item.question)}>Copy</button>

                  <button onClick={() => saveQuestion(item)}>Save</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {savedQuestions.length > 0 && (
        <section className="ai-saved-panel">
          <div className="ai-output-header">
            <div>
              <p className="eyebrow">Saved List</p>
              <h2>Saved Questions</h2>
            </div>

            <span>{savedQuestions.length} Saved</span>
          </div>

          <div className="ai-saved-list">
            {savedQuestions.map((item, index) => (
              <div className="ai-saved-card" key={`${item.question}-${index}`}>
                <span>#{index + 1}</span>
                <p>{item.question}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </DashboardLayout>
  );
}

export default InterviewPrep;