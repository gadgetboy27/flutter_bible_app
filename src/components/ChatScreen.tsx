import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ConversationService } from '../services/conversationService';
import { ScriptureWithTranslations } from './ScriptureWithTranslations';
import './ChatScreen.css';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm here to listen and provide guidance from God's Word. What's on your heart today? You can share anything - work struggles, relationship issues, worries, or whatever you're facing.",
      timestamp: new Date(),
      suggestions: [
        "I'm struggling at work",
        "I feel anxious about the future",
        "I'm having family problems",
        "I need guidance with a decision"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();

    if (!textToSend) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = ConversationService.processMessage(textToSend);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        scriptures: response.scriptures,
        practicalSteps: response.practicalSteps
      };

      // Add suggestions back if available
      if (response.suggestions) {
        (assistantMessage as any).suggestions = response.suggestions;
      }

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-screen fade-in">
      <div className="chat-header">
        <h1>💬 Talk With Me</h1>
        <p>Share your struggles, and let's find guidance together</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                <p className="message-text">{message.content}</p>

                {message.scriptures && message.scriptures.length > 0 && (
                  <div className="message-scriptures">
                    <h4>📖 Scriptures for You (Multiple Translations):</h4>
                    {message.scriptures.map((scripture, idx) => (
                      <div key={idx} className="scripture-wrapper">
                        <ScriptureWithTranslations
                          scripture={scripture}
                          defaultTranslation="NIV"
                          showAllTranslations={false}
                          compact={false}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {message.practicalSteps && message.practicalSteps.length > 0 && (
                  <div className="practical-steps">
                    <h4>🛤️ Practical Steps:</h4>
                    <ul>
                      {message.practicalSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(message as any).suggestions && (message as any).suggestions.length > 0 && (
                  <div className="suggestions">
                    <p className="suggestions-label">You might also ask:</p>
                    <div className="suggestion-buttons">
                      {(message as any).suggestions.map((suggestion: string, idx: number) => (
                        <button
                          key={idx}
                          className="suggestion-button"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message assistant-message">
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Share what's on your heart..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button
            className="send-button"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
          >
            Send
          </button>
        </div>
      </div>

      <div className="chat-info">
        <p>
          💡 This is a supportive space. I'll provide Biblical guidance and practical suggestions,
          but for serious issues, please reach out to trusted friends, family, or professional counselors.
        </p>
      </div>
    </div>
  );
};
