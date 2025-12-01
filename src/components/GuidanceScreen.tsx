import React from 'react';
import { AIResponse, PromptCategory } from '../types';
import { ScriptureWithTranslations } from './ScriptureWithTranslations';
import './GuidanceScreen.css';

interface GuidanceScreenProps {
  category: PromptCategory;
  guidance: AIResponse;
  onBack: () => void;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({
  category,
  guidance,
  onBack
}) => {
  return (
    <div className="guidance-screen fade-in">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="guidance-header">
        <div className="category-icon-large">{category.icon}</div>
        <h1>{category.title}</h1>
        <p className="category-subtitle">{category.description}</p>
      </div>

      <div className="guidance-content">
        <section className="guidance-message">
          <h2>Jehovah's Comfort for You</h2>
          <p>{guidance.guidance}</p>
        </section>

        <section className="scriptures-section">
          <h2>Scriptures for Your Journey</h2>
          <p className="scriptures-intro">
            Read these verses in multiple translations to deepen your understanding of God's message for you.
          </p>
          <div className="scriptures-list">
            {guidance.scriptures.map((scripture, index) => (
              <div key={index} className="scripture-item-wrapper slide-in">
                <div className="verse-marker">{index + 1}</div>
                <ScriptureWithTranslations
                  scripture={scripture}
                  defaultTranslation="NIV"
                  showAllTranslations={false}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="practical-advice">
          <h2>Practical Steps Forward</h2>
          <p className="advice-intro">
            Here are some practical ways to apply God's wisdom in your situation:
          </p>
          <ul className="advice-list">
            {guidance.practicalAdvice.map((advice, index) => (
              <li key={index} className="advice-item slide-in">
                <span className="advice-number">{index + 1}</span>
                <span className="advice-text">{advice}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="prayer-section">
          <h3>A Prayer for You</h3>
          <p className="prayer-text">
            "Heavenly Father Jehovah, I thank you for your constant presence in my
            life. Help me to trust in your perfect plan, even when I don't
            understand. Give me strength for today and hope for tomorrow. May
            your Word guide my steps and your Spirit comfort my heart. In Jesus'
            name, Amen."
          </p>
        </section>
      </div>
    </div>
  );
};
