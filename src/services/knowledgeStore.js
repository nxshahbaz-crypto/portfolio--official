// ==========================================================================
// MARK 1 KNOWLEDGE STORE ADAPTER
// Decoupled knowledge provider interface querying Supabase/PostgreSQL schema
// ==========================================================================

/**
 * Default structured portfolio dataset matching the Supabase table schema
 * (id, domain_id, entity_key, title, summary, details, tags, priority, is_active)
 */
export const PORTFOLIO_KNOWLEDGE_SEED = [
  {
    domain_id: 'profile',
    entity_key: 'shahbaz-bio',
    title: 'Shahbaz Ahmed Khan — Professional Profile & Background',
    summary: 'Computer Science & Engineering (AI & ML) undergraduate at Vardhaman College of Engineering with an 8.4 CGPA, building high-reliability agentic AI systems.',
    details: {
      name: 'Shahbaz Ahmed Khan',
      role: 'Computer Science & Engineering (AI & ML) Undergraduate',
      institution: 'Vardhaman College of Engineering, Hyderabad',
      current_cgpa: '8.4 / 10.0',
      status: 'Actively seeking Software Engineering & AI Systems Internships for 2026–2027',
      location: 'Hyderabad, Telangana, India',
      bio: "Shahbaz is an undergraduate engineer specializing in Artificial Intelligence and Machine Learning. He focuses on building production-grade agentic AI architectures with automated failover, dynamic tool calling, persistent vector memory, and deterministic evaluation suites. His flagship project is Mark 1 AI.",
      email: 'nx.shahbaz@gmail.com',
      phone: '+91 9390232537'
    },
    tags: ['shahbaz', 'about', 'bio', 'profile', 'who', 'overview', 'location', 'background', 'intro', 'person'],
    priority: 100
  },
  {
    domain_id: 'education',
    entity_key: 'edu-vardhaman',
    title: 'Vardhaman College of Engineering — B.Tech CSE (AI & ML)',
    summary: 'B.Tech in Computer Science and Engineering (AI & ML) at Vardhaman College of Engineering, Hyderabad (2025–2029) with current CGPA of 8.4.',
    details: {
      degree: 'Bachelor of Technology (B.Tech)',
      major: 'Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
      institution: 'Vardhaman College of Engineering',
      location: 'Hyderabad, Telangana, India',
      period: '2025 – 2029',
      cgpa: '8.4 / 10.0 (Current)',
      coursework: [
        'Data Structures and Algorithms (DSA)',
        'Object-Oriented Programming (Java OOP)',
        'Artificial Intelligence and Machine Learning',
        'Database Management Systems',
        'Software Engineering Methodologies'
      ]
    },
    tags: ['education', 'college', 'degree', 'btech', 'cgpa', 'grades', 'vardhaman', 'university', 'gpa', 'study', 'academic'],
    priority: 95
  },
  {
    domain_id: 'education',
    entity_key: 'edu-intermediate',
    title: 'Sri Chaitanya Junior College — Intermediate (MPC)',
    summary: 'Intermediate education (MPC) at Sri Chaitanya Junior College (2023–2025) with top academic scores (1st Yr: 443/470, 2nd Yr: 966/1000).',
    details: {
      qualification: 'Intermediate (MPC — Mathematics, Physics, Chemistry)',
      institution: 'Sri Chaitanya Junior College',
      location: 'Telangana, India',
      period: '2023 – 2025',
      marks: '1st Year: 443/470, 2nd Year: 966/1000'
    },
    tags: ['education', 'intermediate', 'school', 'mpc', 'sri chaitanya', 'grades', 'scores', 'marks'],
    priority: 80
  },
  {
    domain_id: 'education',
    entity_key: 'edu-school',
    title: 'Mahabubnagar Grammar School — SSC',
    summary: 'Secondary School Certificate (SSC) at Mahabubnagar Grammar School (2023) with GPA 8.8.',
    details: {
      qualification: 'Secondary School Certificate (SSC / 10th Grade)',
      institution: 'Mahabubnagar Grammar School',
      location: 'Mahabubnagar, Telangana, India',
      year: '2023',
      gpa: '8.8 / 10.0'
    },
    tags: ['education', 'ssc', 'school', '10th', 'grammar school', 'grades', 'gpa'],
    priority: 70
  },
  {
    domain_id: 'skills',
    entity_key: 'skills-languages',
    title: 'Programming Languages & Systems',
    summary: 'Java (primary for OOP & DSA), C++ (performance algorithms), JavaScript (modern async web & API integration), HTML5, and CSS3.',
    details: {
      languages: [
        { name: 'Java', note: 'Primary language for OOP, data structures, algorithmic design, and enterprise paradigms' },
        { name: 'C++', note: 'Competitive problem solving and high-performance algorithms' },
        { name: 'JavaScript (ES6+)', note: 'Asynchronous application architectures, API client development, React engineering' },
        { name: 'HTML5', note: 'Semantic layout, accessible DOM hierarchies, and SEO compliance' },
        { name: 'CSS3', note: 'Custom design systems, responsive flex/grid layouts, micro-animations' }
      ]
    },
    tags: ['skills', 'languages', 'java', 'cpp', 'c++', 'javascript', 'html', 'css', 'programming', 'code', 'stack', 'technologies'],
    priority: 95
  },
  {
    domain_id: 'skills',
    entity_key: 'skills-ai-ml',
    title: 'AI & Machine Learning Capabilities',
    summary: 'Large Language Models (Gemini, Groq), Retrieval-Augmented Generation (pgvector, Supabase), Prompt Engineering, and Multi-Agent Coordination.',
    details: {
      specializations: [
        { name: 'Large Language Models (LLMs)', note: 'Multi-provider integration using Google Gemini and Groq, handling token budgets and latency constraints' },
        { name: 'Retrieval-Augmented Generation (RAG)', note: 'Grounding models via vector embeddings, pgvector, and structured document stores' },
        { name: 'Multi-Agent Systems', note: 'Designing autonomous agents with multi-step planning loops, tool execution registries, and safety guardrails' },
        { name: 'Prompt Engineering & Security', note: 'System instruction design, boundary defense against prompt injection, and deterministic JSON schemas' }
      ]
    },
    tags: ['skills', 'ai', 'ml', 'llm', 'rag', 'agents', 'gemini', 'groq', 'prompt engineering', 'artificial intelligence', 'machine learning'],
    priority: 95
  },
  {
    domain_id: 'skills',
    entity_key: 'skills-core-cs',
    title: 'Core Computer Science Principles & Tools',
    summary: 'Data Structures & Algorithms, Java OOP, Git, GitHub, VS Code, and LaTeX (Overleaf).',
    details: {
      core_cs: ['Data Structures & Algorithms', 'Java Object-Oriented Programming (OOP)', 'Modular Architecture', 'Software Engineering'],
      developer_tools: ['Git', 'GitHub', 'VS Code', 'Overleaf (LaTeX)', 'Canva'],
      soft_skills: ['Analytical Problem Solving', 'Technical Leadership', 'Cross-functional Teamwork', 'Clear Technical Communication', 'Rapid Adaptability', 'Time Management']
    },
    tags: ['skills', 'dsa', 'core cs', 'oop', 'git', 'github', 'tools', 'soft skills', 'problem solving', 'leadership'],
    priority: 85
  },
  {
    domain_id: 'projects',
    entity_key: 'project-mark-1',
    title: 'Mark 1 AI — Flagship Agentic AI System',
    summary: 'Autonomous multi-provider AI agent engineered with Google Gemini, Groq high-speed fallback, Supabase vector memory, dynamic tool registry, and 300+ automated test suite.',
    details: {
      title: 'Mark 1 AI',
      type: 'Flagship Agentic AI Platform',
      deployment: 'https://ai-agent-mark-1.vercel.app',
      repository: 'https://github.com/nxshahbaz-crypto/AI-agent_mark-1',
      architecture: {
        primary_provider: 'Google Gemini (gemini-3.6-flash) for multi-step reasoning and tool orchestration',
        fallback_provider: 'Groq (llama-3.3-70b-versatile / gpt-oss-20b) with instant automated failover on rate limits (HTTP 429) or transient 5xx errors',
        tool_registry: '12-tool dynamic registry enforcing strict parameter validation and error encapsulation',
        memory_layer: 'Supabase pgvector (768-dim embeddings) for persistent conversation state and semantic knowledge grounding',
        context_management: 'Sliding-window token budget monitor with historical turn summarization and stale tool pruning',
        security: 'Pre-execution sanitization defending against prompt injection and malicious payloads',
        testing: 'Exhaustive evaluation suite with 300+ automated tests verifying tool accuracy, fallback transitions, and deterministic execution'
      },
      technical_decisions: {
        why_dual_failover: 'Commercial LLM APIs suffer from intermittent rate limits (HTTP 429) and upstream latency spikes. Hard-coding a single provider introduces brittleness; Mark 1 automatically switches to Groq without terminating the agent session.',
        why_bounded_loop: 'Unconstrained agent loops can loop infinitely or run up unpredictable costs. Mark 1 bounds tool execution to a ceiling of 5-10 deterministic steps.',
        why_pgvector: 'Enables relational metadata storage alongside vector similarity search within a single PostgreSQL database, simplifying architecture and access control.'
      },
      challenges_faced: [
        {
          challenge: 'Upstream API rate limits (HTTP 429) caused agent sessions to drop mid-reasoning.',
          solution: 'Engineered an automatic failover circuit that catches rate-limit exceptions, preserves the reasoning scratchpad, and dispatches the remaining steps to Groq seamlessly.'
        },
        {
          challenge: 'Context window saturation during multi-turn conversations with dense tool outputs.',
          solution: 'Built a sliding-window context manager that compresses older interaction turns and trims verbose tool returns while retaining core instructions.'
        }
      ],
      technologies: ['JavaScript (ES6+)', 'Google Gemini API', 'Groq API', 'Supabase', 'PostgreSQL (pgvector)', 'Multi-Agent Architecture', 'Vercel']
    },
    tags: ['projects', 'mark 1', 'mark-1', 'ai agent', 'flagship', 'architecture', 'failover', 'gemini', 'groq', 'tools', 'challenges', 'decisions', 'hardest challenge'],
    priority: 100
  },
  {
    domain_id: 'projects',
    entity_key: 'project-assignment-platform',
    title: 'Assignment Freelancing Platform',
    summary: 'Academic workflow platform connecting students with verified peer freelancers for coursework assistance with listing, matching, and messaging workflows.',
    details: {
      title: 'Assignment Freelancing Platform',
      category: 'Web Development',
      year: '2026',
      summary: 'Engineered a web platform connecting students with freelancers for academic assignment support.',
      key_features: [
        'Assignment listing, matching, and communication workflows',
        'Lightweight, budget-friendly architecture optimized for quick deployment',
        'Responsive web interface with clear role separation'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Development', 'Workflow Architecture'],
      repository: 'https://github.com/nxshahbaz-crypto'
    },
    tags: ['projects', 'assignment platform', 'freelancing', 'web development', 'javascript', 'academic'],
    priority: 75
  },
  {
    domain_id: 'projects',
    entity_key: 'project-water-purification',
    title: 'Water Purification System',
    summary: 'Engineering design project creating an accessible, cost-effective water purification solution for underserved communities.',
    details: {
      title: 'Water Purification System',
      category: 'Engineering Design',
      year: '2025',
      summary: 'Designed a cost-effective water purification system aimed at accessibility for underserved populations.',
      engineering_focus: [
        'Optimized design by balancing purification efficiency, unit material cost, and manufacturability',
        'Rigorous engineering trade-off analysis between flow rate and filtration longevity',
        'Accessible deployment constraints without relying on high-cost infrastructure'
      ],
      technologies: ['Engineering Design', 'Cost Optimization', 'System Architecture', 'Manufacturability'],
      repository: 'https://github.com/nxshahbaz-crypto'
    },
    tags: ['projects', 'water purification', 'engineering design', 'sustainability', 'cost optimization', 'hardware'],
    priority: 75
  },
  {
    domain_id: 'projects',
    entity_key: 'project-forgecampus',
    title: 'ForgeCampus — Hackathon Collaboration Platform',
    summary: 'Multi-agent college collaboration platform designed in a team of 4 during the STTP Building AI Agents hackathon.',
    details: {
      title: 'ForgeCampus',
      category: 'Multi-Agent System & Hackathon Project',
      year: '2026',
      event: 'One-Week STTP: Building AI Agents Hackathon',
      team_size: 4,
      summary: 'Collaborated in a team of 4 to design and develop ForgeCampus, a project collaboration platform for college students utilizing multi-agent architecture and autonomous tool calling.',
      technologies: ['Multi-Agent Systems', 'LLMs', 'Autonomous Tool Calling', 'Collaboration Architecture'],
      repository: 'https://github.com/nxshahbaz-crypto/Forge-Campus'
    },
    tags: ['projects', 'forgecampus', 'hackathon', 'sttp', 'teamwork', 'multi-agent', 'collaboration'],
    priority: 85
  },
  {
    domain_id: 'hackathons',
    entity_key: 'hackathon-sttp-ai-agents',
    title: 'One-Week STTP: Building AI Agents (2026)',
    summary: 'Intensive one-week training and hackathon on building deployable multi-agent systems, where Shahbaz collaborated in a team of 4 to build ForgeCampus.',
    details: {
      title: 'One-Week Short Term Training Programme (STTP): Building AI Agents – From LLMs to Deployable Multi-Agent Systems',
      period: '2026',
      role: 'Hackathon Participant & Co-developer',
      topics_covered: [
        'Large Language Model fundamentals & prompt strategies',
        'Retrieval-Augmented Generation (RAG) and vector knowledge grounding',
        'Autonomous tool calling protocols and schema validation',
        'Multi-agent coordination patterns and deployment pipelines'
      ],
      project_developed: 'ForgeCampus (college collaboration platform built with team of 4)',
      certificate_awarded: 'STTP Certificate – Building AI Agents'
    },
    tags: ['hackathons', 'hackathon', 'sttp', 'ai agents', 'forgecampus', 'training', 'workshop', 'event'],
    priority: 90
  },
  {
    domain_id: 'certifications',
    entity_key: 'cert-profiles',
    title: 'Certifications & Verified Coding Profiles',
    summary: 'Verified academic course certifications and active competitive programming profiles on LeetCode, GeeksforGeeks, and HackerRank.',
    details: {
      certifications: [
        { name: 'HTML & CSS Value Added Course', score: 'Scored 91%', badge: 'High Distinction' },
        { name: 'STTP Certificate – Building AI Agents', year: '2026', badge: 'AI/ML Training' },
        { name: 'GrabOn Campus Drive', type: 'Participation Certificate' }
      ],
      coding_profiles: {
        leetcode: 'https://leetcode.com/u/shazzzkhan/',
        geeksforgeeks: 'https://www.geeksforgeeks.org/profile/nxshacujr?tab=activity',
        hackerrank: 'https://www.hackerrank.com/profile/nx_shahbaz'
      }
    },
    tags: ['certifications', 'achievements', 'leetcode', 'geeksforgeeks', 'hackerrank', 'coding profiles', 'scores', 'certificates'],
    priority: 80
  },
  {
    domain_id: 'career',
    entity_key: 'career-interests',
    title: 'Career Interests & Internship Search',
    summary: 'Actively seeking Software Engineering, AI Systems, and AI Agent Internships for 2026–2027.',
    details: {
      status: 'Actively Available for 2026 – 2027 Internships',
      target_roles: [
        'Software Engineering Intern',
        'AI Systems / Agentic AI Engineering Intern',
        'Backend & Full-Stack Engineering Intern'
      ],
      core_interests: [
        'Building fault-tolerant, multi-provider agentic AI systems',
        'Large-scale LLM application engineering and RAG pipelines',
        'Robust backend systems and modular APIs with clean architecture'
      ],
      contact_callout: 'Shahbaz is eager to contribute to forward-thinking engineering teams building practical AI and distributed software.'
    },
    tags: ['career', 'internship', 'looking for', 'jobs', 'roles', 'opportunities', 'availability', 'hire', 'seeking', 'future'],
    priority: 95
  },
  {
    domain_id: 'contact',
    entity_key: 'contact-channels',
    title: 'Contact Channels & Verified Links',
    summary: 'Verified contact channels for Shahbaz Ahmed Khan: email, phone, GitHub, LinkedIn, and coding platform links.',
    details: {
      email: 'nx.shahbaz@gmail.com',
      phone: '+91 9390232537',
      location: 'Hyderabad, Telangana, India',
      linkedin: 'https://www.linkedin.com/in/shahbaz-ahmed-khan-nx',
      github: 'https://github.com/nxshahbaz-crypto',
      leetcode: 'https://leetcode.com/u/shazzzkhan/',
      geeksforgeeks: 'https://www.geeksforgeeks.org/profile/nxshacujr?tab=activity',
      hackerrank: 'https://www.hackerrank.com/profile/nx_shahbaz'
    },
    tags: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'message', 'connect', 'social'],
    priority: 90
  }
];

/**
 * Knowledge Store Class implementing decoupled retrieval
 */
export class KnowledgeStore {
  constructor(options = {}) {
    this.entries = options.entries || PORTFOLIO_KNOWLEDGE_SEED;
    this.useRemoteSupabase = Boolean(
      import.meta.env?.VITE_SUPABASE_URL && import.meta.env?.VITE_SUPABASE_ANON_KEY
    );
  }

  /**
   * Retrieves relevant knowledge entries based on query tokens, domain filters, and tags.
   * Mirrors PostgreSQL full-text search and tag-containment logic.
   *
   * @param {string} query - The raw user message
   * @param {object} [options]
   * @param {string} [options.domain] - Filter by specific domain_id
   * @param {string[]} [options.tags] - Mandatory or preferred tags
   * @param {number} [options.limit=3] - Maximum entries to return
   * @returns {Array<object>} Ranked matching knowledge entries
   */
  async retrieve(query, options = {}) {
    const { domain, tags = [], limit = 3 } = options;
    const normalized = (query || '').toLowerCase();
    const queryTokens = normalized
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const scored = this.entries
      .filter((entry) => {
        if (!entry.is_active && entry.is_active !== undefined) return false;
        if (domain && entry.domain_id !== domain) return false;
        return true;
      })
      .map((entry) => {
        let score = 0;

        // 1. Exact entity key match
        if (normalized.includes(entry.entity_key.replace(/-/g, ' '))) {
          score += 60;
        }

        // 2. Tag match (+15 per matched tag)
        const matchedTags = entry.tags.filter((tag) => {
          if (normalized.includes(tag.toLowerCase())) return true;
          return tags.some((t) => t.toLowerCase() === tag.toLowerCase());
        });
        score += matchedTags.length * 15;

        // 3. Title token match (+10 per token)
        const titleLower = entry.title.toLowerCase();
        queryTokens.forEach((token) => {
          if (titleLower.includes(token)) score += 10;
        });

        // 4. Summary token match (+5 per token)
        const summaryLower = entry.summary.toLowerCase();
        queryTokens.forEach((token) => {
          if (summaryLower.includes(token)) score += 5;
        });

        // 5. Priority boost
        score += (entry.priority || 0) * 0.1;

        return { entry, score };
      })
      .filter((item) => item.score > 5)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((s) => s.entry);
  }

  /**
   * Retrieves an entry by exact entity_key
   */
  async getByEntityKey(entityKey) {
    return this.entries.find((e) => e.entity_key === entityKey) || null;
  }

  /**
   * Returns all entries within a domain
   */
  async getByDomain(domainId) {
    return this.entries.filter((e) => e.domain_id === domainId);
  }
}

export const defaultKnowledgeStore = new KnowledgeStore();
