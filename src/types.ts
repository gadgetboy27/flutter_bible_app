export interface Scripture {
  book: string;
  chapter: number;
  verse: string;
  text: string;
  reference: string;
  translations?: {
    [key: string]: string; // e.g., { 'NWT': '...', 'KJV': '...', 'Greek': '...' }
  };
}

export type BibleTranslation = 'NIV' | 'NWT' | 'KJV' | 'Greek';

export interface TranslationInfo {
  id: BibleTranslation;
  name: string;
  description: string;
  language: string;
}

export interface PromptCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  keywords: string[];
}

export interface AIResponse {
  scriptures: Scripture[];
  guidance: string;
  practicalAdvice: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  scriptures?: Scripture[];
  practicalSteps?: string[];
}

export interface ConversationResponse {
  message: string;
  scriptures?: Scripture[];
  practicalSteps?: string[];
  suggestions?: string[];
}

export type ViewType = 'home' | 'daily' | 'help' | 'guidance' | 'chat';
