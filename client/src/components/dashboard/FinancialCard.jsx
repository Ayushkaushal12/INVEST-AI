import { Banknote, TrendingDown, TrendingUp, Loader2, Info, DollarSign, PieChart, Activity, Building, MapPin, Tag } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

function getIconForMetric(label) {
  const L = label.toLowerCase();
  if (L.includes("price")) return <Tag size={16} />;
  if (L.includes("cap")) return <PieChart size={16} />;
  if (L.includes("revenue")) return <DollarSign size={16} />;
  if (L.includes("income") || L.includes("equity") || L.includes("margin") || L.includes("cash")) return <Activity size={16} />;
  if (L.includes("sector") || L.includes("industry")) return <Building size={16} />;
  if (L.includes("country") || L.includes("exchange")) return <MapPin size={16} />;
  return <Banknote size={16} />;
}

const loadingSteps = [
  "Fetching Market Data...",
  "Reading Financial Statements...",
  "Preparing Financial Snapshot..."
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
              className="metric-list"
              style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '1rem' }}
            >
              {financials.map((item, idx) => {
                const MetricIcon = getIconForMetric(item.label);
                return (
                  <motion.div 
                    className="metric-row-clean" 
                    key={`${item.label}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent: 'space-between',
                      alignItems: 'center', 
                      padding: '14px 4px', 
                      borderBottom: idx === financials.length - 1 ? 'none' : '1px solid var(--line)',
                      background: 'transparent'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--muted)', display: 'flex' }}>{MetricIcon}</span>
                      {item.label}
                    </span>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', color: '#FFFFFF' }}>
                      <AnimatedValue raw={item.raw} formatted={item.value} type={item.type} />
                      {item.signal === "negative" ? (
                        <TrendingDown size={14} style={{ color: '#ef4444' }} />
                      ) : item.signal === "positive" ? (
                        <TrendingUp size={14} style={{ color: '#10b981' }} />
                      ) : null}
                    </strong>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default FinancialCard;
