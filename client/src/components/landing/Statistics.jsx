import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ from = 0, to, duration = 2, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}{from}{suffix}</span>;
}

function Statistics() {
  const stats = [
    { label: "Companies Researched", to: 15420, suffix: "+" },
    { label: "Investment Reports", to: 42000, suffix: "+" },
    { label: "Confidence Score", to: 95, suffix: "%" },
    { label: "Financial Metrics Analyzed", to: 50, suffix: "+" }
  ];

  return (
    <section className="landing-section" style={{ position: "relative", zIndex: 10, padding: "4rem 2rem" }}>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2rem",
          background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(2,6,23,0.8))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "24px",
          padding: "3rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ 
              fontSize: "3.5rem", 
              fontWeight: 800, 
              color: "#FFFFFF",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #7C3AED, #22D3EE, #2DD4BF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              <Counter to={stat.to} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <div style={{ color: "#94A3B8", fontSize: "1.1rem", fontWeight: 500 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;
