# ResumeAI Pro

A production-ready AI-powered Resume Analyzer SaaS built with React + Vite + Tailwind CSS.

## Features

- **Authentication** — Sign up / Login with localStorage, protected routes
- **ATS Resume Checker** — Check ATS compatibility score
- **Resume Analyzer** — Deep resume content & structure analysis
- **JD Match** — Resume vs Job Description comparison
- **Skill Gap Analysis** — Identify missing skills for target roles
- **Resume Improvements** — AI-powered improvement suggestions
- **Score Checker** — Overall resume quality score
- **About Page** — Creator info with professional layout

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router v6
- Groq API (llama-3.3-70b-versatile)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Groq API

Add your key to `.env`:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx       # Main layout wrapper
│   │   ├── ProtectedRoute.jsx  # Auth guard
│   │   └── Sidebar.jsx         # Sidebar navigation
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── InputTabs.jsx        # Upload/Paste toggle
│       ├── LoadingState.jsx     # Analysis loading screen
│       ├── MetricBar.jsx        # Animated score bar
│       ├── PageHeader.jsx
│       ├── ResultsDashboard.jsx # Full analysis results
│       ├── ScoreRing.jsx        # Animated SVG ring
│       ├── ToolPage.jsx         # Shared tool page wrapper
│       └── UploadArea.jsx       # Drag-and-drop PDF upload
├── hooks/
│   ├── useAuth.jsx              # Auth context
│   └── useAnalysis.js           # Analysis stats
├── pages/
│   ├── About.jsx
│   ├── AtsChecker.jsx
│   ├── Dashboard.jsx
│   ├── Improvements.jsx
│   ├── JdMatch.jsx
│   ├── Login.jsx
│   ├── ResumeAnalyzer.jsx
│   ├── ScoreChecker.jsx
│   ├── SkillGap.jsx
│   └── Signup.jsx
├── utils/
│   ├── api.js                   # AI API calls
│   ├── constants.js             # Tool definitions, steps
│   └── helpers.js               # Utility functions
├── App.jsx
├── main.jsx
└── index.css
```

## Build for Production

```bash
npm run build
# Output is in /dist
```

## Created by

**Mahesh P** · maheshp2487@gmail.com
