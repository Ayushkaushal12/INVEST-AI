import { motion } from "framer-motion";
import { 
  Building2, 
  LineChart, 
  ShieldAlert, 
  Newspaper, 
  Zap, 
  BrainCircuit 
} from "lucide-react";
import React from "react";

const featureData = [
  {
    icon: Building2,
    title: "Business Model Intelligence",
    description: "AI-driven analysis of revenue streams, unit economics, and operational efficiency to understand exactly how a company makes money."
  },
  {
    icon: LineChart,
    title: "Financial Analysis",
    description: "Deep dive into income statements, balance sheets, and cash flows. We crunch the numbers so you can focus on the insights."
  },
  {
    icon: ShieldAlert,
    title: "Competitive Moat Detection",
    description: "Identify durable competitive advantages, network effects, and switching costs that protect long-term profitability."
  },
  {
    icon: Newspaper,
    title: "Market News Intelligence",
    description: "Real-time sentiment analysis of breaking news, earnings transcripts, and SEC filings to detect market moving catalysts."
  },
  {
    icon: Zap,
    title: "Risk Analysis",
    description: "Proactive detection of red flags, regulatory threats, debt burdens, and macroeconomic vulnerabilities before they become obvious."
  },
  {
    icon: BrainCircuit,
    title: "AI Recommendation Engine",
    description: "Synthesize thousands of data points into a clear, institutional-grade 'Invest' or 'Pass' recommendation with transparent reasoning."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="landing-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer'
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.1))',
        border: '1px solid rgba(16,185,129,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <motion.div
          whileHover={{ rotate: 360, filter: "drop-shadow(0 0 8px rgba(52,211,153,0.8))" }}
          transition={{ duration: 0.6 }}
        >
          <Icon size={28} color="#10B981" />
        </motion.div>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: '#F8FAFC' }}>
        {feature.title}
      </h3>
      
      <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
        {feature.description}
      </p>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="landing-section">
      {/* Title section removed */}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {featureData.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </motion.div>
    </section>
  );
}

export default Features;