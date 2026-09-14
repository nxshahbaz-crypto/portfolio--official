import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RotateCcw, AlertCircle, ArrowUpRight, Cpu, Wrench } from 'lucide-react';
import { MARK1_CONFIG } from '../config/mark1Config';

let msgSeq = 0;
const nextMsgId = (prefix) => `${prefix}-${++msgSeq}`;
const nowTimestamp = () => Date.now();
const formatElapsed = (start) => ((nowTimestamp() - start) / 1000).toFixed(1);

export const Mark1Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi, I'm Mark 1. Ask me something to see the agent in action.",
      isInitial: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [systemStatus, setSystemStatus] = useState({ online: true, text: 'Mark 1 Online · Dual Failover' });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Check live status on mount
  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      try {
        const res = await fetch(MARK1_CONFIG.statusEndpoint);
        if (!res.ok) throw new Error('Status unavailable');
        const data = await res.json();
        if (isMounted) {
          const primary = data.primaryProvider || 'Gemini';
          const fallback = data.fallbackProvider || 'Groq';
          setSystemStatus({
            online: true,
            text: `Mark 1 Online · ${primary.charAt(0).toUpperCase() + primary.slice(1)} / ${fallback.charAt(0).toUpperCase() + fallback.slice(1)} Failover`
          });
        }
      } catch {
        if (isMounted) {
          setSystemStatus({
            online: true,
            text: 'Mark 1 Online · Gemini / Groq Failover'
          });
        }
      }
    };

    checkStatus();
    return () => { isMounted = false; };
  }, []);

  // Send message to live backend
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    const userMsgId = nextMsgId('user');
    const newMessages = [
      ...messages,
      { id: userMsgId, role: 'user', content: text }
    ];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const startTime = nowTimestamp();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MARK1_CONFIG.requestTimeoutMs);

    try {
      const payload = {
        message: text,
        ...(conversationId ? { conversationId } : {})
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
        ? `${data.provider.charAt(0).toUpperCase() + data.provider.slice(1)}${data.fallback ? ' (Fallback)' : ''}`
        : 'Gemini';

      const toolNames = Array.isArray(data.toolCalls) && data.toolCalls.length > 0
        ? data.toolCalls.map((t) => t.name || t.tool || 'tool').filter(Boolean)
        : [];

      setMessages((prev) => [
        ...prev,
        {
          id: nextMsgId('agent'),
          role: 'assistant',
          content: reply,
          provider: providerLabel,
          responseTime: `${elapsedSeconds}s response time`,
          toolCalls: toolNames,
          isInitial: false
        }
      ]);
    } catch (err) {
      clearTimeout(timeoutId);
      let userFriendly = 'Unable to reach Mark 1 right now. You can try again or visit the standalone deployment.';
      if (err.name === 'AbortError') {
        userFriendly = 'Request timed out waiting for the reasoning pipeline. Please try again.';
      }
      setErrorMsg(userFriendly);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'initial',
        role: 'assistant',
        content: "Hi, I'm Mark 1. Ask me something to see the agent in action.",
        isInitial: true
      }
    ]);
    setConversationId(null);
    setErrorMsg(null);
    setInputValue('');
  };

  // Minimal formatting helper for assistant responses
  const renderMessageContent = (content) => {
    // Split into paragraphs
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <p key={pIdx} className="mark1-msg-para">
          {lines.map((line, lIdx) => {
            // Check for list item
            const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
            const cleanedLine = isBullet ? line.trim().slice(2) : line;

            // Simple bold parsing (**text**)
            const parts = cleanedLine.split(/(\*\*.*?\*\*)/g);

            const renderedLine = parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              return part;
            });

            if (isBullet) {
              return (
                <span key={lIdx} className="mark1-bullet-item">
                  <span className="mark1-bullet-dot">•</span>
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
    <div className="mark1-chat-card" role="region" aria-label="Interactive Mark 1 AI Experience">
      {/* Chat Sub-Header / Telemetry Status */}
      <div className="mark1-chat-topbar">
        <div className="mark1-topbar-status">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="mark1-status-label">{systemStatus.text}</span>
        </div>

        <div className="mark1-topbar-actions">
          <button
            type="button"
            onClick={handleReset}
            className="mark1-action-btn"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <a
            href={MARK1_CONFIG.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mark1-action-btn mark1-action-external"
            title="Open standalone Mark 1 deployment in new tab"
          >
            <span>Open Mark 1</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Message History Window */}
      <div
        className="mark1-chat-viewport"
        role="log"
        aria-live="polite"
        aria-label="Mark 1 conversation log"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mark1-message-row ${msg.role === 'user' ? 'mark1-row-user' : 'mark1-row-agent'}`}
          >
            {msg.role === 'assistant' && (
              <div className="mark1-avatar" aria-hidden="true">
                <Bot size={15} />
              </div>
            )}

            <div className={`mark1-message-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-agent'}`}>
              <div className="mark1-message-text">
                {renderMessageContent(msg.content)}
              </div>

              {/* Telemetry pill on real agent responses */}
              {msg.role === 'assistant' && !msg.isInitial && (
                <div className="mark1-msg-telemetry">
                  {msg.provider && (
                    <span className="mark1-telemetry-chip">
                      <Cpu size={11} />
                      <span>{msg.provider}</span>
                    </span>
                  )}
                  {msg.responseTime && (
                    <span className="mark1-telemetry-chip">
                      <span>{msg.responseTime}</span>
                    </span>
                  )}
                  {msg.toolCalls && msg.toolCalls.length > 0 && (
                    <span className="mark1-telemetry-chip mark1-chip-tools">
                      <Wrench size={11} />
                      <span>Tools: {msg.toolCalls.join(', ')}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mark1-message-row mark1-row-agent">
            <div className="mark1-avatar" aria-hidden="true">
              <Bot size={15} />
            </div>
            <div className="mark1-message-bubble bubble-agent bubble-loading">
              <div className="mark1-typing-dots" aria-label="Mark 1 is reasoning and evaluating tools">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
              <span className="mark1-loading-text">Mark 1 is reasoning...</span>
            </div>
          </div>
        )}

        {/* Graceful Error Banner */}
        {errorMsg && (
          <div className="mark1-error-banner" role="alert">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Demonstration Prompts */}
      <div className="mark1-suggested-row" aria-label="Suggested capability prompts">
        <span className="mark1-suggested-label">Try:</span>
        <div className="mark1-suggested-pills">
          {MARK1_CONFIG.suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="mark1-prompt-pill"
              disabled={isLoading}
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        className="mark1-chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="mark1-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="mark1-chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, MARK1_CONFIG.maxInputLength))}
            onKeyDown={handleKeyDown}
            placeholder="Ask Mark 1 about its architecture, tools, or failover..."
            aria-label="Ask Mark 1 a question"
            disabled={isLoading}
            maxLength={MARK1_CONFIG.maxInputLength}
          />

          <span className="mark1-char-count" aria-hidden="true">
            {inputValue.length}/{MARK1_CONFIG.maxInputLength}
          </span>
        </div>

        <button
          type="submit"
          className="mark1-send-btn"
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send message to Mark 1"
          title="Send message"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};
