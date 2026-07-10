<div align="center">
  
# 📈 AI Investment Research Agent
**A next-generation financial intelligence platform powered by GenAI, LangChain, and LangGraph.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![LangChain](https://img.shields.io/badge/LangChain-FFFFFF?style=for-the-badge&logo=langchain&logoColor=black)](https://langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Institutional-grade equity research at the speed of thought.*

[View Demo](#demo-placeholder) · [Report Bug](#) · [Request Feature](#)
</div>

<br />

---

## 📖 Project Description

The **AI Investment Research Agent** is a full-stack, AI-driven financial analytics dashboard that completely automates the equity research pipeline. By seamlessly orchestrating real-time market data APIs with advanced Large Language Models via LangChain and LangGraph, the agent generates institutional-grade investment memorandums in seconds.

It dynamically evaluates real-time stock pricing, distills unstructured financial news, maps out complex business models, measures qualitative economic moats, and issues a final, mathematically-backed **Investment Score** and **Recommendation (Strong Invest, Invest, Watchlist, Hold, Pass)**.

<br />

---

## 📸 Screenshots
*(Placeholder for Screenshots)*
`[Insert Home Page Screenshot here]`  
`[Insert Dashboard Layout Screenshot here]`  
`[Insert Financial Health Card Screenshot here]`  

<br />

---

## 🎯 Problem Statement

Traditional investment research is slow, manual, and prone to human bias. Retail investors and independent analysts spend hours digging through SEC filings, tracking Yahoo Finance data, mapping economic moats, and analyzing sentiment from the latest news just to form a baseline thesis on a single equity. 

## 💡 Solution

This platform acts as an autonomous co-pilot. By entering a single company ticker or name, the LangGraph-orchestrated AI workflow instantly collects quantitative financial health metrics, evaluates real-time news sentiment, and uses LangChain to perform deep qualitative reasoning. The result is a beautifully designed, instantly actionable dashboard that saves hours of manual due diligence.

<br />

---

## 🚀 Project Highlights

| Feature | Description |
|---------|-------------|
| **🧠 Deep AI Reasoning** | Leverages Gemini and LangChain to unpack complex business models and competitive moats. |
| **⚡ Real-time Data** | Fetches live market caps, EPS, Margins, and FCF via live financial APIs. |
| **🛡️ Risk Mapping** | Autonomously detects specific, non-generic business risks and ranks their severity. |
| **📰 News Pulse** | Analyzes live headlines to gauge immediate market sentiment and catalysts. |
| **🎨 Premium UI** | Framer Motion animations, glassmorphism, and a deeply optimized React layout. |

<br />

---

## ⚙️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React, JavaScript, Vite, CSS (Glassmorphism) |
| **Backend** | Node.js, Express.js |
| **AI / LLMs** | Google Gemini 1.5 Pro/Flash |
| **AI Orchestration** | LangChain, LangGraph |
| **Financial APIs** | Yahoo Finance (Custom Integrations) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

<br />

---

## 🏗️ Architecture Overview

### Complete Folder Structure
```text
investment-research-agent/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── assets/             # Images and static files
│   │   ├── components/         # Reusable React components
│   │   │   └── dashboard/      # Cards: Business, Financial, News, Risk
│   │   ├── hooks/              # Custom React hooks (useResearch)
│   │   ├── pages/              # Main Route Views (Dashboard.jsx)
│   │   ├── services/           # Axios API calls to Express backend
│   │   ├── styles/             # Modular CSS
│   │   ├── App.jsx             # Root React component
│   │   ├── index.css           # Global tokens & animations
│   │   └── main.jsx            # Vite entry point
│   └── package.json
└── server/                     # Express Backend
    ├── config/                 # Environment & LLM setup (gemini.js)
    ├── controllers/            # Route controllers (researchController.js)
    ├── langgraph/              # Complex workflow definitions
    ├── middleware/             # Error handlers & rate limits
    ├── prompts/                # LangChain System Prompts
    ├── routes/                 # Express Routers
    ├── services/               # Core business logic (researchService.js)
    ├── server.js               # Node.js entry point
    └── package.json
```

<br />

---

## 🔄 How It Works

### Architecture Diagram

```text
    [ User ]
       │
       ▼
[ Landing Page ]
       │
       ▼
 [ Dashboard ] ─────▶ [ Express API ]
                            │
                            ▼
                     [ LangGraph ]
                            │
                      [ LangChain ]
                       /         \
                      /           \
                     ▼             ▼
          [ Financial APIs ]   [ News APIs ]
                     \             /
                      \           /
                       ▼         ▼
                    [ Gemini AI Model ]
                            │
                            ▼
                   [ Research Engine ]
                            │
                            ▼
                    [ JSON Response ]
                            │
                            ▼
                  [ Dashboard Cards ]
```

### Flow Diagram

```text
Company Search
       ↓
Validate Company
       ↓
Fetch Financial Data
       ↓
Fetch News
       ↓
Generate Business Model
       ↓
Generate Financial Health
       ↓
Generate Risk Analysis
       ↓
Generate Investment Score
       ↓
Generate Final Recommendation
       ↓
Display Dashboard
```

<br />

---

## 🛠️ Installation Guide

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Google Gemini API Key

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/investment-research-agent.git
cd investment-research-agent
```

### 2. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Install & Run Backend
```bash
cd server
npm install
npm run dev
```

### 4. Install & Run Frontend
```bash
cd ../client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

<br />

---

## 🧠 Research Engine

### Investment Analysis Flow
The backend uses **LangChain** to orchestrate prompts and format API outputs into strict JSON structures that the frontend easily consumes. **LangGraph** manages the stateful transitions between data fetching, fallback logic, and AI synthesis.

### Business Model Generation
The AI generates a 300-400 word unique report explaining core products, revenue models, expansion strategies, and economic moats. The frontend parser renders this dynamically with bullet points, keyword highlights, and a staggered typing animation.

### Financial Health Generation
The system strips out noise and maps exactly 10 crucial metrics (Current Price, Market Cap, Revenue, Net Income, EPS, ROE, Gross Margin, Operating Margin, Profit Margin, FCF). It automatically handles API outages by gracefully falling back to "Not Available" per metric.

### News Pulse
Live headlines are passed through the LLM to gauge sentiment (Positive, Neutral, Negative) and generate a 1-2 sentence investor takeaway.

### Risk Map & Investment Score
The system algorithmically calculates a score out of 100 based on P/E ratios, momentum, and volume. The AI cross-references this to issue 8-10 highly specific company risks and ultimately maps the score to one of 5 verdicts: `STRONG INVEST`, `INVEST`, `WATCHLIST`, `HOLD`, `PASS`.

<br />

---

## 🛡️ Security Considerations
- **Backend Secrets**: API keys are securely managed via `.env` in the Node environment and never exposed to the client.
- **Input Sanitization**: Express routes validate and trim all company ticker requests before querying upstream financial APIs.
- **Rate Limiting**: Yahoo Finance endpoints are cached where appropriate to prevent IP bans.

<br />

---

## 🚀 Future Improvements
- [ ] Add User Authentication to save previous research.
- [ ] Incorporate SEC EDGAR database for 10-K scraping.
- [ ] Add WebSocket integration for real-time stock ticker updates.
- [ ] Introduce a portfolio backtesting engine based on AI recommendations.

<br />

---

## 🤝 Contribution Guide
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

<br />

<div align="center">
  <b>Built with ❤️ for the future of decentralized finance.</b>
</div>
#   I N V E S T - A I  
 #   I N V E S T - A I  
 