import { Newspaper, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Collecting Latest News...",
  "Reading Headlines...",
  "Generating AI Summaries...",
  "Analyzing Market Sentiment..."
];

function NewsCard({ research, loading }) {
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

  let news = research?.news || [];
  
  if (!loading && news.length > 0) {
    news = [...news].sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0;
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
  }

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return "#64748B";
    const s = sentiment.toLowerCase();
    if (s.includes("positive")) return "#10B981";
    if (s.includes("negative")) return "#EF4444";
    return "#FBBF24";
  };

  return (
    <motion.article className="dashboard-card news-card" layout>
      <div className="card-title-row">
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
            <Loader2 size={20} />
          </motion.div>
        ) : (
          <Newspaper size={20} aria-hidden="true" />
        )}
        <h2>News Pulse</h2>
      </div>

      <div className="news-list" style={{ minHeight: "200px", position: "relative" }}>
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
          ) : news.length === 0 ? (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}
            >
              No recent news found for this company.
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
                  transition: { staggerChildren: 0.15 }
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {news.map((item, index) => (
                <motion.a
                  className="news-item"
                  href={item.link || undefined}
                  target={item.link ? "_blank" : undefined}
                  rel={item.link ? "noreferrer" : undefined}
                  key={`${item.title}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  style={{
                    display: "block",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {item.source || "Source"}
                    </span>
                    {item.publishedAt && (
                      <span style={{ fontSize: "0.75rem", color: "#64748B" }}>
                        {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  
                  <strong style={{ display: "block", fontSize: "0.95rem", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                    {item.title}
                  </strong>
                  
                  <p style={{ fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    {item.takeaway}
                  </p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "2px 8px", 
                      borderRadius: "12px", 
                      background: `${getSentimentColor(item.sentiment)}20`, 
                      color: getSentimentColor(item.sentiment),
                      border: `1px solid ${getSentimentColor(item.sentiment)}40`
                    }}>
                      {item.sentiment || "Neutral"}
                    </span>
                    {item.link && <ArrowRight size={14} color="#64748B" />}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default NewsCard;
