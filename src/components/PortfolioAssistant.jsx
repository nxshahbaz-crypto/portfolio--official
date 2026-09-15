import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RotateCcw, X, Cpu, Wrench, ArrowUpRight, AlertCircle } from 'lucide-react';
import { MARK1_CONFIG } from '../config/mark1Config';

let assistantSeq = 0;
const nextMsgId = (prefix) => `${prefix}-${++assistantSeq}`;
const nowTimestamp = () => Date.now();
const formatElapsed = (start) => ((nowTimestamp() - start) / 1000).toFixed(1);
const generateSessionId = () => `mark1-sess-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const SUGGESTED_PROMPTS = [
  'Tell me about Shahbaz.',
  "What is Shahbaz's flagship project?",
  'What technologies does Shahbaz know?',
  'What projects has Shahbaz built?'
];

export const PortfolioAssistant = ({ isOpen: controlledIsOpen, setIsOpen: setControlledIsOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = setControlledIsOpen || setInternalIsOpen;

  const [conversationId, setConversationId] = useState(generateSessionId);
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi, I'm Mark 1. Ask me about Shahbaz, his projects, skills, education, or Mark 1 AI.",
      isInitial: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Programmatic event listener for opening and focusing chat from navigation
  useEffect(() => {
    const handleOpenTrigger = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    window.__openMark1Chat = handleOpenTrigger;
    window.addEventListener('open-mark1-chat', handleOpenTrigger);
    return () => {
      window.removeEventListener('open-mark1-chat', handleOpenTrigger);
      delete window.__openMark1Chat;
    };
  }, [setIsOpen]);

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
  }, [isOpen, setIsOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    const userMsgId = nextMsgId('user');
    setMessages((prev) => [...prev, { id: userMsgId, role: 'user', content: text }]);
    setInputValue('');
    setIsLoading(true);

    const startTime = nowTimestamp();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MARK1_CONFIG.requestTimeoutMs);

    try {
      const payload = {
        message: text,
        conversationId
      };

      const res = await fetch(MARK1_CONFIG.chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const elapsedSeconds = formatElapsed(startTime);

      if (!res.ok) {
        throw new Error(`Mark 1 service responded with status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'Request completed with no content returned.';

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const providerLabel = data.provider
        ? `${data.provider.charAt(0).toUpperCase() + data.provider.slice(1)}${data.fallback ? ' · Fallback' : ''}`
        : 'Gemini';

      const toolNames = Array.isArray(data.toolCalls) && data.toolCalls.length > 0
        ? data.toolCalls.map((t) => (typeof t === 'string' ? t : (t.name || t.tool || 'tool'))).filter(Boolean)
        : [];

      const ragCount = Array.isArray(data.retrievedChunks) ? data.retrievedChunks.length : 0;

      setMessages((prev) => [
        ...prev,
        {
          id: nextMsgId('agent'),
          role: 'assistant',
          content: reply,
          provider: providerLabel,
          responseTime: `${elapsedSeconds}s`,
          toolCalls: toolNames,
          steps: data.steps,
          ragCount,
          isInitial: false
        }
      ]);
    } catch (err) {
      clearTimeout(timeoutId);
      let userFriendly = 'Mark 1 is temporarily unavailable. Try again or open the full application.';
      if (err.name === 'AbortError') {
        userFriendly = 'Request timed out waiting for the reasoning pipeline. Please try again or open the full application.';
      }
      setErrorMsg(userFriendly);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setConversationId(generateSessionId());
    setMessages([
      {
        id: 'initial',
        role: 'assistant',
        content: "Hi, I'm Mark 1. Ask me about Shahbaz, his projects, skills, education, or Mark 1 AI.",
        isInitial: true
      }
    ]);
    setErrorMsg(null);
    setInputValue('');
  };

  // Helper to format assistant responses
  const renderMessageContent = (content) => {
    const paragraphs = (content || '').split('\n\n');
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
          aria-label={isOpen ? 'Close Mark 1 AI' : 'Open Mark 1 AI — Live Agent'}
          aria-expanded={isOpen}
        >
          <div className="launcher-sparkle-icon">
            <Bot size={16} />
          </div>
          <span className="launcher-label">Mark 1 AI</span>
          <span className="launcher-pulse-dot" aria-hidden="true" />
        </button>
      </div>

      {/* 2. Floating Chat Drawer / Modal */}
      {isOpen && (
        <div
          className="portfolio-assistant-modal"
          role="dialog"
          aria-label="Mark 1 AI Assistant"
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
                  <h3 className="assistant-title">Mark 1 AI</h3>
                </div>
                <p className="assistant-sub">Live agent · Gemini + Groq failover</p>
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
              <a
                href={MARK1_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="assistant-header-btn"
                title="Open standalone Mark 1 deployment in new tab"
                aria-label="Open standalone Mark 1 deployment"
              >
                <ArrowUpRight size={15} />
              </a>
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
            aria-label="Conversation log with Mark 1 AI"
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

                  {/* Real Mark 1 Telemetry Chips */}
                  {msg.role === 'assistant' && !msg.isInitial && (
                    <div className="assistant-telemetry">
                      {msg.provider && (
                        <span className="assistant-telemetry-pill">
                          <Cpu size={10} />
                          <span>{msg.provider}</span>
                        </span>
                      )}
                      {msg.responseTime && (
                        <span className="assistant-telemetry-pill">
                          <span>{msg.responseTime}</span>
                        </span>
                      )}
                      {msg.steps && msg.steps > 1 && (
                        <span className="assistant-telemetry-pill">
                          <span>{msg.steps} steps</span>
                        </span>
                      )}
                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <span className="assistant-telemetry-pill assistant-chip-tools">
                          <Wrench size={10} />
                          <span>Tools: {msg.toolCalls.join(', ')}</span>
                        </span>
                      )}
                      {msg.ragCount > 0 && (
                        <span className="assistant-telemetry-pill">
                          <span>RAG: {msg.ragCount} chunks</span>
                        </span>
                      )}
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
                  <div className="assistant-typing-dots" aria-label="Mark 1 is reasoning">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="assistant-loading-text">Mark 1 is reasoning...</span>
                </div>
              </div>
            )}

            {/* Graceful Error Banner */}
            {errorMsg && (
              <div className="assistant-error-banner" role="alert">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Question Pills */}
          <div className="assistant-suggestions-area">
            <span className="assistant-suggestions-label">TRY ASKING:</span>
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
                onChange={(e) => setInputValue(e.target.value.slice(0, MARK1_CONFIG.maxInputLength))}
                placeholder="Ask Mark 1 about Shahbaz, projects, skills, or failover..."
                className="assistant-input-field"
                disabled={isLoading}
                maxLength={MARK1_CONFIG.maxInputLength}
                aria-label="Ask Mark 1 a question"
              />
              <span className="assistant-char-counter">
                {inputValue.length}/{MARK1_CONFIG.maxInputLength}
              </span>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="assistant-send-btn"
                aria-label="Send message to Mark 1"
                title="Send message"
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
