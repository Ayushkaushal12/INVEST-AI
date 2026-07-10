# 📈 AI Investment Research Agent

> **A next-generation financial intelligence platform powered by GenAI, LangChain, and LangGraph.**

<p align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![LangChain](https://img.shields.io/badge/LangChain-FFFFFF?style=for-the-badge&logoColor=black)](https://langchain.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

</p>

<p align="center">
<b>Institutional-grade equity research at the speed of thought.</b>
</p>

<p align="center">
<a href="#demo">🚀 Demo</a> •
<a href="#features">✨ Features</a> •
<a href="#installation">⚙️ Installation</a> •
<a href="#architecture">🏗️ Architecture</a> •
<a href="#future-improvements">🚀 Future Improvements</a>
</p>

---

# 📖 Project Description

The **AI Investment Research Agent** is a full-stack AI-powered financial research platform that automates the complete equity research workflow.

Instead of manually analyzing financial statements, business models, market sentiment, and industry risks, users simply enter a company name and receive a comprehensive AI-generated investment report in seconds.

The platform combines:

- 🧠 Google Gemini AI
- 🔗 LangChain
- ⚡ LangGraph
- 📈 Live Financial APIs
- 📰 Real-Time News Analysis

to generate institutional-quality investment research.

---

# 📸 Screenshots

> *(Add screenshots after deployment.)*

| Home Page | Dashboard |
|-----------|-----------|
| ![Home](assets/home.png) | ![Dashboard](assets/dashboard.png) |

| Financial Health | Investment Report |
|-----------------|-------------------|
| ![Financial](assets/financial.png) | ![Report](assets/report.png) |

---

# 🎯 Problem Statement

Traditional investment research is:

- Time consuming
- Manual
- Difficult for beginners
- Requires reading multiple sources
- Prone to human bias

Retail investors spend hours researching:

- SEC filings
- Financial ratios
- Business models
- Industry news
- Company risks

before making a single investment decision.

---

# 💡 Solution

The AI Investment Research Agent automates the complete research process.

Simply enter a company name and the AI will:

- Fetch real-time financial information
- Analyze the company's business model
- Read the latest news
- Identify business risks
- Evaluate competitive advantages
- Generate an investment score
- Provide an AI-powered investment recommendation

---

# ✨ Features

| Feature | Description |
|----------|-------------|
| 🧠 AI Business Analysis | Understands company business models using Gemini + LangChain |
| 📊 Financial Health | Retrieves live financial metrics |
| 📰 News Pulse | Summarizes recent news with sentiment analysis |
| ⚠️ Risk Map | Detects company-specific investment risks |
| ⭐ Investment Score | Generates a score out of 100 |
| 💰 Final Recommendation | Strong Invest / Invest / Watchlist / Hold / Pass |
| 🎨 Modern UI | Responsive React dashboard with Framer Motion |

---

# ⚙️ Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | React.js, Vite, JavaScript |
| Styling | CSS3, Glassmorphism, Framer Motion |
| Backend | Node.js, Express.js |
| AI | Google Gemini |
| AI Framework | LangChain |
| Workflow | LangGraph |
| Financial Data | Yahoo Finance API |
| Icons | Lucide React |

---

# 🏗️ Architecture

## Folder Structure

```text
investment-research-agent/
│
├── client/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── langgraph/
│   ├── prompts/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔄 System Architecture

```text
                User
                  │
                  ▼
          Landing Page
                  │
                  ▼
         Company Search
                  │
                  ▼
         React Dashboard
                  │
                  ▼
          Express Backend
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
Financial APIs          News APIs
      │                       │
      └───────────┬───────────┘
                  ▼
            LangGraph Engine
                  │
                  ▼
             LangChain
                  │
                  ▼
             Gemini AI
                  │
                  ▼
       Investment Research
                  │
                  ▼
          Dashboard Results
```

---

# 🔄 Research Workflow

```text
User searches Company
          │
          ▼
Validate Company
          │
          ▼
Fetch Financial Data
          │
          ▼
Fetch Latest News
          │
          ▼
Analyze Business Model
          │
          ▼
Analyze Financial Health
          │
          ▼
Generate Risk Analysis
          │
          ▼
Calculate Investment Score
          │
          ▼
Generate Final Recommendation
          │
          ▼
Display Interactive Dashboard
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/investment-research-agent.git
cd investment-research-agent
```

---

## Install Backend

```bash
cd server
npm install
npm run dev
```

---

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

GEMINI_API_KEY=YOUR_API_KEY

TAVILY_API_KEY=YOUR_API_KEY
```

---

# 🧠 Research Engine

## Business Model

AI generates a detailed explanation including:

- Products
- Services
- Revenue Streams
- Competitive Advantage
- Expansion Strategy
- Future Outlook

---

## Financial Health

Displays important financial metrics including:

- Current Price
- Market Cap
- Revenue
- Net Income
- EPS
- ROE
- Gross Margin
- Operating Margin
- Profit Margin
- Free Cash Flow

---

## News Pulse

Analyzes live company news.

- Latest Headlines
- AI Summary
- Market Sentiment
- Positive / Neutral / Negative

---

## Risk Map

Generates company-specific risks such as:

- Business Risks
- Financial Risks
- Regulatory Risks
- Technology Risks
- Competition Risks
- Valuation Risks

---

## Final Recommendation

The AI produces one of:

- 🟢 Strong Invest
- 🟢 Invest
- 🟡 Watchlist
- 🟠 Hold
- 🔴 Pass

along with a detailed justification.

---

# 🔒 Security

- API Keys stored in `.env`
- Backend-only API access
- Input validation
- Error handling
- Rate limiting
- Secure API communication

---

# 🚀 Future Improvements

- [ ] User Authentication
- [ ] Portfolio Tracker
- [ ] SEC Filing Analysis
- [ ] Real-Time Stock Charts
- [ ] AI Portfolio Optimization
- [ ] Historical Backtesting
- [ ] Multi-Agent Investment Debate
- [ ] Cloud Deployment

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository

2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

# 📄 License

Distributed under the **MIT License**.

See `LICENSE` for more information.

---

# 👨‍💻 Developer

**Ayush Kaushal**

🎓 B.Tech Computer Science & Engineering

💻 Full Stack Developer | AI Enthusiast

🤖 LangChain • LangGraph • React • Node.js • Express • C++ • Data Structures & Algorithms

📧 Email: your-email@example.com

🔗 LinkedIn: https://linkedin.com/in/your-profile

💻 GitHub: https://github.com/yourusername

---

<p align="center">

⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using React, Node.js, LangChain, LangGraph & Gemini AI.

</p>
