import { AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Identifying Risks...",
  "Evaluating Industry...",
  "Assessing Competition...",
  "Generating Risk Report..."
];

function RiskCard({ research, loading }) {
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

  const risks = research?.risks || [];

  const getSeverityColor = (severity) => {
    const s = (severity || "").toLowerCase();
    if (s === "high") return "#EF4444"; // red
    if (s === "medium") return "#F97316"; // orange
    if (s === "low") return "#10B981"; // green
    return "#64748B";
  };

  const getSeverityWidth = (severity) => {
    const s = (severity || "").toLowerCase();
    if (s === "high") return "100%";
    if (s === "medium") return "60%";
    if (s === "low") return "30%";
    return "0%";
  };

  return (
    <motion.article className="dashboard-card risk-card" layout>
      <div className="card-title-row">
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
            <Loader2 size={20} />
          </motion.div>
        ) : (
          <AlertTriangle size={20} aria-hidden="true" />
        )}
        <h2>Risk Map</h2>
      </div>

      <div className="risk-list" style={{ minHeight: "200px", position: "relative" }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} style={{ marginBottom: '1rem', color: '#10B981' }}>
                 <Loader2 size={32} />
              </motion.div>
              <motion.div
                key={loadingStepIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: '#34D399', fontSize: '0.9rem', fontWeight: 500 }}
              >
                {loadingSteps[loadingStepIdx]}
              </motion.div>
            </motion.div>
          ) : risks.length === 0 ? (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}
            >
              Risk assessment unavailable for this company.
            </motion.div>
          ) : (
            <motion.div
              key="data"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {risks.map((risk, index) => (
                <motion.div
                  className="risk-item"
                  key={`${risk.name}-${index}`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  style={{
                    display: "block",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    cursor: "default"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>{risk.name}</strong>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "2px 8px", 
                      borderRadius: "12px", 
                      background: `${getSeverityColor(risk.severity)}20`, 
                      color: getSeverityColor(risk.severity),
                      border: `1px solid ${getSeverityColor(risk.severity)}40`,
                      fontWeight: 600,
                      textTransform: "uppercase"
                    }}>
                      {risk.severity || "Unknown"}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    {risk.detail}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                     <motion.div 
                       initial={{ width: '0%' }}
                       animate={{ width: getSeverityWidth(risk.severity) }}
                       transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                       style={{ height: '100%', background: getSeverityColor(risk.severity) }}
                     />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default RiskCard;
