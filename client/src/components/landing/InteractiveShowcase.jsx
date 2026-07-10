import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, TrendingUp, AlertTriangle } from "lucide-react";

const showcaseCards = [
  {
    id: 1,
    title: "Executive Summary",
    icon: FileText,
    color: "#7C3AED",
    content: "Apple Inc. (AAPL) exhibits a strong competitive moat driven by its ecosystem lock-in, premium brand pricing, and expanding high-margin services segment."
  },
  {
    id: 2,
    title: "Financial Projections",
    icon: TrendingUp,
    color: "#22D3EE",
    content: "Revenue expected to grow at 5% CAGR over the next 3 years. Operating margins remain robust at 30%+, generating significant free cash flow for buybacks."
  },
  {
    id: 3,
    title: "Risk Factors",
    icon: AlertTriangle,
    color: "#2DD4BF",
    content: "Key risks include macroeconomic softness in consumer spending, supply chain concentration in Asia, and increasing regulatory scrutiny on the App Store."
  }
];

function InteractiveShowcase() {
  const [hoveredCard, setHoveredCard] = useState(1);

  return (
    <section className="landing-section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <div style={{ color: '#22D3EE', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(34,211,238,0.4)' }}>
          Interactive Showcase
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: 0 }}>
          Deep <span className="text-gradient">Insights</span> at a Glance.
        </h2>
      </motion.div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        height: "400px",
        width: "100%"
      }}>
        {showcaseCards.map((card) => {
          const Icon = card.icon;
          const isHovered = hoveredCard === card.id;

          return (
            <motion.div
              key={card.id}
              onHoverStart={() => setHoveredCard(card.id)}
              animate={{
                flex: isHovered ? 2 : 1,
                background: isHovered ? "rgba(20, 30, 51, 0.9)" : "rgba(14, 21, 37, 0.6)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: "relative",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
                cursor: "pointer",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${card.color}33` : "none"
              }}
            >
              {/* Background gradient hint */}
              <div style={{
                position: "absolute",
                top: 0, right: 0, width: "150px", height: "150px",
                background: `radial-gradient(circle, ${card.color} 0%, transparent 70%)`,
                opacity: 0.15,
                filter: "blur(20px)"
              }} />

              <motion.div
                animate={{ scale: isHovered ? 1.2 : 1, originX: 0, originY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "1rem" }}
              >
                <Icon size={32} color={card.color} />
              </motion.div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1rem 0", color: "#F8FAFC" }}>
                {card.title}
              </h3>

              <motion.div
                animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ margin: 0, color: "#94A3B8", lineHeight: 1.6 }}>
                  {card.content}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default InteractiveShowcase;
