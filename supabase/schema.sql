-- ==========================================================================
-- MARK 1 REUSABLE AGENT SYSTEM: KNOWLEDGE STORE SCHEMA (PostgreSQL / Supabase)
-- ==========================================================================

-- 1. Knowledge Domains (High-level categories)
CREATE TABLE IF NOT EXISTS knowledge_domains (
    id TEXT PRIMARY KEY,               -- e.g. 'profile', 'education', 'skills', 'projects', 'hackathons', 'contact'
    name TEXT NOT NULL,                -- e.g. 'Personal Profile', 'Technical Skills', 'Projects'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Structured Factual Knowledge Entries (Replaceable Data Layer)
CREATE TABLE IF NOT EXISTS knowledge_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES knowledge_domains(id) ON DELETE CASCADE,
    entity_key TEXT NOT NULL UNIQUE,   -- e.g. 'mark-1-ai', 'assignment-platform', 'edu-vardhaman', 'hackathon-sttp'
    title TEXT NOT NULL,               -- e.g. 'Mark 1 AI Architecture & Technical Decisions'
    summary TEXT NOT NULL,             -- High-level overview
    details JSONB NOT NULL,            -- Deep facts: technical decisions, challenges faced, solutions, metrics
    tags TEXT[] NOT NULL DEFAULT '{}', -- Fast indexable tags: ['ai', 'failover', 'groq', 'gemini']
    priority INT DEFAULT 0,            -- Ranking priority
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_domain ON knowledge_entries(domain_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_tags ON knowledge_entries USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_fts ON knowledge_entries USING GIN(to_tsvector('english', title || ' ' || summary));

-- 3. Agent Conversation Sessions (Multi-turn session tracking)
CREATE TABLE IF NOT EXISTS agent_sessions (
    id TEXT PRIMARY KEY,               -- e.g. 'recruiter-session-xyz'
    use_case TEXT DEFAULT 'portfolio', -- Identifies current knowledge persona / domain
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Agent Conversation Turns
CREATE TABLE IF NOT EXISTS agent_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    retrieved_entities TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
