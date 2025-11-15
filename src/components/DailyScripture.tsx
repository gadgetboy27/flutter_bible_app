import React from 'react';
import { getDailyScripture } from '../data/scriptures';
import './DailyScripture.css';

export const DailyScripture: React.FC = () => {
  const scripture = getDailyScripture();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="daily-scripture fade-in">
      <div className="daily-header">
        <h1>Daily Light</h1>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="scripture-card">
        <div className="scripture-icon">✨</div>
        <blockquote className="scripture-text">
          "{scripture.text}"
        </blockquote>
        <p className="scripture-reference">— {scripture.reference}</p>
      </div>

      <div className="reflection-section">
        <h3>Today's Reflection</h3>
        <p>
          Take a moment to meditate on these words. How might Jehovah be
          speaking to you through this scripture today? Consider writing down
          your thoughts or sharing this verse with someone who needs encouragement.
        </p>
      </div>
    </div>
  );
};
