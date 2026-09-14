/**
 * PORTFOLIO DATA CONFIGURATION
 * -------------------------------------------------------------
 * Exact factual source of truth for Shahbaz Ahmed Khan's portfolio,
 * strictly matching his verified resume with zero invented information.
 */

export const portfolioData = {
  // Header & Personal Information (Exact from Resume)
  personal: {
    fullName: "Shahbaz Ahmed Khan",
    headline: "Computer Science (AI & ML) Undergraduate · Software & Intelligent Systems",
    subStatement: "Undergraduate at Vardhaman College of Engineering (Current CGPA 8.4) focusing on Java, C++, Data Structures & Algorithms, and autonomous agentic workflows.",
    greetingEmoji: "👋",
    greetingText: "PORTFOLIO & SYSTEMS LOG",
    institution: "Vardhaman College of Engineering",
    degree: "B.Tech in Computer Science and Engineering (AI & ML) – Current CGPA: 8.4",
    location: "Hyderabad, Telangana",
    phone: "+91 9398394286",
    email: "nx.shahbaz@gmail.com",
    github: "https://github.com/nxshahbaz-crypto",
    linkedin: "https://www.linkedin.com/in/shahbaz-khan-723852385/",
    leetcode: "https://leetcode.com/u/shazzzkhan/",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/nxshacujr?tab=activity",
    hackerrank: "https://www.hackerrank.com/profile/nx_shahbaz",
    resumeUrl: "/resume.pdf",
    portraitImage: "/images/shahbaz-portrait.png",
    statusBadge: "OPEN FOR INTERNSHIPS · 2026-2027",
    timezone: "Asia/Kolkata"
  },

  // Professional Summary (Exact text from Resume)
  professionalSummary:
    "Computer Science (AI & ML) undergraduate at Vardhaman College of Engineering with a strong foundation in Java, C++, Data Structures & Algorithms, and modern web development. Passionate about building scalable software and AI-driven applications through hands-on projects and continuous learning. Recently completed specialized training in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and Multi-Agent Systems. Seeking opportunities to contribute to software engineering teams while continuously expanding technical expertise.",

  // Quick Highlights grounded in the resume
  summaryHighlights: [
    {
      label: "Education",
      value: "Vardhaman College of Engineering",
      sub: "B.Tech CSE (AI & ML) · CGPA: 8.4 (2025–2029)",
      accent: "yellow",
      tag: "Undergraduate"
    },
    {
      label: "Core Foundations",
      value: "Java, C++ & DSA",
      sub: "Object-Oriented Programming & Problem Solving",
      accent: "sage",
      tag: "Core CS"
    },
    {
      label: "Specialized Training",
      value: "Building AI Agents",
      sub: "STTP: LLMs, RAG & Multi-Agent Systems",
      accent: "lavender",
      tag: "Verified STTP"
    },
    {
      label: "Current Status",
      value: "2026–2027 Internships",
      sub: "Hyderabad, Telangana · Relocation/Remote",
      accent: "blue",
      tag: "Available"
    }
  ],

  // Flagship Project: MARK 1 AI (Exact verified capabilities)
  flagship: {
    badge: "FLAGSHIP AGENTIC AI SYSTEM",
    title: "MARK 1 AI",
    tagline: "Autonomous multi-provider AI agent with automated failover, dynamic tool registry, and persistent vector memory.",
    readTime: "Flagship Deep Dive",
    stats: [
      { label: "Primary Provider", value: "Google Gemini" },
      { label: "Automatic Fallback", value: "Groq High-Speed" },
      { label: "Memory Layer", value: "Supabase Vector RAG" },
      { label: "Test Suite", value: "300+ Automated Tests" }
    ],
    overview:
      "Mark 1 AI is an agentic AI system engineered to solve single-provider brittleness in LLM applications. Built with a primary Google Gemini integration and automatic Groq fallback, it features a modular Tool Registry, multi-step agent planning capability, Supabase-backed persistent conversation memory, RAG knowledge retrieval, smart context and token management, security guardrails, and an exhaustive 300+ test evaluation suite.",
    architectureNodes: [
      {
        id: "input-guardrails",
        category: "Security",
        name: "Security Guardrails",
        shortDesc: "Input sanitization & prompt injection defense",
        fullDetails: "Validates incoming queries against prompt injection and malicious payload vectors before query evaluation begins.",
        color: "#FCE8A2"
      },
      {
        id: "primary-provider",
        category: "Inference",
        name: "Gemini Primary Provider",
        shortDesc: "Primary model for multi-step reasoning & tool calling",
        fullDetails: "Executes complex reasoning, tool planning, and multi-turn contextual problem solving as the main inference backbone.",
        color: "#DCF2B0"
      },
      {
        id: "fallback-provider",
        category: "Inference",
        name: "Groq Automatic Fallback",
        shortDesc: "Instant provider failover upon rate limits or latency spikes",
        fullDetails: "Automatically takes over execution if Gemini encounters rate limits or upstream interruptions, ensuring zero dropped agent sessions.",
        color: "#BFE3EC"
      },
      {
        id: "tool-registry",
        category: "Execution",
        name: "Reusable Tool Registry",
        shortDesc: "Dynamic schema validation & tool dispatch",
        fullDetails: "Decoupled tool manager executing external functions with strict JSON schema verification and error encapsulation.",
        color: "#E5CCF4"
      },
      {
        id: "memory-rag",
        category: "Storage",
        name: "Persistent Supabase Memory & RAG",
        shortDesc: "Long-term conversation state & vector knowledge retrieval",
        fullDetails: "Persists multi-turn conversations across sessions in Supabase and performs vector similarity search to ground agent responses with factual context.",
        color: "#FBD3BE"
      },
      {
        id: "context-manager",
        category: "Optimization",
        name: "Smart Context & Token Management",
        shortDesc: "Sliding window token compression & boundary control",
        fullDetails: "Monitors context window limits, intelligently summarizes historical turns, and prunes stale tool outputs to avoid token overflow.",
        color: "#DCF2B0"
      },
      {
        id: "eval-suite",
        category: "Testing",
        name: "Evaluation Suite (300+ Tests)",
        shortDesc: "Exhaustive automated tests for deterministic verification",
        fullDetails: "Comprehensive 300+ automated test suite validating tool selection accuracy, fallback switching, memory retention, and security boundaries.",
        color: "#FCE8A2"
      }
    ],
    subsystems: [
      {
        id: "failover",
        title: "Dual Provider Failover",
        description: "Zero-downtime inference with automatic failover between Gemini and Groq.",
        bulletPoints: [
          "Primary model: Google Gemini for rich multimodal reasoning and multi-step tool planning.",
          "Automatic fallback to Groq when Gemini is rate-limited, unreachable, or returns an error.",
          "Failover is seamless to the user, with conversational context preserved.",
          "Configurable retry thresholds and structured error reporting."
        ],
        codeSnippet: `// Mark 1 AI: Provider Failover Pipeline
async function executeWithFailover(prompt, tools) {
  try {
    return await geminiProvider.execute(prompt, tools);
  } catch (error) {
    console.warn("Primary provider failed. Engaging Groq fallback:", error.message);
    return await groqProvider.execute(prompt, tools);
  }
}`
      },
      {
        id: "tool-registry",
        title: "Tool Registry & Multi-Step Planning",
        description: "Decoupled, reusable tool system that allows the agent to iteratively think and act.",
        bulletPoints: [
          "Modular schema-driven tool definitions registered with parameter type constraints.",
          "Agent formulates multi-step plans: Think -> Call Tool -> Observe -> Repeat -> Final Answer.",
          "Sandbox error handling: failed tool executions return structured diagnostics to the agent for recovery.",
          "Extensible architecture ready for external APIs and database operations."
        ],
        codeSnippet: `// Tool Registry Interface
toolRegistry.register({
  name: "database_query",
  description: "Queries structured relational memory",
  parameters: { type: "object", properties: { query: { type: "string" } } },
  handler: async (args) => executeSecureQuery(args.query)
});`
      },
      {
        id: "memory",
        title: "Persistent Supabase Memory & RAG",
        description: "Long-term conversation state retention and semantic vector retrieval.",
        bulletPoints: [
          "PostgreSQL backend via Supabase for persistent multi-turn conversation memory.",
          "Vector similarity search to retrieve relevant knowledge chunks for grounding.",
          "Smart Context & Token Manager ensures prompts never exceed context window budgets.",
          "Historical dialogue summarization maintains coherence across extended sessions."
        ],
        codeSnippet: `// Supabase Vector Retrieval
const relevantDocs = await supabase.rpc("match_documents", {
  query_embedding: currentEmbedding,
  match_threshold: 0.82,
  match_count: 5
});`
      },
      {
        id: "security-eval",
        title: "Security Guardrails & 300+ Automated Tests",
        description: "Engineering rigor verified through an exhaustive automated test suite.",
        bulletPoints: [
          "Pre-execution security checks inspecting prompt boundaries for injection attempts.",
          "Output formatting verification ensuring deterministic JSON responses.",
          "300+ automated test suite covering tool dispatch, fallback routing, and token management.",
          "Deterministic test runner for regression prevention across models."
        ],
        codeSnippet: `// Automated Test Suite Runner (300+ Tests)
describe("Mark 1 AI Test Suite", () => {
  test("Automatic fallback to Groq on 429 rate limit", async () => { ... });
  test("Tool registry enforces strict parameter schema", async () => { ... });
  test("Context manager trims history within token budget", async () => { ... });
});`
      }
    ],
    techStack: [
      "Gemini API",
      "Groq API",
      "Multi-Agent Systems",
      "RAG / Vector Retrieval",
      "Tool Calling",
      "Supabase (PostgreSQL)",
      "Smart Context Management",
      "Security Guardrails",
      "300+ Automated Tests"
    ],
    githubUrl: "https://github.com/nxshahbaz-crypto/AI-agent_mark-1",
    liveDemoUrl: "https://ai-agent-mark-1.vercel.app",
    liveDemoNote: "Complete deployed application · Full UI frontend & dual-provider agent backend"
  },

  // Projects (Exact from Resume & Projects Showcase)
  projects: [
    {
      id: "ai-agent-mark-1",
      title: "AI Agent — Mark 1",
      subtitle: "Conversational AI & Agent Systems",
      category: "Artificial Intelligence",
      year: "2026",
      tagColor: "#FCE8A2",
      featured: true,
      description:
        "A personal AI chatbot/AI agent project built to explore conversational AI and agent-style interactions.",
      bulletPoints: [
        "A personal AI chatbot/AI agent project built to explore conversational AI and agent-style interactions.",
        "Engineered with multi-provider failover, dynamic tool dispatch, and conversational memory.",
        "Features a complete standalone web interface and an autonomous reasoning loop."
      ],
      technologies: ["JavaScript", "LLMs", "Tool Calling", "Conversational AI", "Multi-Agent Systems"],
      githubUrl: "https://github.com/nxshahbaz-crypto/AI-agent_mark-1",
      liveDemoUrl: "https://ai-agent-mark-1.vercel.app"
    },
    {
      id: "assignment-platform",
      title: "Assignment Freelancing Platform",
      subtitle: "Web Development",
      category: "Web Development",
      year: "2026",
      tagColor: "#DCF2B0",
      featured: false,
      description:
        "Developed a platform connecting students with freelancers for academic assignment help, covering listing, matching, and communication workflows. Implemented a lightweight, budget-friendly architecture optimized for quick deployment and ease of use.",
      bulletPoints: [
        "Developed a platform connecting students with freelancers for academic assignment help, covering listing, matching, and communication workflows.",
        "Implemented a lightweight, budget-friendly architecture optimized for quick deployment and ease of use."
      ],
      technologies: ["JavaScript", "HTML", "CSS", "Web Development", "Workflow Architecture"],
      githubUrl: "https://github.com/nxshahbaz-crypto",
      liveDemoUrl: null
    },
    {
      id: "water-purification",
      title: "Water Purification System",
      subtitle: "Engineering Design",
      category: "Engineering Design",
      year: "2025",
      tagColor: "#BFE3EC",
      featured: false,
      description:
        "Engineered a cost-effective water purification system aimed at accessibility for underserved communities. Optimized the design by balancing performance, cost, and manufacturability.",
      bulletPoints: [
        "Engineered a cost-effective water purification system aimed at accessibility for underserved communities.",
        "Optimized the design by balancing performance, cost, and manufacturability."
      ],
      technologies: ["Engineering Design", "Cost Optimization", "System Architecture", "Manufacturability"],
      githubUrl: "https://github.com/nxshahbaz-crypto",
      liveDemoUrl: null
    }
  ],

  // Technical Skills (Exact from Resume)
  skills: [
    {
      category: "Languages",
      badgeColor: "#FCE8A2",
      description: "Programming and scripting languages.",
      items: [
        { name: "Java", note: "Primary language for OOP & algorithms" },
        { name: "C++", note: "High-performance systems & data structures" },
        { name: "JavaScript", note: "Async web development & API integrations" },
        { name: "HTML", note: "Semantic document structuring" },
        { name: "CSS", note: "Responsive layout & custom styling" }
      ]
    },
    {
      category: "Core CS",
      badgeColor: "#DCF2B0",
      description: "Foundational computer science principles.",
      items: [
        { name: "Data Structures & Algorithms", note: "Algorithmic problem solving & efficiency" },
        { name: "Java OOP", note: "Object-oriented design & principles in Java" },
        { name: "Object-Oriented Programming", note: "Modular architecture, inheritance & abstraction" }
      ]
    },
    {
      category: "AI",
      badgeColor: "#BFE3EC",
      description: "Modern artificial intelligence & agentic technologies.",
      items: [
        { name: "Large Language Models (LLMs)", note: "Gemini & Groq integration, inference pipelines" },
        { name: "Retrieval-Augmented Generation (RAG)", note: "Vector knowledge grounding & retrieval" },
        { name: "Prompt Engineering", note: "Structured instructions & prompt evaluation" },
        { name: "Multi-Agent Systems", note: "Multi-step planning, tool calling & coordination" }
      ]
    },
    {
      category: "Developer Tools",
      badgeColor: "#E5CCF4",
      description: "Development, version control & documentation tools.",
      items: [
        { name: "Git", note: "Version control" },
        { name: "GitHub", note: "Collaborative code hosting" },
        { name: "VS Code", note: "Primary code editor & IDE" },
        { name: "Overleaf", note: "LaTeX technical documentation" },
        { name: "Canva", note: "Visual asset & presentation design" }
      ]
    }
  ],

  // Education (Exact from Resume)
  education: [
    {
      institution: "Vardhaman College of Engineering",
      degree: "B.Tech in Computer Science and Engineering (AI & ML) – Current CGPA: 8.4",
      period: "2025 – 2029",
      location: "Hyderabad, Telangana",
      details: "Undergraduate degree focusing on Computer Science, AI & ML, Java OOP, and Data Structures & Algorithms."
    },
    {
      institution: "Sri Chaitanya Junior College",
      degree: "Intermediate (MPC) – 1st Yr: 443/470, 2nd Yr: 966/1000",
      period: "2023 – 2025",
      location: "Telangana",
      details: "Mathematics, Physics, and Chemistry (MPC)."
    },
    {
      institution: "Mahabubnagar Grammar School",
      degree: "SSC – GPA: 8.8",
      period: "2023",
      location: "Mahabubnagar, Telangana",
      details: "Secondary School Certificate."
    }
  ],

  // Training (Exact from Resume)
  training: [
    {
      title: "One-Week STTP: Building AI Agents – From LLMs to Deployable Multi-Agent Systems",
      role: "Hackathon Participant",
      period: "2026",
      tag: "Training & Hackathon",
      tagColor: "#FCE8A2",
      description:
        "Covered LLM fundamentals, Retrieval-Augmented Generation (RAG), tool calling, multi-agent system design, and agent deployment."
    }
  ],

  // Certifications (Exact from Resume)
  certifications: [
    {
      name: "HTML & CSS Value Added Course",
      badge: "Scored 91%",
      accent: "yellow"
    },
    {
      name: "GrabOn Campus Drive",
      badge: "Participation",
      accent: "sage"
    },
    {
      name: "STTP Certificate – Building AI Agents",
      badge: "AI/ML Training",
      accent: "lavender"
    }
  ],

  // Soft Skills (Exact from Resume)
  softSkills: [
    "Problem Solving",
    "Leadership",
    "Teamwork",
    "Communication",
    "Adaptability",
    "Critical Thinking",
    "Time Management",
    "Continuous Learning"
  ],

  // Contact (Exact from Resume)
  contact: {
    sectionTag: "GET IN TOUCH",
    callout: "Let's build something worth talking about.",
    body: "Computer Science (AI & ML) undergraduate at Vardhaman College of Engineering actively seeking software engineering and AI systems internships for 2026-2027.",
    status: "Currently available for 2026-2027 Internships",
    copyButtonText: "Copy Email Address",
    copiedFeedbackText: "Email Copied to Clipboard!",
    resumeButtonText: "Resume ↗"
  }
};
