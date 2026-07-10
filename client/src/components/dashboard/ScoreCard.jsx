import { Gauge, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { motion, animate } from "framer-motion";
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

function ScoreCard({ research, loading }) {
  const finalScore = research?.score ?? 0;
  
  const [displayScore, setDisplayScore] = useState(0);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setDisplayScore(0);
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % loadingSteps.length);
      }, 800);
    } else {
      if (finalScore > 0) {
        const controls = animate(0, finalScore, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (value) => setDisplayScore(Math.round(value))
        });
        return controls.stop;
      } else {
        setDisplayScore(0);
      }
    }
    return () => clearInterval(interval);
  }, [loading, finalScore]);

  const verdictLabel = research?.verdict || "WAITING";
  let dynamicVerdict = { label: "WAITING", color: "#64748B", icon: ShieldX };
  
  if (!loading && research) {
    if (finalScore >= 85) dynamicVerdict = { label: "STRONG INVEST", color: "#10B981", icon: ShieldCheck };
    else if (finalScore >= 70) dynamicVerdict = { label: "INVEST", color: "#34D399", icon: ShieldCheck };
    else if (finalScore >= 50) dynamicVerdict = { label: "WATCHLIST", color: "#FBBF24", icon: Gauge };
    else if (finalScore >= 35) dynamicVerdict = { label: "HOLD", color: "#F97316", icon: Gauge };
    else dynamicVerdict = { label: "PASS", color: "#EF4444", icon: ShieldX };
  }
  
  const Icon = dynamicVerdict.icon;
  const ringStyle = {
    "--score": `${displayScore * 3.6}deg`,
  };

  return (
    <motion.article className="dashboard-card score-card" layout>
      <div className="card-title-row">
        <Gauge size={20} aria-hidden="true" />
        <h2>Investment Score</h2>
      </div>

      <div className="score-circle" style={ringStyle}>
        <span>
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Loader2 size={32} />
            </motion.div>
          ) : (
            displayScore || "--"
          )}
        </span>
      </div>

      <div 
        className="verdict-pill" 
        style={!loading && research ? { background: `${dynamicVerdict.color}20`, color: dynamicVerdict.color, border: `1px solid ${dynamicVerdict.color}40` } : {}}
      >
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
            <Loader2 size={18} />
          </motion.div>
        ) : (
          <Icon size={18} />
        )}
        {loading ? "ANALYZING" : (research ? dynamicVerdict.label : verdictLabel)}
      </div>

      <div className="muted-text" style={{ minHeight: "2.5rem", marginTop: "1rem", textAlign: "center" }}>
        {loading ? (
          <motion.div
            key={loadingStepIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {loadingSteps[loadingStepIdx]}
          </motion.div>
        ) : (
          research?.dataQuality || "Score appears after the agent completes the research run."
        )}
      </div>
    </motion.article>
  );
}

export default ScoreCard;
