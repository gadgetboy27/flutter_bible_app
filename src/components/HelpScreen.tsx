import React from 'react';
import { PromptCategory } from '../types';
import { promptCategories } from '../data/prompts';
import './HelpScreen.css';

interface HelpScreenProps {
  onSelectCategory: (category: PromptCategory) => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ onSelectCategory }) => {
  return (
    <div className="help-screen fade-in">
      <div className="help-header">
        <h1>How Can We Help?</h1>
        <p>
          Life brings many challenges. Choose what you're experiencing, and let
          Jehovah's Word bring you comfort, guidance, and hope.
        </p>
      </div>

      <div className="categories-grid">
        {promptCategories.map((category) => (
          <button
            key={category.id}
            className="category-card slide-in"
            onClick={() => onSelectCategory(category)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description">{category.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
