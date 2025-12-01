# Daily Light - Your Spiritual Companion

A beautiful, peaceful Bible app with AI-powered scripture recommendations to help you through life's challenges and emotions.

## Features

### 🌅 Daily Scripture
- Receive a new, carefully selected scripture each day
- Calendar-based rotation ensures variety throughout the year
- Beautiful, peaceful UI design for calm meditation
- Daily reflection prompts to help you apply God's Word

### 💙 AI-Powered Help
- 16 pre-built prompts covering common life struggles:
  - Anxiety and worry
  - Loneliness and isolation
  - Sadness and grief
  - Feeling lost or directionless
  - Weakness and need for strength
  - Doubt and faith struggles
  - Anger and frustration
  - Guilt and need for forgiveness
  - Hopelessness and despair
  - Gratitude and thanksgiving
  - Temptation
  - Relationship struggles
  - Financial concerns
  - Health challenges
  - Seeking purpose
  - Need for patience

### 📖 Personalized Guidance
- AI matches relevant scriptures to your situation
- Practical, actionable advice based on Biblical wisdom
- Comforting messages about how Jehovah can help
- Beautiful presentation of God's Word

### 🎨 Peaceful Design
- Calming color palette with soft blues and neutrals
- Smooth animations and transitions
- Fully responsive for mobile, tablet, and desktop
- Clean, minimalist interface focused on the Word

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with CSS variables

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gadgetboy27/flutter_bible_app.git
cd flutter_bible_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the local URL shown (typically `http://localhost:5173`)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Project Structure

```
flutter_bible_app/
├── src/
│   ├── components/          # React components
│   │   ├── DailyScripture.tsx
│   │   ├── HelpScreen.tsx
│   │   └── GuidanceScreen.tsx
│   ├── data/               # Scripture database and prompts
│   │   ├── scriptures.ts
│   │   └── prompts.ts
│   ├── services/           # AI service for scripture matching
│   │   └── aiService.ts
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
└── vite.config.ts         # Vite configuration
```

## Features in Detail

### Daily Scripture Algorithm
The app uses a calendar-based algorithm to select a daily scripture. Based on the day of the year, it rotates through a curated collection of meaningful verses, ensuring you never see the same scripture on the same day of consecutive years.

### AI Scripture Matching
The AI service uses keyword matching to find the most relevant scriptures for your situation. It analyzes the selected category and matches keywords against a comprehensive database of scriptures covering:
- Comfort and Peace
- Strength and Courage
- Hope and Faith
- Love and Compassion
- Forgiveness
- Wisdom and Guidance
- Patience and Perseverance
- Joy and Gratitude
- Protection and Safety
- Healing
- Provision and Blessing

### Practical Guidance
For each life situation, the app provides:
1. A personalized message about how Jehovah can help
2. 5-7 relevant scripture verses
3. 5-6 practical action steps
4. A prayer for your situation

## Customization

### Adding New Scriptures
Edit `src/data/scriptures.ts` to add more verses to the database.

### Adding New Prompts
Edit `src/data/prompts.ts` to add new categories of struggles or emotions.

### Customizing Colors
Edit the CSS variables in `src/index.css` to change the color scheme:
```css
:root {
  --color-primary: #7B9AAA;
  --color-secondary: #E8DCC4;
  --color-accent: #C9A66B;
  /* ... more colors */
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- All scripture quotations are from the New International Version (NIV) of the Bible
- Design inspired by principles of peaceful, meditative interfaces
- Built with love and faith to help people connect with God's Word

---

*"Your word is a lamp for my feet, a light on my path." — Psalms 119:105*
