import React, { useState } from 'react';
import { ViewType, PromptCategory, AIResponse } from './types';
import { DailyScripture } from './components/DailyScripture';
import { HelpScreen } from './components/HelpScreen';
import { GuidanceScreen } from './components/GuidanceScreen';
import { AIService } from './services/aiService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | null>(null);
  const [guidanceData, setGuidanceData] = useState<AIResponse | null>(null);

  const handleCategorySelect = (category: PromptCategory) => {
    setSelectedCategory(category);
    const guidance = AIService.getGuidanceForCategory(category);
    setGuidanceData(guidance);
    setCurrentView('guidance');
  };

  const handleBackToHelp = () => {
    setCurrentView('help');
    setSelectedCategory(null);
    setGuidanceData(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
      case 'daily':
        return <DailyScripture />;
      case 'help':
        return <HelpScreen onSelectCategory={handleCategorySelect} />;
      case 'guidance':
        return selectedCategory && guidanceData ? (
          <GuidanceScreen
            category={selectedCategory}
            guidance={guidanceData}
            onBack={handleBackToHelp}
          />
        ) : null;
      default:
        return <DailyScripture />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="app-title">
            <span className="app-icon">✝</span>
            <span className="app-name">Daily Light</span>
          </div>

          <div className="nav-links">
            <button
              className={`nav-link ${currentView === 'daily' || currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('daily')}
            >
              <span className="nav-icon">📖</span>
              <span>Daily Scripture</span>
            </button>

            <button
              className={`nav-link ${currentView === 'help' || currentView === 'guidance' ? 'active' : ''}`}
              onClick={() => setCurrentView('help')}
            >
              <span className="nav-icon">💙</span>
              <span>Find Help</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderView()}
      </main>

      <footer className="footer">
        <p>
          "Your word is a lamp for my feet, a light on my path." — Psalms 119:105
        </p>
        <p className="footer-note">
          May God's Word bring you peace, hope, and strength today.
        </p>
      </footer>
    </div>
  );
}

export default App;
