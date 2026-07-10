import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Clock3 } from "lucide-react";

import SearchPanel from "../components/dashboard/SearchPanel";
import ScoreCard from "../components/dashboard/ScoreCard";
import BusinessCard from "../components/dashboard/BusinessCard";
import FinancialCard from "../components/dashboard/FinancialCard";
import NewsCard from "../components/dashboard/NewsCard";
import RiskCard from "../components/dashboard/RiskCard";
import VerdictCard from "../components/dashboard/VerdictCard";
import FinalDecision from "../components/dashboard/FinalDecision";
import InvalidCompanyPopup from "../components/dashboard/InvalidCompanyPopup";
// Removed global Loading component as per requirements
import { useResearch } from "../hooks/useResearch";

function Dashboard() {
  const location = useLocation();
  const initialCompany = location.state?.company || "";
  const [companyName, setCompanyName] = useState(initialCompany);
  const { research, loading, error, analyze, invalidCompany, clearInvalidCompany } = useResearch();

  useEffect(() => {
    if (initialCompany) {
      analyze(initialCompany);
    }
  }, [analyze, initialCompany]);

  return (
    <div className="dashboard">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">AI Investment Research Agent</span>
            <h1>{research?.company || "Research a company"}</h1>
            <p>
              {research?.summary ||
                "Enter a company and the agent will form an invest or pass decision with evidence."}
            </p>
          </motion.div>

          <div className="run-meta">
            <Clock3 size={17} />
            {research?.generatedAt
              ? new Date(research.generatedAt).toLocaleString()
              : "No run yet"}
          </div>
        </header>

        <SearchPanel
          companyName={companyName}
          setCompanyName={setCompanyName}
          onAnalyze={analyze}
          loading={loading}
        />

        <AnimatePresence>
          {error && (
            <motion.div
              className="error-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            className="dashboard-grid"
            key={research?.generatedAt || "empty"}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {[
              <ScoreCard research={research} loading={loading} />,
              <VerdictCard research={research} loading={loading} />,
              <BusinessCard research={research} loading={loading} />,
              <FinancialCard research={research} loading={loading} />,
              <NewsCard research={research} loading={loading} />,
              <RiskCard research={research} loading={loading} />,
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 26, rotateX: -8 },
                  show: { opacity: 1, y: 0, rotateX: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {card}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <FinalDecision research={research} loading={loading} error={error} />
      </div>

      <InvalidCompanyPopup 
        isOpen={invalidCompany} 
        onClose={clearInvalidCompany} 
      />
    </div>
  );
}

export default Dashboard;
