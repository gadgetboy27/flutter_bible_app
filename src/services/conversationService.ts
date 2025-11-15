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
        "The Scriptures remind us in Colossians 3:23: 'Whatever you do, work at it with all your heart, as working for the Lord.' Jehovah sees your labor and honors your faithfulness, even when others don't recognize it.",
        "Proverbs 16:3 tells us to 'Commit to the Lord whatever you do, and he will establish your plans.' God is with you in your workplace. Let's ground your next steps in His wisdom.",
        "Remember Philippians 4:13: 'I can do all this through him who gives me strength.' Your work challenges are not beyond God's ability to sustain and guide you through."
      ],
      anxiety: [
        "Scripture speaks directly to anxiety in Philippians 4:6-7: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' This isn't just advice—it's God's invitation to release your burdens to Him.",
        "Jesus himself said in Matthew 11:28: 'Come to me, all you who are weary and burdened, and I will give you rest.' This is His promise to you right now—rest for your anxious soul.",
        "God knows your worries. Psalm 46:1 declares: 'God is our refuge and strength, a very present help in trouble.' He is present with you in this moment of anxiety."
      ],
      lonely: [
        "Scripture promises in Deuteronomy 31:6: 'The Lord your God goes with you; he will never leave you nor forsake you.' Even in your loneliness, Jehovah's presence is constant.",
        "Psalm 68:6 tells us 'God sets the lonely in families.' He sees your isolation and wants to surround you with community and connection.",
        "Jesus experienced loneliness too. He understands. Hebrews 13:5 reminds us: 'Never will I leave you; never will I forsake you.' This is God's unchanging promise to you."
      ],
      sad: [
        "Psalm 34:18 speaks directly to your heart: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' Your sadness matters to God—He is near to you now.",
        "Jesus wept (John 11:35), showing us that sadness is part of being human. God doesn't condemn your tears; He collects them (Psalm 56:8) and promises that 'weeping may stay for the night, but rejoicing comes in the morning' (Psalm 30:5).",
        "Isaiah 61:3 promises that God will 'bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning.' Hold onto this hope—your sadness will not last forever."
      ],
      family: [
        "Ephesians 4:32 guides family relationships: 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.' Let God's forgiveness be your model.",
        "Proverbs 15:1 teaches: 'A gentle answer turns away wrath, but a harsh word stirs up anger.' God's wisdom can transform your family dynamics.",
        "Remember that even biblical families struggled—yet God worked through their imperfections. He can work through yours too. Seek His wisdom as you navigate these relationships."
      ],
      relationship: [
        "1 Corinthians 13:4-7 defines love: 'Love is patient, love is kind...' These aren't just words—they're God's design for relationships. Let Scripture guide your interactions.",
        "Colossians 3:13 instructs: 'Bear with each other and forgive one another.' Relationships require grace—the same grace God extends to us daily.",
        "Whether reconciliation or healing is needed, God sees your situation. James 1:5 promises: 'If any of you lacks wisdom, you should ask God, who gives generously.'"
      ],
      financial: [
        "Matthew 6:33 redirects our focus: 'Seek first his kingdom and his righteousness, and all these things will be given to you as well.' Jehovah promises provision when we prioritize Him.",
        "Philippians 4:19 is God's direct promise: 'My God will meet all your needs according to the riches of his glory in Christ Jesus.' Trust this truth.",
        "Hebrews 13:5 reminds us: 'Keep your lives free from the love of money and be content with what you have, because God has said, \"Never will I leave you; never will I forsake you.\"' Your worth isn't in your bank account—it's in being God's beloved child."
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
