# AI Companion Counselor

An AI-powered mental health support system designed to provide companionship and resources for people dealing with depression or seeking emotional support.

## Features

- **AI Chat Companion**: Engage in meaningful conversations with an AI friend who's here to listen and support you
- **Mood Tracking**: Monitor your emotional well-being over time with an intuitive mood tracking system
- **Mental Health Resources**: Access articles, exercises, and professional support resources
- **Relaxation Exercises**: Practice guided breathing exercises and other stress-reduction techniques
- **Professional Support**: Connect with mental health professionals when needed

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Chart.js
- Google's Generative AI (Gemini)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── chat/           # AI chat interface
│   ├── mood-tracker/   # Mood tracking feature
│   ├── resources/      # Mental health resources
│   ├── games/          # Relaxation exercises
│   └── layout.tsx      # Main layout component
├── components/         # Reusable components
├── lib/               # Utility functions and API clients
└── public/            # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel

# หรือใช้ GitHub Integration
# 1. Push โค้ดไป GitHub
# 2. เชื่อมต่อกับ Vercel
# 3. Vercel จะ auto-deploy
