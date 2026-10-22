// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Lavanya Agarwal",
  initials: "LA",
  pronouns: "She / Her",
  roles: [
    "Full-Stack MERN Developer",
    "AI / Machine Learning Intern",
    "B.Tech CSE Undergraduate",
    "Software Engineer"
  ],
  tagline: "Computer Science undergraduate at JK Lakshmipat University. I craft responsive full-stack applications with React, Node.js, and MongoDB, and engineer intelligent agentic AI systems.",
  availability: "Available for internships & fresher roles",
  photo: "/profile.jpg",
  bio: "I am a Computer Science undergraduate at JK Lakshmipat University, Jaipur, passionate about building dependable web systems and AI applications. During my AI/ML internship at Dynamicore Strategies, I built multi-agent workflows, vector search systems, and safety guardrails using FastAPI, LangChain, and pgvector. I am currently deepening my full-stack engineering with the MERN stack (MongoDB, Express, React, Node.js), focusing on clean architecture, responsive design, and intuitive user experiences.",
  location: "Jaipur, Rajasthan, India",
  currentStatus: "Student (B.Tech CSE, 2024 – 2028)",
  institution: "JK Lakshmipat University, Jaipur",
  email: "lavanya.agarwal1508@gmail.com",
  github: "https://github.com/lavanya-ag1",
  linkedin: "https://www.linkedin.com/in/lavanya-ag5/",
  stats: [
    { label: "Projects Built", value: "4" },
    { label: "Internship Completed", value: "AI/ML Intern at Dynamicore Strategies" },
    { label: "Graduation Year", value: "2028" },
  ],
};

export const skills = {
  Frontend: [
    { name: "React.js", level: 85, context: "Functional components, custom hooks, React Router SPA, context state" },
    { name: "JavaScript (ES6+)", level: 88, context: "Modern async/await, closures, promises, DOM manipulation" },
    { name: "HTML5 & Modern CSS", level: 92, context: "Semantic architecture, CSS Grid, Flexbox, responsive layouts" },
    { name: "Framer Motion", level: 80, context: "Scroll reveals, layout transitions, interactive gestures" },
    { name: "REST API Integration", level: 86, context: "Client-side data fetching, error handling, state hydration" },
  ],
  Backend: [
    { name: "Node.js & Express.js", level: 82, context: "RESTful endpoints, middleware, CORS, input validation, file serving" },
    { name: "MongoDB & Mongoose", level: 80, context: "Schema modeling, indexes, data validation, CRUD aggregation" },
    { name: "FastAPI (Python)", level: 78, context: "High-performance async APIs, Pydantic schemas, Swagger docs" },
    { name: "PostgreSQL & Supabase", level: 72, context: "Relational queries, foreign keys, pgvector extension" },
    { name: "Authentication & Security", level: 74, context: "JWT tokens, password hashing, environment secret management" },
  ],
  "AI & Systems": [
    { name: "LLMs & RAG Pipelines", level: 80, context: "Document chunking, vector indexing, contextual question answering" },
    { name: "LangChain & LangGraph", level: 76, context: "Stateful multi-agent workflows, tool routing, memory graphs" },
    { name: "AI Safety & Guardrails", level: 74, context: "Llama Guard and ExpGuard benchmarking for enterprise safety" },
    { name: "Vector Stores & Redis", level: 72, context: "pgvector similarity search, Redis memory caching layers" },
  ],
  "Tools & Technologies": [
    { name: "Git & GitHub", level: 88, context: "Version control, feature branching, PR reviews, merge management" },
    { name: "Postman", level: 85, context: "API endpoint verification, test scripting, environment variables" },
    { name: "Linux & Bash", level: 76, context: "Command-line scripting, build pipelines, process management" },
    { name: "Deployment & Cloud", level: 82, context: "Vercel, Render, MongoDB Atlas, production env configuration" },
  ],
};

export const projects = [
  {
    id: "news-research",
    name: "Multi-Agent News & Financial Research System",
    badge: "AI Systems & Backend",
    category: "AI & ML",
    image: "/project-news.webp",
    description: "An automated intelligence platform that ingests, verifies, and analyzes high-frequency financial news articles. Utilizes multi-agent coordination with LangGraph, pgvector similarity search, and Redis caching to generate cited executive briefings.",
    highlights: [
      "Orchestrated multi-agent DAG workflows using LangGraph and LangChain",
      "Integrated pgvector semantic search to deduplicate breaking financial dispatches",
      "Implemented Redis memory tier reducing repeated analysis latency by 65%",
      "Applied Llama Guard filters to prevent hallucinations in financial reporting"
    ],
    tech: ["Python", "FastAPI", "LangChain", "LangGraph", "pgvector", "Redis", "RAG"],
    github: "https://github.com/lavanya-ag1/news_agent",
    featured: true,
  },
  {
    id: "cpct-portal",
    name: "CPCT: Campus Placement & Career Tracking Portal",
    badge: "Full-Stack MERN",
    category: "Full-Stack",
    image: "/project-cpct.webp",
    description: "A centralized university placement management suite built for students and training & placement officers. Manages company drives, automated eligibility filtering based on GPA and backlogs, and real-time recruitment analytics.",
    highlights: [
      "Dynamic eligibility engine calculating student qualification criteria across batch records",
      "Interactive student application status tracker with timeline progression",
      "Express REST API paired with MongoDB aggregation pipelines for hiring metrics",
      "Secure JWT authentication with role-based dashboard controls"
    ],
    tech: ["React.js", "Express.js", "MongoDB", "Node.js", "Mongoose", "JWT"],
    github: "https://github.com/lavanya-ag1/placement_project",
    featured: true,
  },
  {
    id: "liana-website",
    name: "LIANA — Fashion Storefront",
    badge: "Fashion Storefront",
    category: "Frontend",
    image: "/project-liana.svg",
    description: "A fashion storefront concept for LIANA, showcasing curated clothing categories, seasonal offers, trending styles, and the brand story in an elegant shopping experience.",
    highlights: [
      "Browse curated dresses, tops, and bottoms",
      "Discover trending styles and seasonal offers",
      "Explore customer testimonials and the LIANA brand story"
    ],
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    live: "https://lavanya-ag1.github.io/liana-website/",
    github: "https://github.com/lavanya-ag1/liana-website",
    featured: true,
  },
];

export const timeline = [
  {
    type: "work",
    period: "May 2026 – Jul 2026",
    title: "AI/ML Engineering Intern",
    organization: "Dynamicore Strategies Pvt. Ltd.",
    location: "Jaipur, India",
    summary: "Built production AI workflows and conducted safety benchmarking for enterprise financial technology.",
    bullets: [
      "Engineered multi-agent LLM pipelines and RAG architecture using FastAPI, LangChain, and LangGraph.",
      "Integrated Redis caching and pgvector similarity search to optimize retrieval latency and memory storage.",
      "Benchmarked LLM safety guardrails comparing Llama Guard and ExpGuard for risk mitigation in financial reporting.",
      "Collaborated with senior software architects on REST API design and distributed system patterns."
    ],
    tags: ["LangGraph", "FastAPI", "pgvector", "Redis", "RAG", "LLM Safety"],
  },
  {
    type: "education",
    period: "2024 – 2028 (Expected)",
    title: "B.Tech in Computer Science & Engineering",
    organization: "JK Lakshmipat University",
    location: "Jaipur, Rajasthan",
    summary: "Undergraduate student focusing on core computer science foundations, algorithms, and software engineering.",
    bullets: [
      "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Web Technologies.",
      "Active participant in collegiate hackathons, technical symposia, and coding competitions.",
      "Hands-on development of full-stack web applications and AI research prototypes."
    ],
    tags: ["DSA", "DBMS", "OOP", "Computer Networks", "MERN Stack"],
  },
  {
    type: "education",
    period: "2024",
    title: "Senior Secondary Education (Class XII, CBSE)",
    organization: "Blue Heaven Vidyalaya",
    location: "Jaipur, Rajasthan",
    summary: "Completed Higher Secondary with focus on Physics, Chemistry, and Mathematics.",
    bullets: [
      "Built early programming projects in Python and C.",
      "Developed strong foundations in calculus, linear algebra, and discrete logic."
    ],
    tags: ["Mathematics", "Physics", "Python Basics"],
  },
  {
    type: "education",
    period: "2022",
    title: "Secondary School Certificate (Class X, ICSE)",
    organization: "Springfield School",
    location: "Jaipur, Rajasthan",
    summary: "Completed secondary education with distinction across academics and extracurriculars.",
    bullets: [
      "Participated in regional science fairs and mathematics olympiad rounds.",
      "Elected student council representative and discipline team coordinator."
    ],
    tags: ["ICSE", "Academic Excellence", "Public Speaking"],
  },
];

export const certs = [
  {
    title: "AI/ML Internship Certificate",
    issuer: "Dynamicore Strategies Pvt. Ltd.",
    year: "2026",
    badge: "Industry Internship",
    image: "/certi.webp",
    skills: "FastAPI, LangChain, LangGraph, RAG, pgvector, Redis, Postman",
    description: "Certificate recognizing the AI/ML internship at Dynamicore Strategies Private Limited, Jaipur. Role: Financial AI Model Intern.",
  },
  {
    title: "Red Hat System Administration I (RH124 - RHA)",
    issuer: "Red Hat",
    year: "2026",
    badge: "Professional Certification",
    image: "/cert-redhat.webp",
    skills: "Linux Administration, Shell Scripting, System Management, Red Hat Enterprise Linux",
    description: "Certificate of attendance for Red Hat System Administration I (RH124 - RHA Ver. 10) — 40 credit hours — awarded by Karl Reynolds, Senior Director, Global Learning Services. Verifiable via Credly.",
    link: "https://www.credly.com/badges/0476ffc5-0a18-418b-a74c-0ca778eb0bb4",
  },
  {
    title: "Database Management System Part - 1",
    issuer: "Infosys Springboard",
    year: "2025",
    badge: "Professional Course",
    image: "/cert-infosys-dbms.webp",
    skills: "Relational Modeling, SQL, Schema Normalization, Queries",
    description: "Course completion certificate awarded by Infosys Springboard, verifiable through the QR code on the certificate.",
    // Add the certificate-specific verification URL here (the QR code on the certificate links to it)
    link: null,
  },
];

// Resume files served from client/public/files (sizes shown on the download buttons)
export const resumeFiles = {
  pdf: { href: "/files/resume.pdf", size: "165 KB" },
  docx: { href: "/files/resume.docx", size: "38 KB" },
};
