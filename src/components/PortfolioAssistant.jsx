import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RotateCcw, X, Sparkles, Database, ShieldCheck } from 'lucide-react';
import { Mark1AgentSession } from '../services/mark1AgentCore';

let assistantSeq = 0;
const nextMsgId = (prefix) => `${prefix}-${++assistantSeq}`;

const SUGGESTED_PROMPTS = [
  'Tell me about Mark 1.',
  'What AI projects has Shahbaz built?',
  'What technologies does Shahbaz work with?',
  'What did Shahbaz build during his hackathon?',
  'Explain the architecture of Mark 1.',
  'What challenges has Shahbaz faced in his projects?'
];

export const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I'm Shahbaz's portfolio assistant. Ask me anything about his projects, technical skills, education, or experience.",
      isInitial: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mark 1 Agent Session instance preserved across component lifetime
  const [agentSession] = useState(() => new Mark1AgentSession({ useCase: 'portfolio' }));

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsgId = nextMsgId('user');
    setMessages((prev) => [...prev, { id: userMsgId, role: 'user', content: text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await agentSession.processMessage(text);
      setMessages((prev) => [
        ...prev,
        {
          id: nextMsgId('assistant'),
          role: 'assistant',
          content: response.reply,
          engine: response.engine,
          knowledgeStore: response.knowledgeStore,
          isInitial: false
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMsgId('assistant'),
          role: 'assistant',
          content: "I ran into a temporary issue retrieving the requested portfolio facts. Please try again.",
          isInitial: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    agentSession.resetSession();
    setMessages([
      {
        id: 'initial',
        role: 'assistant',
        content: "Hi! I'm Shahbaz's portfolio assistant. Ask me anything about his projects, technical skills, education, or experience.",
        isInitial: true
      }
    ]);
    setInputValue('');
  };

  // Helper to format assistant responses
  const renderMessageContent = (content) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <p key={pIdx} className="assistant-msg-para">
          {lines.map((line, lIdx) => {
            const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
            const cleanedLine = isBullet ? line.trim().slice(2) : line;

            // Simple bold parser (**text**)
            const parts = cleanedLine.split(/(\*\*.*?\*\*)/g);
            const renderedLine = parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              return part;
            });

            if (isBullet) {
              return (
                <span key={lIdx} className="assistant-bullet-item">
                  <span className="assistant-bullet-dot">•</span>
                  <span>{renderedLine}</span>
                  <br />
                </span>
              );
            }

            return (
              <React.Fragment key={lIdx}>
                {renderedLine}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <div className="portfolio-assistant-launcher-wrap">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`portfolio-assistant-launcher-btn ${isOpen ? 'active' : ''}`}
          aria-label={isOpen ? 'Close Shahbaz AI Assistant' : 'Ask Shahbaz AI — Portfolio Assistant'}
          aria-expanded={isOpen}
        >
          <div className="launcher-sparkle-icon">
            <Sparkles size={16} />
          </div>
          <span className="launcher-label">Ask Shahbaz AI</span>
          <span className="launcher-pulse-dot" aria-hidden="true" />
        </button>
      </div>

      {/* 2. Floating Chat Drawer / Modal */}
      {isOpen && (
        <div
          className="portfolio-assistant-modal"
          role="dialog"
          aria-label="Shahbaz's Portfolio AI Assistant"
          aria-modal="true"
        >
          {/* Top Bar Header */}
          <div className="assistant-header">
            <div className="assistant-header-left">
              <div className="assistant-avatar">
                <Bot size={17} />
              </div>
              <div className="assistant-title-group">
                <div className="assistant-title-row">
                  <h3 className="assistant-title">Shahbaz's Portfolio AI</h3>
                  <span className="assistant-badge">Mark 1 Powered</span>
                </div>
                <p className="assistant-sub">Recruiter & Interviewer Assistant</p>
              </div>
            </div>

            <div className="assistant-header-actions">
              <button
                type="button"
                onClick={handleReset}
                className="assistant-header-btn"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="assistant-header-btn assistant-close-btn"
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Viewport */}
          <div
            className="assistant-viewport"
            role="log"
            aria-live="polite"
            aria-label="Conversation log with Shahbaz Portfolio AI"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`assistant-msg-row ${msg.role === 'user' ? 'assistant-row-user' : 'assistant-row-agent'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="assistant-msg-avatar" aria-hidden="true">
                    <Bot size={15} />
                  </div>
                )}

                <div className={`assistant-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-agent'}`}>
                  <div className="assistant-msg-text">
                    {renderMessageContent(msg.content)}
                  </div>

                  {/* Architecture grounding telemetry */}
                  {msg.role === 'assistant' && !msg.isInitial && (
                    <div className="assistant-telemetry">
                      <span className="assistant-telemetry-pill">
                        <Database size={10} />
                        <span>Supabase Knowledge Layer</span>
                      </span>
                      <span className="assistant-telemetry-pill">
                        <ShieldCheck size={10} />
                        <span>Grounded Portfolio Facts</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="assistant-msg-row assistant-row-agent">
                <div className="assistant-msg-avatar" aria-hidden="true">
                  <Bot size={15} />
                </div>
                <div className="assistant-bubble bubble-agent bubble-loading">
                  <div className="assistant-typing-dots" aria-label="Searching knowledge store">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="assistant-loading-text">Consulting knowledge store...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Question Pills */}
          <div className="assistant-suggestions-area">
            <span className="assistant-suggestions-label">SUGGESTED QUESTIONS:</span>
            <div className="assistant-pills-row">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="assistant-prompt-pill"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="assistant-input-form"
          >
            <div className="assistant-input-box">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
                placeholder="Ask about Shahbaz's projects, skills, education..."
                className="assistant-input-field"
                disabled={isLoading}
                maxLength={500}
                aria-label="Ask Shahbaz AI"
              />
              <span className="assistant-char-counter">
                {inputValue.length}/500
              </span>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="assistant-send-btn"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
