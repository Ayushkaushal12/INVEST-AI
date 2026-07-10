import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Researching Company...",
  "Collecting Financial Data...",
  "Reading Latest News...",
  "Analyzing Business Model...",
  "Evaluating Risks...",
  "Calculating Investment Score...",
  "Generating AI Recommendation..."
];

export function getDynamicVerdict(score) {
  if (score >= 85) return { label: "STRONG INVEST", color: "#10B981", icon: CheckCircle2 };
  if (score >= 70) return { label: "INVEST", color: "#34D399", icon: CheckCircle2 };
  if (score >= 50) return { label: "WATCHLIST", color: "#FBBF24", icon: AlertCircle };
  if (score >= 35) return { label: "HOLD", color: "#F97316", icon: AlertCircle };
  return { label: "PASS", color: "#EF4444", icon: XCircle };
}

function VerdictCard({ research, loading }) {
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % loadingSteps.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const score = research?.score ?? 0;
  const dynamicVerdict = research ? getDynamicVerdict(score) : { label: "PENDING", color: "#64748B", icon: CheckCircle2 };
  const Icon = dynamicVerdict.icon;

  const reasons = research?.decisionReasoning || [
    "The agent will show its reasoning after analysis.",
    "Each recommendation is scored before it becomes invest or pass.",
  ];

  return (
    <motion.article className="dashboard-card verdict-card" layout>
      <div className="card-title-row">
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
            <Loader2 size={20} />
          </motion.div>
        ) : (
          <Icon size={20} color={dynamicVerdict.color} />
        )}
        <h2>Final Recommendation</h2>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="decision-banner"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", flexDirection: 'column', gap: '8px', padding: '1rem' }}
          >
            <motion.div
              key={loadingStepIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.95rem", fontWeight: 500 }}
            >
              {loadingSteps[loadingStepIdx]}
            </motion.div>
            
            {/* Progress bar animation */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
               <motion.div 
                 initial={{ width: '0%' }}
                 animate={{ width: `${((loadingStepIdx + 1) / loadingSteps.length) * 100}%` }}
                 transition={{ duration: 0.8, ease: "linear" }}
                 style={{ height: '100%', background: '#10B981' }}
               />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="decision-banner"
            style={research ? {
              background: `linear-gradient(135deg, ${dynamicVerdict.color}20, transparent)`,
              border: `1px solid ${dynamicVerdict.color}40`,
              boxShadow: `0 0 20px ${dynamicVerdict.color}20`
            } : {}}
          >
            <span style={research ? { color: dynamicVerdict.color, textShadow: `0 0 10px ${dynamicVerdict.color}50` } : {}}>{dynamicVerdict.label}</span>
            <small>{research?.confidence || "Confidence pending"}</small>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ minHeight: "80px", margin: "1.5rem 0", lineHeight: 1.6 }}>
        {loading ? (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.7 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            Synthesizing data from thousands of sources to generate a final investment thesis...
          </motion.div>
        ) : (
          <motion.div
            initial={research ? { opacity: 0, y: 10 } : false}
            animate={research ? { opacity: 1, y: 0 } : false}
            transition={{ delay: 0.2 }}
          >
            {research?.thesis || "Run a company search to receive the investment thesis."}
          </motion.div>
        )}
      </div>

      <ul className="reason-list">
        {reasons.map((reason, i) => (
          <motion.li 
            key={i}
            initial={(!loading && research) ? { opacity: 0, x: -10 } : false}
            animate={(!loading && research) ? { opacity: 1, x: 0 } : false}
            transition={{ delay: 0.3 + (i * 0.1) }}
            style={{ opacity: loading ? 0.3 : 1 }}
          >
            {reason}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export default VerdictCard;
