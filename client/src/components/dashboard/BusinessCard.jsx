import { Building2, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Analyzing Company...",
  "Understanding Products...",
  "Evaluating Business Strategy...",
  "Generating AI Business Summary...",
];

function FormattedText({ text }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} style={{ color: "var(--text)" }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function BusinessCard({ research, loading }) {
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const business = research?.business;
  const modelText = business?.model || "";

  // Split the text into paragraphs/bullets
  const paragraphs = modelText.split("\n").filter((p) => p.trim() !== "");

  return (
    <motion.article
      className="dashboard-card business-card"
      layout
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div className="card-title-row">
        <Building2 size={20} aria-hidden="true" />
        <h2>Business Model</h2>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem",
                paddingTop: "2rem",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 size={32} style={{ color: "#94a3b8" }} />
              </motion.div>
              <motion.div
                key={loadingStepIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {loadingSteps[loadingStepIdx]}
              </motion.div>
            </motion.div>
          ) : !business ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#94a3b8",
                textAlign: "center",
              }}
            >
              <Info size={32} />
              <p>Business model information is currently unavailable.</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {paragraphs.map((p, idx) => {
                  const isBullet =
                    p.trim().startsWith("-") || p.trim().startsWith("•");
                  const content = isBullet
                    ? p.trim().substring(1).trim()
                    : p.trim();

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      style={{
                        display: isBullet ? "list-item" : "block",
                        marginLeft: isBullet ? "1.5rem" : "0",
                        listStyleType: isBullet ? "disc" : "none",
                        color: "var(--muted)",
                        lineHeight: "1.65",
                      }}
                    >
                      <FormattedText text={content} />
                    </motion.div>
                  );
                })}
              </div>

              {business.moat && (
                <motion.div
                  className="mini-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: paragraphs.length * 0.1 + 0.2 }}
                >
                  <span>Moat</span>
                  <strong>{business.moat}</strong>
                </motion.div>
              )}

              {business.growthDrivers && business.growthDrivers.length > 0 && (
                <motion.div
                  className="tag-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: paragraphs.length * 0.1 + 0.4 }}
                >
                  {business.growthDrivers.map((driver) => (
                    <span key={driver}>{driver}</span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default BusinessCard;
