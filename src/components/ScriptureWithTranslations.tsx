import React, { useState } from 'react';
import { Scripture, BibleTranslation } from '../types';
import { BibleApiService, availableTranslations } from '../services/bibleApiService';
import './ScriptureWithTranslations.css';

interface ScriptureWithTranslationsProps {
  scripture: Scripture;
  defaultTranslation?: BibleTranslation;
  showAllTranslations?: boolean;
  compact?: boolean;
}

export const ScriptureWithTranslations: React.FC<ScriptureWithTranslationsProps> = ({
  scripture,
  defaultTranslation = 'NIV',
  showAllTranslations = false,
  compact = false
}) => {
  const [selectedTranslations, setSelectedTranslations] = useState<BibleTranslation[]>(
    showAllTranslations ? ['NIV', 'NWT', 'KJV'] : [defaultTranslation]
  );
  const [showTranslationPicker, setShowTranslationPicker] = useState(false);

  const translations = BibleApiService.getTranslations(scripture.reference);
  const hasMultipleTranslations = Object.keys(translations).length > 1;

  const toggleTranslation = (translation: BibleTranslation) => {
    if (selectedTranslations.includes(translation)) {
      // Keep at least one selected
      if (selectedTranslations.length > 1) {
        setSelectedTranslations(prev => prev.filter(t => t !== translation));
      }
    } else {
      setSelectedTranslations(prev => [...prev, translation]);
    }
  };

  const getTranslationText = (translation: BibleTranslation): string => {
    if (translation === 'NIV' || translation === defaultTranslation) {
      return scripture.text;
    }
    return translations[translation] || scripture.text;
  };

  return (
    <div className={`scripture-with-translations ${compact ? 'compact' : ''}`}>
      {hasMultipleTranslations && !compact && (
        <div className="translation-controls">
          <button
            className="translation-picker-button"
            onClick={() => setShowTranslationPicker(!showTranslationPicker)}
          >
            📚 {selectedTranslations.length} Translation{selectedTranslations.length > 1 ? 's' : ''}
          </button>

          {showTranslationPicker && (
            <div className="translation-picker">
              {availableTranslations
                .filter(t => translations[t.id])
                .map(translation => (
                  <label key={translation.id} className="translation-option">
                    <input
                      type="checkbox"
                      checked={selectedTranslations.includes(translation.id)}
                      onChange={() => toggleTranslation(translation.id)}
                    />
                    <div className="translation-info">
                      <span className="translation-name">{translation.name}</span>
                      <span className="translation-desc">{translation.description}</span>
                    </div>
                  </label>
                ))}
            </div>
          )}
        </div>
      )}

      <div className="translations-container">
        {selectedTranslations.map(translation => {
          const text = getTranslationText(translation);
          const translationInfo = availableTranslations.find(t => t.id === translation);

          return (
            <div key={translation} className="translation-block">
              {selectedTranslations.length > 1 && (
                <div className="translation-label">
                  <span className="translation-badge">{translation}</span>
                  {translationInfo && (
                    <span className="translation-name-small">{translationInfo.name}</span>
                  )}
                </div>
              )}
              <blockquote className={`scripture-text ${translation.toLowerCase()}`}>
                "{text}"
              </blockquote>
              {selectedTranslations.length === 1 && (
                <p className="scripture-reference">— {scripture.reference}</p>
              )}
            </div>
          );
        })}

        {selectedTranslations.length > 1 && (
          <p className="scripture-reference multi">— {scripture.reference}</p>
        )}
      </div>

      {hasMultipleTranslations && compact && (
        <p className="translations-hint">
          💡 Multiple translations available
        </p>
      )}
    </div>
  );
};
