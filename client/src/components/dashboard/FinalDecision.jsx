import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";

const decisionConfig = {
  "STRONG INVEST": { color: "#10b981", icon: ShieldCheck, glow: "rgba(16, 185, 129, 0.3)" },
  "INVEST": { color: "#34d399", icon: CheckCircle2, glow: "rgba(52, 211, 153, 0.3)" },
  "WATCHLIST": { color: "#fbbf24", icon: AlertCircle, glow: "rgba(251, 191, 36, 0.3)" },
  "HOLD": { color: "#f97316", icon: AlertCircle, glow: "rgba(249, 115, 22, 0.3)" },
  "PASS": { color: "#ef4444", icon: XCircle, glow: "rgba(239, 68, 68, 0.3)" },
};

function TypewriterText({ text, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    setDisplayedText("");
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 5);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
}

function FinalDecision({ research, loading, error }) {
  if (loading) return null;

  if (error) {
    return (
      <motion.div
        className="final-decision-error dashboard-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem', color: '#ef4444' }}
      >
        <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Analysis could not be completed.</p>
        <p style={{ margin: '0.5rem 0 0', color: '#94a3b8' }}>Please try again.</p>
      </motion.div>
    );
  }

  if (!research) return null;

  const verdict = research.verdict || "PASS";
  const config = decisionConfig[verdict] || decisionConfig["PASS"];
  const Icon = config.icon;
  const badgeColor = config.color;
  const glow = config.glow;
  
  const confidence = research.confidencePercent || 0;
  const strengths = research.strengths || [];
  const concerns = research.concerns || [];
  const justification = research.justification || "";

  return (
    <motion.section
      className="final-decision-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      style={{
        marginTop: "2rem",
        padding: "3rem",
        borderRadius: "20px",
        background: "rgba(30, 41, 59, 0.6)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${badgeColor}30`,
        boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 30px ${glow}`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Border Glow effect at top */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${badgeColor}, transparent)`
        }}
      />

      <motion.h2 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ fontSize: "1.8rem", marginBottom: "2rem", textAlign: "center", color: "#f8fafc", fontWeight: 700 }}
      >
        Final Investment Decision
      </motion.h2>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 2.5rem",
            fontSize: "1.75rem",
            fontWeight: "800",
            color: "#fff",
            background: `linear-gradient(135deg, ${badgeColor}CC, ${badgeColor}88)`,
            border: `1px solid ${badgeColor}`,
            borderRadius: "50px",
            boxShadow: `0 0 30px ${glow}`,
            marginBottom: "1.5rem"
          }}
        >
          <Icon size={28} />
          {verdict}
        </motion.div>
        
        {/* Animated Confidence Meter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase" }}>
            <span>AI Confidence</span>
            <span style={{ color: badgeColor }}>{confidence}%</span>
          </div>
          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
              style={{ height: "100%", background: badgeColor, boxShadow: `0 0 10px ${badgeColor}` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Strengths & Concerns Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
          style={{ background: "rgba(16, 185, 129, 0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", marginBottom: "1rem", fontSize: "1.1rem" }}>
            <TrendingUp size={18} /> Top 3 Strengths
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#cbd5e1", fontSize: "0.95rem" }}>
            {strengths.map((s, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + (i * 0.1) }} style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" style={{ marginTop: "2px", flexShrink: 0 }} /> {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
          style={{ background: "rgba(239, 68, 68, 0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.2)" }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", marginBottom: "1rem", fontSize: "1.1rem" }}>
            <AlertTriangle size={18} /> Top 3 Concerns
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#cbd5e1", fontSize: "0.95rem" }}>
            {concerns.map((c, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + (i * 0.1) }} style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <XCircle size={16} color="#ef4444" style={{ marginTop: "2px", flexShrink: 0 }} /> {c}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Detailed AI Justification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          background: "rgba(0,0,0,0.2)",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.05)",
          position: "relative"
        }}
      >
        <h3 style={{ color: "#f8fafc", marginBottom: "1rem", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Detailed AI Justification
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: "8px", height: "8px", background: badgeColor, borderRadius: "50%" }}
          />
        </h3>
        
        <div style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem" }}>
          {/* We simulate typing effect to give the AI generation feel */}
          <TypewriterText text={justification} delay={1.8} />
        </div>
      </motion.div>
    </motion.section>
  );
}

export default FinalDecision;
