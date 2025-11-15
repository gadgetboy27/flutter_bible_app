import { ConversationResponse, Scripture } from '../types';
import { scriptureDatabase } from '../data/scriptures';

export class ConversationService {
  // Analyze user message and find relevant keywords
  private static extractKeywords(message: string): string[] {
    const lowerMessage = message.toLowerCase();
    const keywords: string[] = [];

    // Common struggle keywords
    const keywordMap = {
      anxiety: ['anxious', 'anxiety', 'worry', 'worried', 'stress', 'stressed', 'nervous', 'panic'],
      lonely: ['lonely', 'alone', 'isolated', 'isolation', 'no friends', 'by myself'],
      sad: ['sad', 'depressed', 'depression', 'down', 'unhappy', 'grief', 'mourning'],
      lost: ['lost', 'confused', 'direction', 'purpose', 'meaning', 'dont know what'],
      weak: ['weak', 'tired', 'exhausted', 'drained', 'no energy', 'cant go on'],
      doubt: ['doubt', 'faith', 'believe', 'questioning', 'unsure'],
      angry: ['angry', 'mad', 'frustrated', 'irritated', 'rage', 'furious'],
      guilt: ['guilty', 'guilt', 'shame', 'ashamed', 'regret', 'mistake'],
      hopeless: ['hopeless', 'despair', 'give up', 'no hope', 'pointless'],
      fear: ['afraid', 'fear', 'scared', 'terrified', 'frightened'],
      work: ['work', 'job', 'career', 'boss', 'coworker', 'workplace', 'employment'],
      family: ['family', 'parent', 'mother', 'father', 'sibling', 'relative'],
      relationship: ['relationship', 'marriage', 'spouse', 'partner', 'boyfriend', 'girlfriend', 'divorce'],
      financial: ['money', 'financial', 'debt', 'bills', 'broke', 'poor', 'finances'],
      health: ['sick', 'illness', 'disease', 'pain', 'health', 'medical', 'hospital'],
      forgiveness: ['forgive', 'forgiveness', 'hurt', 'betrayed', 'wronged'],
      patience: ['patience', 'patient', 'waiting', 'impatient', 'hurry'],
      strength: ['strength', 'strong', 'courage', 'brave', 'power'],
      peace: ['peace', 'calm', 'rest', 'quiet', 'tranquil'],
      love: ['love', 'loved', 'loving', 'compassion', 'care'],
      grateful: ['grateful', 'thankful', 'gratitude', 'blessed', 'appreciate']
    };

    for (const [category, terms] of Object.entries(keywordMap)) {
      if (terms.some(term => lowerMessage.includes(term))) {
        keywords.push(category);
      }
    }

    return keywords;
  }

  // Find relevant scriptures based on keywords
  private static findRelevantScriptures(keywords: string[]): Scripture[] {
    const relevantScriptures: Scripture[] = [];
    const seenReferences = new Set<string>();

    keywords.forEach(keyword => {
      scriptureDatabase.forEach(scripture => {
        const searchText = `${scripture.text} ${scripture.book}`.toLowerCase();

        if (searchText.includes(keyword) && !seenReferences.has(scripture.reference)) {
          relevantScriptures.push(scripture);
          seenReferences.add(scripture.reference);
        }
      });
    });

    // Return up to 3 most relevant scriptures
    return relevantScriptures.slice(0, 3);
  }

  // Generate personalized response based on user's message
  private static generatePersonalizedResponse(message: string, keywords: string[]): string {
    const responses: { [key: string]: string[] } = {
      work: [
        "Work challenges can be incredibly stressful. Remember that God is with you in your workplace, and He cares about every aspect of your life, including your career.",
        "I hear you're struggling at work. Jehovah sees your efforts and your struggles. He promises to give you wisdom and strength for each day.",
        "Work stress is a common burden. God wants you to find balance and peace, even in difficult professional situations."
      ],
      anxiety: [
        "Anxiety can feel overwhelming, but you're not alone in this. God invites you to cast all your anxieties on Him because He cares for you deeply.",
        "I understand how anxiety can consume your thoughts. Jehovah offers His perfect peace that surpasses all understanding.",
        "Your worries are valid, and God sees them. He promises to be your refuge and strength, especially in times of trouble."
      ],
      lonely: [
        "Loneliness is painful, but please know that Jehovah never leaves you. His presence is constant, even when you feel most alone.",
        "I'm sorry you're feeling isolated. God understands loneliness - remember that He is always near to the brokenhearted.",
        "Feeling alone can be one of the hardest struggles. But God promises He will never leave you nor forsake you."
      ],
      sad: [
        "I'm truly sorry you're going through this sadness. Jehovah is close to the brokenhearted and saves those who are crushed in spirit.",
        "Your pain matters to God. He collects your tears and promises that joy will come again.",
        "Sadness is part of the human experience, but it doesn't have to be permanent. God offers comfort and healing for your heart."
      ],
      family: [
        "Family issues can be deeply painful. God understands the complexity of family relationships and offers wisdom for navigating them.",
        "I hear you about your family struggles. Jehovah can bring healing and reconciliation, even in the most difficult family situations.",
        "Family challenges are some of the hardest to face. Remember that God is the ultimate Father who loves you perfectly."
      ],
      relationship: [
        "Relationship struggles can be heartbreaking. God cares about your relationships and wants to bring healing and wisdom to your situation.",
        "I understand relationship pain cuts deep. Jehovah can provide guidance, whether that means healing, reconciliation, or the strength to move forward.",
        "Relationships are complex, and God sees every hurt you're experiencing. He offers both practical wisdom and emotional healing."
      ],
      financial: [
        "Financial stress can be consuming. Remember that God is your provider, and He promises to meet your needs as you trust in Him.",
        "Money worries are real and pressing. Jehovah sees your needs and invites you to seek His kingdom first, trusting Him with provision.",
        "Financial challenges are difficult, but God has promised to supply all your needs according to His riches."
      ]
    };

    // Find the most relevant response
    for (const keyword of keywords) {
      if (responses[keyword]) {
        return responses[keyword][Math.floor(Math.random() * responses[keyword].length)];
      }
    }

    // Default response if no specific keywords match
    return "Thank you for sharing what's on your heart. Jehovah cares deeply about every aspect of your life and wants to walk through this with you. Let's look at what His Word says about your situation.";
  }

  // Generate practical steps based on the situation
  private static generatePracticalSteps(message: string, keywords: string[]): string[] {
    const steps: string[] = [];

    // Add talking to others as a step
    if (keywords.includes('work') || keywords.includes('anxiety') || keywords.includes('lonely') ||
        keywords.includes('sad') || keywords.includes('relationship')) {
      steps.push("Talk to a trusted friend or family member about what you're going through - sharing your burden can bring relief and perspective");
    }

    // Add professional help for serious issues
    if (keywords.includes('hopeless') || keywords.includes('sad') || keywords.includes('anxiety')) {
      steps.push("Consider reaching out to a professional counselor or therapist who can provide expert support");
    }

    // Add prayer and scripture
    steps.push("Spend time in prayer each day, honestly sharing your feelings with God");
    steps.push("Read and meditate on the scriptures below - let God's Word speak to your situation");

    // Add specific practical steps based on keywords
    if (keywords.includes('work')) {
      steps.push("Set healthy boundaries at work - it's okay to say no and protect your personal time");
      steps.push("Document your concerns if dealing with workplace issues, and consider speaking with HR if needed");
    }

    if (keywords.includes('relationship') || keywords.includes('family')) {
      steps.push("Practice active listening - seek to understand before being understood");
      steps.push("Consider relationship counseling if conflicts persist - there's no shame in getting help");
    }

    if (keywords.includes('financial')) {
      steps.push("Create a simple budget to understand where your money is going");
      steps.push("Seek financial counseling from your church or a non-profit credit counseling service");
    }

    if (keywords.includes('health')) {
      steps.push("Follow your doctor's advice and treatment plan faithfully");
      steps.push("Ask your church community for prayer and practical support");
    }

    // Add self-care
    steps.push("Take care of your physical health - rest, nutrition, and gentle exercise can help");

    // Add community connection
    if (!keywords.includes('lonely')) {
      steps.push("Connect with your faith community - you don't have to go through this alone");
    } else {
      steps.push("Join a church small group or Bible study to build meaningful connections");
    }

    return steps.slice(0, 6); // Return up to 6 steps
  }

  // Generate conversation suggestions
  private static generateSuggestions(keywords: string[]): string[] {
    const suggestions = [
      "How can I pray about this?",
      "What does the Bible say about forgiveness?",
      "I need encouragement today",
      "Help me understand God's plan in this"
    ];

    if (keywords.includes('work')) {
      suggestions.unshift("How do I handle difficult coworkers?");
    }

    if (keywords.includes('family') || keywords.includes('relationship')) {
      suggestions.unshift("How can I improve communication?");
    }

    return suggestions.slice(0, 4);
  }

  // Main method to process user message and generate response
  static processMessage(userMessage: string): ConversationResponse {
    const keywords = this.extractKeywords(userMessage);
    const message = this.generatePersonalizedResponse(userMessage, keywords);
    const scriptures = keywords.length > 0 ? this.findRelevantScriptures(keywords) : [];
    const practicalSteps = this.generatePracticalSteps(userMessage, keywords);
    const suggestions = this.generateSuggestions(keywords);

    return {
      message,
      scriptures: scriptures.length > 0 ? scriptures : undefined,
      practicalSteps,
      suggestions
    };
  }
}
