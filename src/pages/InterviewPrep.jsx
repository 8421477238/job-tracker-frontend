import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";

const questionBank = {
  React: {
    technical: [
      {
        question: "What is React and why is it used?",
        answer:
          "React is a JavaScript library used to build reusable UI components and single page applications.",
        difficulty: "Easy",
      },
      {
        question: "What is the difference between props and state?",
        answer:
          "Props pass data from parent to child. State manages data inside a component.",
        difficulty: "Easy",
      },
      {
        question: "Explain useState and useEffect hooks.",
        answer:
          "useState manages state. useEffect handles side effects like API calls and DOM updates.",
        difficulty: "Medium",
      },
      {
        question: "What is Virtual DOM?",
        answer:
          "Virtual DOM is a lightweight copy of the real DOM used by React to update UI efficiently.",
        difficulty: "Medium",
      },
      {
        question: "What are controlled components in React?",
        answer:
          "Controlled components are form elements whose values are managed by React state.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Tell me about yourself.",
        answer:
          "Start with your education, skills, internship/project experience, and career interest.",
        difficulty: "Easy",
      },
      {
        question: "Why do you want to become a React Developer?",
        answer:
          "Say you enjoy building interactive UI, reusable components, and real-world web applications.",
        difficulty: "Easy",
      },
      {
        question: "Why should we hire you?",
        answer:
          "Mention your practical project experience, learning attitude, and ability to build complete features.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain your Job Tracker project.",
        answer:
          "It is a full-stack PWA where users manage job applications, resumes, interview prep, AI career guidance, and settings.",
        difficulty: "Medium",
      },
      {
        question: "How did you implement authentication?",
        answer:
          "I used register/login APIs, password hashing, JWT token generation, localStorage, and protected routes.",
        difficulty: "Medium",
      },
      {
        question: "How did React connect with backend APIs?",
        answer:
          "Using Axios requests with API endpoints and Authorization headers containing JWT token.",
        difficulty: "Medium",
      },
    ],
  },

  Frontend: {
    technical: [
      {
        question: "What is semantic HTML?",
        answer:
          "Semantic HTML means using meaningful tags like header, nav, section, article, and footer.",
        difficulty: "Easy",
      },
      {
        question: "Explain Flexbox and Grid.",
        answer:
          "Flexbox is used for one-dimensional layouts. Grid is used for two-dimensional layouts.",
        difficulty: "Medium",
      },
      {
        question: "What is responsive design?",
        answer:
          "Responsive design makes websites work properly on mobile, tablet, laptop, and desktop.",
        difficulty: "Easy",
      },
      {
        question: "What is the difference between localStorage and sessionStorage?",
        answer:
          "localStorage keeps data after closing browser. sessionStorage keeps data only for the current tab session.",
        difficulty: "Medium",
      },
      {
        question: "How does JavaScript event handling work?",
        answer:
          "JavaScript listens to user actions like click, input, and submit, then runs a function.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why are you interested in frontend development?",
        answer:
          "Say you enjoy creating user interfaces, improving user experience, and building interactive products.",
        difficulty: "Easy",
      },
      {
        question: "How do you improve your UI skills?",
        answer:
          "Mention practicing layouts, studying modern websites, improving CSS, and rebuilding designs.",
        difficulty: "Easy",
      },
      {
        question: "How do you learn new technologies?",
        answer:
          "Start with basics, build small examples, then apply them in a real project.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain your frontend project structure.",
        answer:
          "Explain pages, components, layouts, API service, protected routes, and reusable UI components.",
        difficulty: "Medium",
      },
      {
        question: "How did you make your app responsive?",
        answer:
          "Using CSS media queries, responsive grids, mobile sidebar, and flexible card layouts.",
        difficulty: "Medium",
      },
      {
        question: "How did you improve user experience?",
        answer:
          "By adding dark mode, PWA support, toast notifications, responsive UI, and modern dashboard design.",
        difficulty: "Medium",
      },
    ],
  },

  MERN: {
    technical: [
      {
        question: "What is MERN stack?",
        answer:
          "MERN stands for MongoDB, Express.js, React.js, and Node.js.",
        difficulty: "Easy",
      },
      {
        question: "What is REST API?",
        answer:
          "REST API allows frontend and backend to communicate using GET, POST, PUT, and DELETE.",
        difficulty: "Easy",
      },
      {
        question: "What is middleware in Express?",
        answer:
          "Middleware runs between request and response and is used for auth, validation, and logging.",
        difficulty: "Medium",
      },
      {
        question: "What is JWT authentication?",
        answer:
          "JWT is token-based authentication used to verify logged-in users and protect private routes.",
        difficulty: "Medium",
      },
      {
        question: "What is the difference between SQL and NoSQL?",
        answer:
          "SQL uses structured tables. NoSQL uses flexible document or key-value structures.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why full stack development?",
        answer:
          "Say you like understanding the complete flow from frontend to backend to database.",
        difficulty: "Easy",
      },
      {
        question: "Are you comfortable working on backend also?",
        answer:
          "Yes, I understand APIs, authentication, database operations, and backend routing basics.",
        difficulty: "Easy",
      },
      {
        question: "How do you debug full-stack errors?",
        answer:
          "Check browser console, network tab, backend terminal, API response, and database data.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain your full-stack architecture.",
        answer:
          "React frontend, Express backend, MySQL database, JWT auth, REST APIs, and PWA-ready frontend.",
        difficulty: "Medium",
      },
      {
        question: "How does your login system work?",
        answer:
          "User logs in, backend verifies credentials, creates JWT token, and frontend stores token.",
        difficulty: "Medium",
      },
      {
        question: "How did you protect private routes?",
        answer:
          "Frontend checks token using ProtectedRoute and backend verifies token using auth middleware.",
        difficulty: "Medium",
      },
    ],
  },

  Backend: {
    technical: [
      {
        question: "What is Node.js?",
        answer:
          "Node.js is a JavaScript runtime that allows JavaScript to run on the server side.",
        difficulty: "Easy",
      },
      {
        question: "What is Express.js?",
        answer:
          "Express.js is a Node.js framework used to create APIs and server-side routes.",
        difficulty: "Easy",
      },
      {
        question: "What is API authentication?",
        answer:
          "API authentication verifies whether a user is allowed to access protected backend routes.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why backend development?",
        answer:
          "Say you enjoy building APIs, managing data, authentication, and server-side logic.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle backend errors?",
        answer:
          "Use try-catch, meaningful status codes, validation, logs, and proper error responses.",
        difficulty: "Medium",
      },
      {
        question: "Are you comfortable with databases?",
        answer:
          "Yes, I understand tables, queries, relationships, and CRUD operations.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "What backend APIs did you create in Job Tracker?",
        answer:
          "Authentication APIs, job CRUD APIs, resume upload APIs, profile APIs, password change, and delete account APIs.",
        difficulty: "Medium",
      },
      {
        question: "How did you connect backend with MySQL?",
        answer:
          "Using MySQL database connection and SQL queries inside controllers.",
        difficulty: "Medium",
      },
      {
        question: "How did you secure backend routes?",
        answer:
          "Using JWT middleware that verifies token before allowing access to private APIs.",
        difficulty: "Medium",
      },
    ],
  },

  FullStack: {
    technical: [
      {
        question: "What is full-stack development?",
        answer:
          "Full-stack development means working on frontend, backend, database, and API integration.",
        difficulty: "Easy",
      },
      {
        question: "Explain frontend-backend communication.",
        answer:
          "Frontend sends HTTP requests to backend APIs and backend returns responses from database or logic.",
        difficulty: "Medium",
      },
      {
        question: "What is CRUD?",
        answer:
          "CRUD means Create, Read, Update, and Delete operations on data.",
        difficulty: "Easy",
      },
    ],
    hr: [
      {
        question: "Why do you want to become a full-stack developer?",
        answer:
          "Say you like understanding the complete application flow and building end-to-end features.",
        difficulty: "Easy",
      },
      {
        question: "How do you manage large projects?",
        answer:
          "Break the project into modules like auth, dashboard, APIs, database, UI, and testing.",
        difficulty: "Medium",
      },
      {
        question: "What is your strength as a full-stack developer?",
        answer:
          "Practical project experience, debugging ability, and understanding frontend-backend flow.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain Job Tracker as a full-stack project.",
        answer:
          "It uses React frontend, Express backend, MySQL database, JWT auth, file upload, PWA, settings, and AI features.",
        difficulty: "Medium",
      },
      {
        question: "How did you manage user-specific data?",
        answer:
          "Using user_id in jobs and resumes tables so each user sees only their own data.",
        difficulty: "Medium",
      },
      {
        question: "What makes your project production-like?",
        answer:
          "Authentication, protected routes, toast notifications, settings, password change, PWA, responsive UI, and modular structure.",
        difficulty: "Hard",
      },
    ],
  },

  DataAnalyst: {
    technical: [
      {
        question: "What is data analysis?",
        answer:
          "Data analysis is the process of collecting, cleaning, exploring, and interpreting data to find useful insights.",
        difficulty: "Easy",
      },
      {
        question: "What is the difference between WHERE and HAVING in SQL?",
        answer:
          "WHERE filters rows before grouping. HAVING filters groups after GROUP BY.",
        difficulty: "Medium",
      },
      {
        question: "What is a dashboard?",
        answer:
          "A dashboard is a visual interface that shows important metrics, charts, and insights.",
        difficulty: "Easy",
      },
    ],
    hr: [
      {
        question: "Why do you want to become a Data Analyst?",
        answer:
          "Say you enjoy finding insights from data and helping businesses make better decisions.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle messy data?",
        answer:
          "Use data cleaning, remove duplicates, handle missing values, and validate data quality.",
        difficulty: "Medium",
      },
      {
        question: "How do you explain data insights to non-technical people?",
        answer:
          "Use simple language, charts, examples, and focus on business impact.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain a data analysis project.",
        answer:
          "Explain dataset source, cleaning steps, analysis, charts, insights, and final recommendations.",
        difficulty: "Medium",
      },
      {
        question: "Which tools did you use for analysis?",
        answer:
          "Mention Excel, SQL, Python, Pandas, Power BI, Tableau, or any tool you used.",
        difficulty: "Easy",
      },
      {
        question: "How did you create visual insights?",
        answer:
          "Using charts like bar charts, line charts, pie charts, KPIs, and dashboards.",
        difficulty: "Medium",
      },
    ],
  },

  DataScientist: {
    technical: [
      {
        question: "What is data science?",
        answer:
          "Data science combines statistics, programming, machine learning, and domain knowledge to extract insights.",
        difficulty: "Easy",
      },
      {
        question: "What is feature engineering?",
        answer:
          "Feature engineering means creating or transforming input variables to improve model performance.",
        difficulty: "Medium",
      },
      {
        question: "What is overfitting?",
        answer:
          "Overfitting happens when a model performs well on training data but poorly on new data.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why data science?",
        answer:
          "Say you like solving real-world problems using data, statistics, and machine learning.",
        difficulty: "Easy",
      },
      {
        question: "How do you explain model results?",
        answer:
          "Use simple metrics, visualizations, examples, and business impact.",
        difficulty: "Medium",
      },
      {
        question: "How do you approach a data science problem?",
        answer:
          "Understand problem, collect data, clean data, explore data, build model, evaluate, and explain results.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain your machine learning project.",
        answer:
          "Explain problem statement, dataset, preprocessing, model, evaluation metrics, and final results.",
        difficulty: "Medium",
      },
      {
        question: "Which evaluation metrics did you use?",
        answer:
          "Mention accuracy, precision, recall, F1-score, RMSE, MAE, or R2 depending on problem type.",
        difficulty: "Medium",
      },
      {
        question: "How did you improve model accuracy?",
        answer:
          "By cleaning data, feature engineering, hyperparameter tuning, and trying different models.",
        difficulty: "Hard",
      },
    ],
  },

  MachineLearning: {
    technical: [
      {
        question: "What is machine learning?",
        answer:
          "Machine learning allows computers to learn patterns from data and make predictions without explicit programming.",
        difficulty: "Easy",
      },
      {
        question: "What is supervised learning?",
        answer:
          "Supervised learning uses labeled data to train models for prediction or classification.",
        difficulty: "Easy",
      },
      {
        question: "What is classification and regression?",
        answer:
          "Classification predicts categories. Regression predicts continuous numeric values.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why machine learning?",
        answer:
          "Say you are interested in building intelligent systems that learn from data.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle model failure?",
        answer:
          "Analyze data quality, features, model selection, hyperparameters, and evaluation metrics.",
        difficulty: "Medium",
      },
      {
        question: "How do you keep learning ML?",
        answer:
          "Practice projects, read documentation, learn algorithms, and implement models hands-on.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain an ML project pipeline.",
        answer:
          "Data collection, cleaning, train-test split, model training, evaluation, tuning, and deployment.",
        difficulty: "Medium",
      },
      {
        question: "How did you split data?",
        answer:
          "Usually into training and testing sets, for example 80% training and 20% testing.",
        difficulty: "Easy",
      },
      {
        question: "How did you evaluate your ML model?",
        answer:
          "Using metrics like accuracy, precision, recall, F1-score, RMSE, or R2 depending on the problem.",
        difficulty: "Medium",
      },
    ],
  },

  DeepLearning: {
    technical: [
      {
        question: "What is deep learning?",
        answer:
          "Deep learning is a subset of machine learning that uses neural networks with many layers.",
        difficulty: "Easy",
      },
      {
        question: "What is a neural network?",
        answer:
          "A neural network is a model inspired by the human brain, made of layers of connected neurons.",
        difficulty: "Medium",
      },
      {
        question: "What is CNN used for?",
        answer:
          "CNN is commonly used for image classification, object detection, and computer vision tasks.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why deep learning?",
        answer:
          "Say you are interested in AI systems for images, text, speech, and complex pattern recognition.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle complex topics?",
        answer:
          "Break them into basics, practice small examples, and slowly build larger projects.",
        difficulty: "Easy",
      },
      {
        question: "What challenges did you face in AI projects?",
        answer:
          "Mention data quality, model accuracy, training time, overfitting, and debugging errors.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain a deep learning project.",
        answer:
          "Explain dataset, preprocessing, neural network architecture, training, evaluation, and results.",
        difficulty: "Medium",
      },
      {
        question: "How did you prevent overfitting?",
        answer:
          "Using dropout, regularization, data augmentation, early stopping, and validation data.",
        difficulty: "Hard",
      },
      {
        question: "Which framework did you use?",
        answer:
          "Mention TensorFlow, Keras, PyTorch, or any framework used in your project.",
        difficulty: "Easy",
      },
    ],
  },

  AIEngineer: {
    technical: [
      {
        question: "What is Artificial Intelligence?",
        answer:
          "AI is the field of building systems that can perform tasks requiring human-like intelligence.",
        difficulty: "Easy",
      },
      {
        question: "What is the difference between AI, ML, and DL?",
        answer:
          "AI is the broader field, ML is a subset of AI, and DL is a subset of ML using neural networks.",
        difficulty: "Medium",
      },
      {
        question: "What is prompt engineering?",
        answer:
          "Prompt engineering means designing effective inputs to get better responses from AI models.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why AI engineering?",
        answer:
          "Say you are interested in building intelligent applications that solve real-world problems.",
        difficulty: "Easy",
      },
      {
        question: "How do you stay updated in AI?",
        answer:
          "Follow documentation, research summaries, build projects, and practice with AI tools.",
        difficulty: "Medium",
      },
      {
        question: "How do you explain AI to a non-technical person?",
        answer:
          "Use simple examples like recommendation systems, chatbots, voice assistants, and automation.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain an AI-based project.",
        answer:
          "Explain the problem, AI model or API used, input/output flow, integration, and result.",
        difficulty: "Medium",
      },
      {
        question: "How did AI improve your project?",
        answer:
          "AI helped generate insights, recommendations, questions, or automate manual thinking tasks.",
        difficulty: "Medium",
      },
      {
        question: "What limitations did your AI project have?",
        answer:
          "Mention accuracy, data dependency, hallucination risk, API cost, or limited training data.",
        difficulty: "Hard",
      },
    ],
  },

  Python: {
    technical: [
      {
        question: "What are Python lists and tuples?",
        answer:
          "Lists are mutable collections. Tuples are immutable collections.",
        difficulty: "Easy",
      },
      {
        question: "What is a dictionary in Python?",
        answer:
          "A dictionary stores data in key-value pairs.",
        difficulty: "Easy",
      },
      {
        question: "What is exception handling?",
        answer:
          "Exception handling uses try-except blocks to handle runtime errors safely.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why Python development?",
        answer:
          "Python is simple, powerful, and useful for backend, automation, data science, and AI.",
        difficulty: "Easy",
      },
      {
        question: "How do you debug Python code?",
        answer:
          "Use print statements, debugger, error messages, logs, and test small sections.",
        difficulty: "Easy",
      },
      {
        question: "Are you comfortable learning frameworks?",
        answer:
          "Yes, I can learn Flask, Django, FastAPI, Pandas, or other Python tools as needed.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain a Python project.",
        answer:
          "Explain the problem, Python libraries used, logic, input/output, and result.",
        difficulty: "Medium",
      },
      {
        question: "Which Python libraries have you used?",
        answer:
          "Mention libraries like NumPy, Pandas, Matplotlib, Flask, Django, or requests.",
        difficulty: "Easy",
      },
      {
        question: "How did you structure your Python code?",
        answer:
          "Using functions, modules, clear variable names, and error handling.",
        difficulty: "Medium",
      },
    ],
  },

  Java: {
    technical: [
      {
        question: "What is OOP in Java?",
        answer:
          "OOP means Object-Oriented Programming using classes, objects, inheritance, polymorphism, abstraction, and encapsulation.",
        difficulty: "Easy",
      },
      {
        question: "What is inheritance?",
        answer:
          "Inheritance allows one class to use properties and methods of another class.",
        difficulty: "Easy",
      },
      {
        question: "What is method overloading?",
        answer:
          "Method overloading means same method name with different parameters in the same class.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why Java development?",
        answer:
          "Java is widely used for enterprise apps, backend systems, Android, and scalable applications.",
        difficulty: "Easy",
      },
      {
        question: "How do you improve coding skills?",
        answer:
          "Practice DSA, build projects, solve problems, and revise core Java concepts.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle bugs?",
        answer:
          "Read error messages, debug step by step, test small parts, and check logic carefully.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain a Java project.",
        answer:
          "Explain problem, classes, OOP concepts used, database or file handling, and final output.",
        difficulty: "Medium",
      },
      {
        question: "How did you use OOP in your project?",
        answer:
          "By creating classes, objects, methods, and separating responsibilities.",
        difficulty: "Medium",
      },
      {
        question: "How did you handle data in Java?",
        answer:
          "Using collections, arrays, files, JDBC, or database connection depending on project.",
        difficulty: "Medium",
      },
    ],
  },

  DevOps: {
    technical: [
      {
        question: "What is DevOps?",
        answer:
          "DevOps combines development and operations to improve software delivery, automation, and deployment.",
        difficulty: "Easy",
      },
      {
        question: "What is CI/CD?",
        answer:
          "CI/CD automates code integration, testing, building, and deployment.",
        difficulty: "Medium",
      },
      {
        question: "What is Docker?",
        answer:
          "Docker is a containerization platform used to package applications with dependencies.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why DevOps?",
        answer:
          "Say you are interested in automation, deployment, cloud, and making software delivery faster.",
        difficulty: "Easy",
      },
      {
        question: "How do you handle deployment failure?",
        answer:
          "Check logs, rollback if needed, identify issue, fix configuration, and redeploy safely.",
        difficulty: "Medium",
      },
      {
        question: "Are you comfortable with Linux?",
        answer:
          "Say you know basic commands and are improving shell scripting and server management.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain a deployment process.",
        answer:
          "Build project, configure environment variables, deploy frontend/backend, connect database, and test live app.",
        difficulty: "Medium",
      },
      {
        question: "How did you make your project production-ready?",
        answer:
          "By using build process, environment config, PWA support, API separation, and clean folder structure.",
        difficulty: "Medium",
      },
      {
        question: "What tools are used in DevOps?",
        answer:
          "Git, GitHub Actions, Docker, Jenkins, Linux, AWS, Nginx, Kubernetes, and monitoring tools.",
        difficulty: "Medium",
      },
    ],
  },

  QA: {
    technical: [
      {
        question: "What is software testing?",
        answer:
          "Software testing checks whether an application works correctly and meets requirements.",
        difficulty: "Easy",
      },
      {
        question: "What is manual testing?",
        answer:
          "Manual testing means testing software manually without automation scripts.",
        difficulty: "Easy",
      },
      {
        question: "What is a test case?",
        answer:
          "A test case is a set of steps, input, expected result, and actual result used to test a feature.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why QA testing?",
        answer:
          "Say you like finding bugs, improving product quality, and ensuring smooth user experience.",
        difficulty: "Easy",
      },
      {
        question: "How do you report a bug?",
        answer:
          "Mention title, steps to reproduce, expected result, actual result, screenshot, and severity.",
        difficulty: "Medium",
      },
      {
        question: "How do you handle repetitive testing?",
        answer:
          "Use checklists, test cases, and automation tools where possible.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "How would you test Job Tracker?",
        answer:
          "Test login, register, add job, update status, delete job, resume upload, settings, and responsive UI.",
        difficulty: "Medium",
      },
      {
        question: "What test cases would you write for login?",
        answer:
          "Valid login, invalid email, wrong password, empty fields, token storage, and protected route check.",
        difficulty: "Medium",
      },
      {
        question: "How would you test file upload?",
        answer:
          "Test valid PDF/DOC files, invalid file types, empty upload, size limits, and download link.",
        difficulty: "Medium",
      },
    ],
  },

  UIUX: {
    technical: [
      {
        question: "What is UI and UX?",
        answer:
          "UI is visual design. UX is the overall user experience and ease of use.",
        difficulty: "Easy",
      },
      {
        question: "What is wireframing?",
        answer:
          "Wireframing is creating a basic layout structure before final design.",
        difficulty: "Easy",
      },
      {
        question: "What is design consistency?",
        answer:
          "Design consistency means using the same colors, spacing, typography, and components across the product.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why UI/UX design?",
        answer:
          "Say you enjoy designing user-friendly, beautiful, and easy-to-use digital products.",
        difficulty: "Easy",
      },
      {
        question: "How do you take design feedback?",
        answer:
          "Accept feedback positively, understand user needs, and improve the design accordingly.",
        difficulty: "Easy",
      },
      {
        question: "How do you understand users?",
        answer:
          "Through user research, feedback, surveys, testing, and observing behavior.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "Explain a UI/UX project.",
        answer:
          "Explain user problem, research, wireframes, design system, prototype, and final user flow.",
        difficulty: "Medium",
      },
      {
        question: "How did you improve Job Tracker UI?",
        answer:
          "By adding modern dashboard layout, dark mode, glassmorphism, responsive design, and better hierarchy.",
        difficulty: "Medium",
      },
      {
        question: "What design tools do you use?",
        answer:
          "Mention Figma, Canva, Adobe XD, Framer, or any tools you know.",
        difficulty: "Easy",
      },
    ],
  },

  Android: {
    technical: [
      {
        question: "What is Android development?",
        answer:
          "Android development means building mobile applications for Android devices.",
        difficulty: "Easy",
      },
      {
        question: "What is Activity in Android?",
        answer:
          "An Activity represents a single screen in an Android application.",
        difficulty: "Medium",
      },
      {
        question: "What is RecyclerView?",
        answer:
          "RecyclerView is used to display large lists efficiently in Android.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why Android development?",
        answer:
          "Say you enjoy building mobile apps that solve real-world problems for users.",
        difficulty: "Easy",
      },
      {
        question: "How do you test mobile apps?",
        answer:
          "Test on different screen sizes, devices, Android versions, and user flows.",
        difficulty: "Medium",
      },
      {
        question: "Are you comfortable learning Kotlin or Java?",
        answer:
          "Yes, I can learn and build Android apps using Kotlin or Java.",
        difficulty: "Easy",
      },
    ],
    project: [
      {
        question: "Explain an Android project.",
        answer:
          "Explain screens, navigation, database/API usage, user flow, and app features.",
        difficulty: "Medium",
      },
      {
        question: "How did you handle mobile UI?",
        answer:
          "Using layouts, responsive constraints, reusable components, and proper spacing.",
        difficulty: "Medium",
      },
      {
        question: "How did the app connect to backend?",
        answer:
          "Using HTTP requests to backend APIs and handling responses.",
        difficulty: "Medium",
      },
    ],
  },

  CyberSecurity: {
    technical: [
      {
        question: "What is cyber security?",
        answer:
          "Cyber security protects systems, networks, and data from attacks and unauthorized access.",
        difficulty: "Easy",
      },
      {
        question: "What is authentication and authorization?",
        answer:
          "Authentication verifies identity. Authorization checks what the user is allowed to access.",
        difficulty: "Medium",
      },
      {
        question: "What is SQL injection?",
        answer:
          "SQL injection is an attack where malicious SQL is inserted into queries to access or damage data.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why cyber security?",
        answer:
          "Say you are interested in protecting systems, data, and users from security threats.",
        difficulty: "Easy",
      },
      {
        question: "How do you stay updated in security?",
        answer:
          "Read security blogs, practice labs, follow CVEs, and learn from real-world incidents.",
        difficulty: "Medium",
      },
      {
        question: "How do you handle sensitive data?",
        answer:
          "Use encryption, access control, secure authentication, and never expose secrets.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "How is Job Tracker protected?",
        answer:
          "It uses JWT authentication, protected routes, password hashing, and user-specific database queries.",
        difficulty: "Medium",
      },
      {
        question: "How do you protect passwords?",
        answer:
          "Passwords are hashed using bcrypt before saving in database.",
        difficulty: "Medium",
      },
      {
        question: "How do you secure APIs?",
        answer:
          "Use token verification middleware, validation, proper status codes, and secure database queries.",
        difficulty: "Medium",
      },
    ],
  },

  Cloud: {
    technical: [
      {
        question: "What is cloud computing?",
        answer:
          "Cloud computing provides computing services like servers, storage, databases, and networking over the internet.",
        difficulty: "Easy",
      },
      {
        question: "What is AWS?",
        answer:
          "AWS is Amazon Web Services, a cloud platform offering services like EC2, S3, RDS, Lambda, and more.",
        difficulty: "Easy",
      },
      {
        question: "What is deployment?",
        answer:
          "Deployment means making an application available for users on a server or cloud platform.",
        difficulty: "Medium",
      },
    ],
    hr: [
      {
        question: "Why cloud engineering?",
        answer:
          "Say you are interested in scalable systems, deployment, servers, and cloud infrastructure.",
        difficulty: "Easy",
      },
      {
        question: "Are you comfortable with Linux and networking?",
        answer:
          "Say you know basics and are actively improving Linux commands and networking concepts.",
        difficulty: "Easy",
      },
      {
        question: "How do you learn cloud services?",
        answer:
          "By studying documentation, using free tiers, deploying small projects, and practicing labs.",
        difficulty: "Medium",
      },
    ],
    project: [
      {
        question: "How would you deploy Job Tracker?",
        answer:
          "Deploy frontend on Vercel/Netlify, backend on Render/Railway, and database on cloud MySQL service.",
        difficulty: "Medium",
      },
      {
        question: "What environment variables are needed?",
        answer:
          "Database credentials, JWT secret, backend URL, frontend URL, and upload configuration.",
        difficulty: "Medium",
      },
      {
        question: "How do you check deployment errors?",
        answer:
          "Check build logs, runtime logs, network requests, environment variables, and database connection.",
        difficulty: "Medium",
      },
    ],
  },
};

function InterviewPrep() {
  const [role, setRole] = useState("React");
  const [questions, setQuestions] = useState(null);
  const [showAnswers, setShowAnswers] = useState({});
  const [savedQuestions, setSavedQuestions] = useState([]);

  const generateQuestions = () => {
    setQuestions(questionBank[role]);
    setShowAnswers({});
    toast.success("Interview questions generated");
  };

  const copyQuestion = (question) => {
    navigator.clipboard.writeText(question);
    toast.success("Question copied");
  };

  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const saveQuestion = (question) => {
    const alreadySaved = savedQuestions.some(
      (item) => item.question === question.question
    );

    if (alreadySaved) {
      toast.error("Question already saved");
      return;
    }

    setSavedQuestions((prev) => [...prev, question]);
    toast.success("Question saved");
  };

  const renderQuestionCard = (question, index, type) => {
    const id = `${type}-${index}`;

    return (
      <div className="next-question-card" key={id}>
        <div className="question-card-top">
          <span className="question-number">Q{index + 1}</span>
          <span
            className={
              question.difficulty === "Easy"
                ? "difficulty-badge easy"
                : question.difficulty === "Medium"
                ? "difficulty-badge medium"
                : "difficulty-badge hard"
            }
          >
            {question.difficulty}
          </span>
        </div>

        <p>{question.question}</p>

        {showAnswers[id] && (
          <div className="answer-box">
            <strong>Answer:</strong>
            <p>{question.answer}</p>
          </div>
        )}

        <div className="question-actions">
          <button onClick={() => toggleAnswer(id)}>
            {showAnswers[id] ? "Hide Answer" : "Show Answer"}
          </button>

          <button onClick={() => copyQuestion(question.question)}>Copy</button>

          <button onClick={() => saveQuestion(question)}>Save</button>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout
      title="AI Interview Prep"
      subtitle="Generate role-based interview questions for placement preparation."
    >
      <section className="next-interview-hero">
        <div>
          <div className="next-hero-badge">🎯 AI Interview Coach</div>

          <h1>Practice smarter before your interview.</h1>

          <p>
            Generate technical, HR, and project-based questions with answers,
            difficulty levels, copy tools, and saved practice lists.
          </p>

          <div className="interview-hero-stats">
            <span>Technical Round</span>
            <span>HR Round</span>
            <span>Project Explanation</span>
          </div>
        </div>

        <div className="interview-score-card">
          <span>Preparation Score</span>
          <h2>{questions ? "92%" : "0%"}</h2>
          <p>{questions ? "Practice set ready" : "Generate questions first"}</p>
        </div>
      </section>

      <section className="next-interview-generator">
        <div className="next-form-group">
          <label>Select Target Role</label>

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

        <button className="next-generate-btn" onClick={generateQuestions}>
          Generate Questions
        </button>
      </section>

      {questions && (
        <section className="next-question-grid">
          <div className="next-question-column">
            <div className="question-column-header">
              <h2>Technical Questions</h2>
              <span>{questions.technical.length} Questions</span>
            </div>

            {questions.technical.map((question, index) =>
              renderQuestionCard(question, index, "technical")
            )}
          </div>

          <div className="next-question-column">
            <div className="question-column-header">
              <h2>HR Questions</h2>
              <span>{questions.hr.length} Questions</span>
            </div>

            {questions.hr.map((question, index) =>
              renderQuestionCard(question, index, "hr")
            )}
          </div>

          <div className="next-question-column">
            <div className="question-column-header">
              <h2>Project Questions</h2>
              <span>{questions.project.length} Questions</span>
            </div>

            {questions.project.map((question, index) =>
              renderQuestionCard(question, index, "project")
            )}
          </div>
        </section>
      )}

      {savedQuestions.length > 0 && (
        <section className="saved-questions-panel">
          <div className="saved-question-header">
            <div>
              <p className="eyebrow">Practice List</p>
              <h2>Saved Questions</h2>
            </div>

            <span>{savedQuestions.length} Saved</span>
          </div>

          <div className="saved-question-list">
            {savedQuestions.map((item, index) => (
              <div className="saved-question-card" key={index}>
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