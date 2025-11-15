export interface Scripture {
  book: string;
  chapter: number;
  verse: string;
  text: string;
  reference: string;
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

export type ViewType = 'home' | 'daily' | 'help' | 'guidance';
