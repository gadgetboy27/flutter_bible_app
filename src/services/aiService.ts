import { AIResponse, PromptCategory, Scripture } from '../types';
import { scriptureDatabase } from '../data/scriptures';

// AI service that matches scriptures to user's needs
export class AIService {
  // Match scriptures based on keywords from the selected category
  static findRelevantScriptures(category: PromptCategory): Scripture[] {
    const relevantScriptures: Scripture[] = [];
    const keywords = category.keywords.map(k => k.toLowerCase());

    scriptureDatabase.forEach(scripture => {
      const searchText = `${scripture.text} ${scripture.book}`.toLowerCase();

      // Check if scripture text contains any of the keywords
      const matchScore = keywords.filter(keyword =>
        searchText.includes(keyword)
      ).length;

      if (matchScore > 0) {
        relevantScriptures.push(scripture);
      }
    });

    // If we found matches, return them; otherwise return a broader selection
    if (relevantScriptures.length > 0) {
      return relevantScriptures.slice(0, 5);
    }

    // Fallback to comfort and hope scriptures
    return this.getComfortScriptures();
  }

  // Get comfort scriptures as fallback
  private static getComfortScriptures(): Scripture[] {
    return scriptureDatabase.slice(0, 5);
  }

  // Generate practical guidance based on the category
  static generateGuidance(category: PromptCategory): string {
    const guidanceMap: Record<string, string> = {
      anxiety: "Jehovah understands your worries and invites you to cast all your anxieties on Him. He promises His peace that surpasses all understanding. Take time to pray, breathe deeply, and remember that God is in control of all things.",

      loneliness: "Even in your loneliest moments, Jehovah is with you. He promises never to leave nor forsake you. His presence is constant and His love unfailing. Reach out to your faith community and remember that you are never truly alone.",

      sadness: "Jehovah is close to the brokenhearted and saves those who are crushed in spirit. Your tears are precious to Him, and He collects each one. Allow yourself to grieve, but also lean into His comforting presence. Joy will come in the morning.",

      lost: "When you feel lost, Jehovah promises to be your guide. He will direct your paths when you trust in Him. Seek His wisdom through prayer and scripture, and He will illuminate the next step you should take.",

      weakness: "In your weakness, God's strength is made perfect. Jehovah will renew your strength when you hope in Him. Rest in His power, not your own, and watch Him work through your limitations.",

      doubt: "Doubts are part of the human journey. Jehovah welcomes your honest questions and will strengthen your faith as you seek Him. Remember how He has been faithful in the past, and trust Him for the future.",

      anger: "Anger is a natural emotion, but Jehovah calls us to righteous patience. He is slow to anger and abounding in love. Take time to cool down, pray for peace, and extend the same grace God has given you.",

      guilt: "Jehovah's forgiveness is complete and total. If you confess your sins, He is faithful to forgive and cleanse you. Don't let guilt hold you captive—accept His mercy and walk in freedom.",

      hopeless: "Even in the darkest valley, Jehovah is your light. His plans for you are good, giving you hope and a future. What seems impossible to you is possible with God. Hold on—breakthrough is coming.",

      grateful: "A grateful heart attracts God's blessings. As you thank Jehovah for His goodness, you'll find joy multiplying in your life. Gratitude transforms your perspective and deepens your relationship with Him.",

      temptation: "Jehovah provides a way out of every temptation. Call on His strength in moments of weakness, fill your mind with His word, and flee from situations that compromise your faith. Victory is possible through Christ.",

      relationships: "Love as Jehovah loves—with patience, kindness, and forgiveness. Seek reconciliation where possible, set healthy boundaries where needed, and trust God to work in the hearts of those around you.",

      financial: "Jehovah is your provider. When you seek His kingdom first, He promises to meet all your needs. Trust His provision, be a good steward of what you have, and watch Him multiply your resources.",

      health: "Jehovah is your healer. Whether through medical intervention or miraculous touch, He can restore your body. Pray for healing, seek wise medical care, and trust in His perfect will for your life.",

      purpose: "Jehovah created you with unique gifts and a specific purpose. As you seek Him, He will reveal His plans for your life. Your purpose is found in loving God and serving others with the talents He's given you.",

      patience: "Jehovah's timing is perfect. While you wait, He is working behind the scenes for your good. Use this season to grow in faith, character, and dependence on Him. Your waiting is not in vain."
    };

    return guidanceMap[category.id] || "Jehovah loves you deeply and is with you in this moment. Trust in His goodness and His perfect plan for your life.";
  }

  // Generate practical advice steps
  static generatePracticalAdvice(category: PromptCategory): string[] {
    const adviceMap: Record<string, string[]> = {
      anxiety: [
        "Practice deep breathing exercises while meditating on scripture",
        "Write down your worries and symbolically give them to God through prayer",
        "Create a gratitude list to shift your focus from fear to faith",
        "Limit exposure to anxiety-triggering news or social media",
        "Connect with a trusted friend or spiritual mentor"
      ],

      loneliness: [
        "Join a church small group or Bible study",
        "Volunteer in your community to connect with others",
        "Reach out to one person each day, even with a simple message",
        "Develop a consistent prayer and devotional time",
        "Consider adopting a pet for companionship if appropriate"
      ],

      sadness: [
        "Allow yourself to feel and process emotions without judgment",
        "Journal your thoughts and prayers to God",
        "Listen to worship music that uplifts your spirit",
        "Engage in gentle physical activity like walking",
        "Seek professional counseling if sadness persists"
      ],

      lost: [
        "Set aside dedicated time for prayer and listening to God",
        "Seek wisdom from mature believers you trust",
        "Review your values and priorities in light of scripture",
        "Take one small step forward instead of waiting for complete clarity",
        "Keep a journal of insights and potential directions"
      ],

      weakness: [
        "Get adequate rest and take care of your physical health",
        "Memorize strength-giving scriptures to recall when needed",
        "Break large tasks into smaller, manageable steps",
        "Ask others for help—weakness is not meant to be carried alone",
        "Celebrate small victories along the way"
      ],

      doubt: [
        "Be honest with God about your questions—He can handle them",
        "Study the evidence for faith and God's faithfulness in scripture",
        "Talk with others who have wrestled with similar doubts",
        "Look for God in everyday moments and keep a 'God sightings' journal",
        "Remember that faith is a journey, not a destination"
      ],

      anger: [
        "Take a pause before responding—count to ten or take a walk",
        "Identify the root cause beneath the anger (hurt, fear, etc.)",
        "Express feelings appropriately without attacking others",
        "Practice forgiveness as an act of obedience, not emotion",
        "Use physical exercise to release built-up tension"
      ],

      guilt: [
        "Confess specifically to God and receive His forgiveness",
        "Make amends where possible with those you've hurt",
        "Replace guilt-driven thoughts with truth from scripture",
        "Forgive yourself as God has forgiven you",
        "Use lessons learned to make different choices going forward"
      ],

      hopeless: [
        "Reach out immediately to a crisis helpline if having thoughts of self-harm",
        "Share your feelings with a trusted friend, pastor, or counselor",
        "Focus on today only—don't project despair into the future",
        "Do one small thing that brings you comfort or joy",
        "Remember past difficulties you've overcome with God's help"
      ],

      grateful: [
        "Start each day listing three things you're thankful for",
        "Express appreciation to people who have blessed you",
        "Create a gratitude jar with daily notes of thanksgiving",
        "Share your blessings by giving to others",
        "Turn complaints into prayers of gratitude"
      ],

      temptation: [
        "Identify your triggers and create a plan to avoid them",
        "Memorize scripture to speak when tempted",
        "Have an accountability partner you can call",
        "Remove access to whatever tempts you when possible",
        "Replace the temptation with a healthy alternative activity"
      ],

      relationships: [
        "Practice active listening without planning your defense",
        "Seek to understand before seeking to be understood",
        "Apologize for your part in conflicts without excuses",
        "Pray for those who are difficult to love",
        "Set and maintain healthy boundaries with kindness"
      ],

      financial: [
        "Create a budget and track where money actually goes",
        "Practice tithing and generous giving to build trust in God's provision",
        "Seek financial counseling if debt is overwhelming",
        "Distinguish between needs and wants before purchases",
        "Look for creative ways to reduce expenses or increase income"
      ],

      health: [
        "Pray specifically for healing while seeking medical care",
        "Ask your church community for prayer support",
        "Take care of your body through proper nutrition and rest",
        "Follow medical advice and treatment plans faithfully",
        "Trust God's sovereignty whether healing comes quickly or slowly"
      ],

      purpose: [
        "Assess your God-given talents, passions, and experiences",
        "Try different forms of service to discover where you thrive",
        "Seek feedback from others about your strengths",
        "Remember that purpose often unfolds gradually, not all at once",
        "Start where you are—purpose is found in faithfulness to today"
      ],

      patience: [
        "Focus on what you can control today",
        "Use waiting time productively for growth and learning",
        "Practice contentment in your current season",
        "Keep a record of prayers to see how God answers in His timing",
        "Encourage others while you wait—it builds your own faith"
      ]
    };

    return adviceMap[category.id] || [
      "Spend time in prayer and meditation on God's word",
      "Connect with your faith community for support",
      "Trust in God's perfect timing and plan",
      "Take practical steps forward while relying on His strength"
    ];
  }

  // Main method to get AI response for a category
  static getGuidanceForCategory(category: PromptCategory): AIResponse {
    const scriptures = this.findRelevantScriptures(category);
    const guidance = this.generateGuidance(category);
    const practicalAdvice = this.generatePracticalAdvice(category);

    return {
      scriptures,
      guidance,
      practicalAdvice
    };
  }
}
