import { Banknote, TrendingDown, TrendingUp, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Fetching Financial Statements...",
  "Calculating Financial Ratios...",
  "Building Financial Summary..."
];

function AnimatedValue({ raw, formatted, type }) {
  const [display, setDisplay] = useState("--");
  
  useEffect(() => {
    if (typeof raw !== "number" || isNaN(raw)) {
      setDisplay(formatted || "Not Available");
      return;
    }
    
    // Count up animation
    const controls = animate(0, raw, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (value) => {
        let val = value;
        if (type === "percent") {
          setDisplay(`${val.toFixed(2)}%`);
        } else if (type === "currency") {
          setDisplay(Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(val));
        } else {
          setDisplay(Number(val).toFixed(2));
        }
      },
      onComplete: () => {
        setDisplay(formatted);
      }
    });
    
    return controls.stop;
  }, [raw, formatted, type]);

  return <span>{display}</span>;
}

function FinancialCard({ research, loading }) {
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

  const financials = research?.financials || [];

  return (
    <motion.article className="dashboard-card financial-card" layout style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-title-row">
        <Banknote size={20} aria-hidden="true" />
        <h2>Financial Health</h2>
      </div>

      <div style={{ flex: 1, position: 'relative', overflowY: 'auto', paddingRight: '4px' }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-container"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', paddingTop: '2rem' }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Loader2 size={32} style={{ color: '#94a3b8' }} />
              </motion.div>
              <motion.div
                key={loadingStepIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}
              >
                {loadingSteps[loadingStepIdx]}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="metric-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' }}
            >
              {financials.map((item, idx) => (
                <motion.div 
                  className="metric-row" 
                  key={`${item.label}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: 'var(--surface-color, #f8fafc)', borderRadius: '8px', border: '1px solid var(--border-color, #e2e8f0)', cursor: 'default' }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.label}
                    {item.signal === "negative" ? (
                      <TrendingDown className="metric-icon negative" size={16} style={{ color: '#ef4444' }} />
                    ) : item.signal === "positive" ? (
                      <TrendingUp className={`metric-icon positive`} size={16} style={{ color: '#10b981' }} />
                    ) : null}
                  </span>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--text-color, #0f172a)' }}>
                    <AnimatedValue raw={item.raw} formatted={item.value} type={item.type} />
                  </strong>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default FinancialCard;
