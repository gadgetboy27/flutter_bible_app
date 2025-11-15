import { BibleTranslation, TranslationInfo } from '../types';

export const availableTranslations: TranslationInfo[] = [
  {
    id: 'NIV',
    name: 'New International Version',
    description: 'Modern, clear English translation',
    language: 'English'
  },
  {
    id: 'NWT',
    name: 'New World Translation',
    description: 'Published by Jehovah\'s Witnesses, emphasizes Jehovah\'s name',
    language: 'English'
  },
  {
    id: 'KJV',
    name: 'King James Version',
    description: 'Traditional, poetic English (1611)',
    language: 'Old English'
  },
  {
    id: 'Greek',
    name: 'Greek Interlinear',
    description: 'Original Greek text with word meanings',
    language: 'Greek'
  }
];

// Fallback translations for key verses when API is unavailable
// In production, these would be fetched from Bible APIs
export const translationDatabase: { [reference: string]: { [key in BibleTranslation]?: string } } = {
  'Psalms 46:1': {
    NIV: 'God is our refuge and strength, a very present help in trouble.',
    NWT: 'God is our refuge and strength, A helper who is readily found in times of distress.',
    KJV: 'God is our refuge and strength, a very present help in trouble.',
    Greek: 'ὁ Θεὸς ἡμῶν καταφυγὴ καὶ δύναμις (Ho Theos hēmōn kataphygē kai dynamis) - God our refuge and power'
  },
  'Matthew 11:28-30': {
    NIV: 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.',
    NWT: 'Come to me, all you who are toiling and loaded down, and I will refresh you. Take my yoke upon you and learn from me, for I am mild-tempered and lowly in heart, and you will find refreshment for yourselves. For my yoke is kindly, and my load is light.',
    KJV: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.',
    Greek: 'Δεῦτε πρός με πάντες οἱ κοπιῶντες (Deute pros me pantes hoi kopiōntes) - Come to me all who labor'
  },
  'John 14:27': {
    NIV: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    NWT: 'I leave you peace; I give you my peace. I do not give it to you the way that the world gives it. Do not let your hearts be troubled nor let them shrink out of fear.',
    KJV: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
    Greek: 'Εἰρήνην ἀφίημι ὑμῖν εἰρήνην τὴν ἐμὴν δίδωμι ὑμῖν (Eirēnēn aphiēmi hymin) - Peace I leave with you'
  },
  'Philippians 4:6-7': {
    NIV: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    NWT: 'Do not be anxious over anything, but in everything by prayer and supplication along with thanksgiving, let your petitions be made known to God; and the peace of God that surpasses all understanding will guard your hearts and your mental powers by means of Christ Jesus.',
    KJV: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    Greek: 'Μηδὲν μεριμνᾶτε (Mēden merimnate) - Be anxious for nothing'
  },
  'Isaiah 41:10': {
    NIV: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    NWT: 'Do not be afraid, for I am with you. Do not be anxious, for I am your God. I will fortify you, yes, I will help you, I will really hold on to you with my right hand of righteousness.',
    KJV: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    Greek: 'μὴ φοβοῦ ὅτι μετὰ σοῦ εἰμι (mē phobou hoti meta sou eimi) - Fear not for I am with you'
  },
  'Joshua 1:9': {
    NIV: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    NWT: 'Have I not commanded you? Be courageous and strong. Do not be struck with terror or fear, for Jehovah your God is with you wherever you go.',
    KJV: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    Greek: 'N/A (Old Testament - Hebrew: חֲזַק וֶאֱמָץ hazaq ve\'ematz - be strong and courageous)'
  },
  'Psalms 27:1': {
    NIV: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?',
    NWT: 'Jehovah is my light and my salvation. Whom should I fear? Jehovah is the stronghold of my life. Whom should I dread?',
    KJV: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    Greek: 'N/A (Hebrew: יְהוָה אוֹרִי Yahweh ori - Yahweh my light)'
  },
  'Jeremiah 29:11': {
    NIV: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
    NWT: 'For I well know the thoughts that I am thinking toward you, declares Jehovah, thoughts of peace, and not of calamity, to give you a future and a hope.',
    KJV: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    Greek: 'N/A (Hebrew: כִּי אָנֹכִי יָדַעְתִּי ki anokhi yadati - For I know)'
  },
  'Proverbs 3:5-6': {
    NIV: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    NWT: 'Trust in Jehovah with all your heart, And do not rely on your own understanding. In all your ways take notice of him, And he will make your paths straight.',
    KJV: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    Greek: 'N/A (Hebrew wisdom literature)'
  },
  '1 John 4:19': {
    NIV: 'We love because he first loved us.',
    NWT: 'We love, because he first loved us.',
    KJV: 'We love him, because he first loved us.',
    Greek: 'ἡμεῖς ἀγαπῶμεν ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς (hēmeis agapōmen hoti autos prōtos ēgapēsen hēmas)'
  },
  'Romans 15:13': {
    NIV: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
    NWT: 'May the God who gives hope fill you with all joy and peace by your trusting in him, so that you may abound in hope by the power of the holy spirit.',
    KJV: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
    Greek: 'ὁ δὲ Θεὸς τῆς ἐλπίδος πληρώσαι ὑμᾶς (ho de Theos tēs elpidos plērōsai hymas) - God of hope fill you'
  },
  'Psalms 23:1': {
    NIV: 'The Lord is my shepherd, I lack nothing.',
    NWT: 'Jehovah is my Shepherd. I will lack nothing.',
    KJV: 'The LORD is my shepherd; I shall not want.',
    Greek: 'N/A (Hebrew: יְהוָה רֹעִי Yahweh ro\'i - Yahweh my shepherd)'
  }
};

export class BibleApiService {
  // Get translations for a specific verse reference
  static getTranslations(reference: string): { [key in BibleTranslation]?: string } {
    // Normalize reference (remove spaces, etc.)
    const normalizedRef = reference.replace(/\s+/g, ' ').trim();

    // Check our local database first
    if (translationDatabase[normalizedRef]) {
      return translationDatabase[normalizedRef];
    }

    // If not found, return empty object
    // In production, this would trigger an API call
    return {};
  }

  // Get a specific translation for a verse
  static getSpecificTranslation(reference: string, translation: BibleTranslation): string | null {
    const translations = this.getTranslations(reference);
    return translations[translation] || null;
  }

  // Check if translations are available for a verse
  static hasTranslations(reference: string): boolean {
    const translations = this.getTranslations(reference);
    return Object.keys(translations).length > 1; // More than just the default
  }

  // Get available translations for a specific verse
  static getAvailableTranslationsForVerse(reference: string): BibleTranslation[] {
    const translations = this.getTranslations(reference);
    return Object.keys(translations) as BibleTranslation[];
  }
}
