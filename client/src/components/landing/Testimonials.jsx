import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Portfolio Manager, Apex Capital",
    content: "InvestAI has completely transformed our due diligence process. We now screen 10x more companies in half the time.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Independent Investor",
    content: "The moat detection algorithm is uncannily accurate. It found risks in a seemingly perfect stock that saved me from a 30% drawdown.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Research, Quantify",
    content: "Institutional-grade insights used to require a team of analysts. Now I get them in seconds. An absolute game-changer.",
    rating: 5
  },
  {
    name: "Michael Chang",
    role: "Hedge Fund Analyst",
    content: "The financial projections and risk factor identification are incredibly robust. It's like having a senior analyst on call 24/7.",
    rating: 5
  }
];

function Testimonials() {
  return (
    <section className="landing-section" style={{ overflow: "hidden" }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ color: '#F59E0B', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Wall Street Approved
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: 0 }}>
          Trusted by <span className="text-gradient">Smart Money.</span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div style={{ position: "relative", width: "100%", padding: "2rem 0" }}>
        <div style={{ display: "flex", overflow: "hidden" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ display: "flex", gap: "2rem", width: "fit-content" }}
          >
            {/* Duplicate array for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div 
                key={i} 
                className="landing-card"
                style={{
                  width: "400px",
                  flexShrink: 0,
                  background: "rgba(14, 21, 37, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                  ))}
                </div>
                <p style={{ color: "#F8FAFC", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2rem", fontStyle: "italic" }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #22D3EE)" }} />
                  <div>
                    <h4 style={{ margin: 0, color: "#FFFFFF", fontSize: "1rem" }}>{testimonial.name}</h4>
                    <span style={{ color: "#64748B", fontSize: "0.875rem" }}>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient fades for edges */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "100px", background: "linear-gradient(to right, #070B14, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "100px", background: "linear-gradient(to left, #070B14, transparent)", zIndex: 2 }} />
      </div>
    </section>
  );
}

export default Testimonials;
