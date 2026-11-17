export const aboutContent = {
  eyebrow: {
    label: "ABOUT / 01",
    tag: "PROFILE BRANDING",
  },
  title: {
    main: "Building AI & Automation",
    accent: "Business Solution",
  },
  storySection: {
    number: "01",
    heading: "Short Description",
    paragraph:
      "I’m an experienced RPA Developer and aspiring AI & Automation Engineer, passionate about building intelligent systems that learn, understand, and take work off people’s hands. My foundation is in Machine learning, Deep learning, NLP, and Computer Vision, and I’m continuously expanding my expertise in LLMs, RAG, and Agentic AI to build more intelligent and autonomous solutions. Currently completing my Computer Science degree (AI) at Bina Nusantara University and open to full-time opportunities and new professional experiences in AI & Automation.",
    highlightsLabel: "Key highlights",
  },
  keyHighlights: [
    ["ML, NLP, & Computer Vision", "Core foundation"],
    ["Python, Power Automate, & n8n", "Automation Stacks"],
    ["LLM, RAG, & Agentic AI", "Learning"],
  ],
  educationSection: {
    number: "02",
    heading: "Education",
  },
  education: [
    {
      role: "Computer Science Student",
      company: "Bina Nusantara University",
      period: "September 2023 — Present",
      location: "Tangerang, Banten",
      points: [
        "Streaming: AI",
        "Published 2 IEEE Paper",
        "Scholarship Mentor Awardee",
      ],
      tags: [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Speech Recognition",
        "Software Engineering",
        "Object Oriented Programming",
        "Database Technology",
      ],
    },
    {
      role: "Mathematic and Natural Science",
      company: "SMA Maitreyawira",
      period: "July 2020 — June 2023",
      location: "Batam, Kepulauan Riau",
      points: [],
      tags: ["Mathematic", "Science", "Logical Thinking"],
    },
  ],
  photo: {
    src: "/brenalden.png",
    alt: "Bren Alden",
    sizes: "(max-width: 720px) calc(100vw - 34px), 500px",
  },
  focusSection: {
    number: "03",
    heading: "What guides my work",
  },
  focusAreas: [
    [
      "01",
      "Separation of Concern",
      "Every system I build is split into clear layers, so each part is easy to test, debug, and scale.",
    ],
    [
      "02",
      "Reliable by Design",
      "I plan for the unexpected, so what I build keeps working under real-world conditions.",
    ],
    [
      "03",
      "Always learning",
      "Diving into LLMs, RAG, and Agentic AI, and turning each new skill into a working project.",
    ],
  ],
  techSection: {
    number: "04",
    heading: "Tech stack",
  },
  techGroups: [
    {
      label: "RPA",
      items: [
        { icon: "https://cdn.simpleicons.org/robotframework/5E50A9", name: "RPA Framework" },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-excel.svg", name: "OpenPyXL" },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/windows-11.svg", name: "Win32 COM" },
        { icon: "selenium/selenium-original", name: "Selenium" },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-power-automate.svg", name: "Power Automate" },
        { icon: "n8n/n8n-original", name: "n8n" },
      ],
    },
    {
      label: "AI / Machine Learning",
      items: [
        { icon: "python/python-original", name: "Python" },
        { icon: "tensorflow/tensorflow-original", name: "TensorFlow" },
        { icon: "keras/keras-original", name: "Keras" },
        { icon: "pytorch/pytorch-original", name: "PyTorch" },
        { icon: "scikitlearn/scikitlearn-original", name: "scikit-learn" },
        { icon: "numpy/numpy-original", name: "NumPy" },
        { icon: "pandas/pandas-original", name: "pandas" },
        { icon: "matplotlib/matplotlib-original", name: "Matplotlib" },
        { icon: "https://raw.githubusercontent.com/mlflow/mlflow/master/assets/icon.svg", name: "MLflow" },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg", name: "LLM" },
        { icon: "https://cdn.simpleicons.org/langchain/5CC8C8", name: "RAG" },
        { icon: "https://cdn.simpleicons.org/langgraph/B79CFF", name: "AI Agent" },
      ],
    },
    {
      label: "Front End",
      items: [
        { icon: "html5/html5-original", name: "HTML5" },
        { icon: "css3/css3-original", name: "CSS3" },
        { icon: "javascript/javascript-original", name: "JavaScript" },
        { icon: "react/react-original", name: "React" },
        { icon: "nextjs/nextjs-original", name: "Next.js", invert: true },
        { icon: "vitejs/vitejs-original", name: "Vite" },
      ],
    },
    {
      label: "Back End",
      items: [
        { icon: "c/c-original", name: "C" },
        { icon: "java/java-original", name: "Java" },
        { icon: "supabase/supabase-original", name: "Supabase" },
        { icon: "https://cdn.jsdelivr.net/gh/get-icon/geticon/icons/xampp.svg", name: "XAMPP" },
      ],
    },
    {
      label: "Tools",
      items: [
        { icon: "git/git-original", name: "Git" },
        { icon: "github/github-original", name: "GitHub", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vercel.svg", name: "Vercel", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/notion.svg", name: "Notion", invert: true },
      ],
    },
  ],
} as const;

export const experienceContent = {
  eyebrow: {
    label: "EXPERIENCE / 02",
    tag: "CAREER TIMELINE",
  },
  title: {
    main: "Where I have",
    accent: "worked & grown.",
  },
  professionalExperience: [
    {
      role: "RPA Developer Intern",
      company: "PT Astra Daihatsu Motor",
      period: "March 2026 — Present",
      location: "North Jakarta, Jakarta · On-site",
      points: [
        "Developed and delivered 20+ end-to-end RPA projects using Python, with selected solutions integrating Microsoft Power Automate; conducted User Requirement gathering and User Acceptance Testing (UAT), reducing average manual work hours by 90%.",
        "Resolved major bugs in existing RPA solutions, improving processing stability, reducing execution time and manual work hours, and ensuring reliable laptop performance during automation runs.",
        "Entrusted to lead 5 RPA Workshops for ADM employees within a 3-month internship, delivering hands-on training on Python-based RPA development for Email, Excel, SAP, and Website automation.",
        "Served as the Project Progress PIC for the department, monitoring mandays, project requirements, and deliverables for reporting to the BR team; ensured timely responses and rapid issue resolution while maintaining stable project progress throughout the current Fiscal Year.",
      ],
      tags: ["Python", "Power Automate", "Project Analysis", "Excel", "BRD", "UAT"],
    },
  ],
  organizationalExperience: [
    {
      role: "Mentor Scholarship Awardee",
      company: "SASC Binus University",
      period: "September 2025 —  January 2026",
      location: "Tangerang, Banten · Hybrid",
      points: [
        "Selected as a Student Mentor after meeting academic eligibility criteria, maintaining a GPA above 3.5 with no course grades below B-.",
        "Awarded a full scholarship covering 16 credits for one semester in recognition of contribution and performance in the mentoring program.",
        "Mentored 3 students from different cohorts across 7 courses, providing academic guidance and personalized support based on their learning needs.",
        "Successfully maintained and improved mentees' academic performance through structured guidance, study strategies, and course-specific assistance across subjects including Artificial Intelligence, Algorithm Design, Program Design, Network Security, Compilation Techniques, Database Technology, and Computer Networks.",
      ],
      tags: ["Mentoring", "Time Management"],
    },
    {
      role: "Project Manager of Malam Keakraban 2025",
      company: "Keluarga Mahasiswa Buddhis Dhammavaddhana",
      period: "December 2024 —  March 2025",
      location: "Alam Sutera",
      points: [
        "Successfully organized Malam Keakraban 2025, attracting 150 participants across three KMBD regions: Alam Sutera, Kemanggisan, and Bekasi.",
        "Led 27 committee members and 4 volunteers across multiple divisions throughout the planning and execution phases, ensuring event procedures and deliverables were completed as planned.",
        "Managed event budgeting and negotiated with vendors and stakeholders for event requirements, achieving cost savings and a budget surplus.",
      ],
      tags: [],
    },
  ],
} as const;
