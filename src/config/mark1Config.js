/**
 * MARK 1 AI INTEGRATION CONFIGURATION
 * -------------------------------------------------------------
 * Centralized public endpoint configuration for communicating
 * with the deployed Mark 1 AI application.
 *
 * NOTE: Absolutely zero API keys or backend secrets belong here.
 * The production Mark 1 backend handles all inference and credentials.
 */

export const MARK1_CONFIG = {
  // Public application deployment
  appUrl: import.meta.env.VITE_MARK1_APP_URL || 'https://ai-agent-mark-1.vercel.app',

  // Public API endpoints
  get chatEndpoint() {
    return `${this.appUrl}/api/chat`;
  },
  get statusEndpoint() {
    return `${this.appUrl}/api/status`;
  },

  // Client-side guardrails
  maxInputLength: 500,
  requestTimeoutMs: 50000,

  // Suggested capability demonstration prompts
  suggestedPrompts: [
    'Tell me about Shahbaz.',
    "What is Shahbaz's flagship project?",
    'What technologies does Shahbaz know?',
    'What projects has Shahbaz built?'
  ]
};
