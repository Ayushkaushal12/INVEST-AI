import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";

function CTA() {
  return (
    <section className="landing-section" style={{ position: "relative", zIndex: 10, padding: "6rem 2rem" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          borderRadius: "32px",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))",
          border: "1px solid rgba(52, 211, 153, 0.15)",
          padding: "5rem 2rem",
          textAlign: "center"
        }}
      >
        {/* Animated Background Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-50%", left: "-20%", width: "100%", height: "200%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
            pointerEvents: "none", zIndex: 0
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute", top: "-50%", right: "-20%", width: "100%", height: "200%",
            background: "radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 50%)",
            pointerEvents: "none", zIndex: 0
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 255, 255, 0.05)", padding: "8px 16px", borderRadius: "100px", border: "1px solid rgba(52, 211, 153, 0.15)", marginBottom: "2rem" }}>
            <Sparkles size={16} color="#10B981" />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#CBD5E1" }}>Experience the Future of Finance</span>
          </div>
          
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, margin: "0 0 1.5rem 0", color: "#FFFFFF", lineHeight: 1.1 }}>
            Ready to Research <br />
            <span className="text-gradient">Smarter?</span>
          </h2>
          
          <p style={{ fontSize: "1.25rem", color: "#94A3B8", maxWidth: "600px", margin: "0 auto 3rem auto", lineHeight: 1.6 }}>
            Join thousands of analysts and investors who have upgraded their workflow with our AI Investment Research Agent.
          </p>

          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px 40px",
                borderRadius: "16px",
                border: "none",
                background: "linear-gradient(135deg, #10B981, #34D399, #6EE7B7)",
                backgroundSize: "200% 200%",
                color: "white",
                fontSize: "1.125rem",
                fontWeight: "700",
                fontFamily: '"Poppins", sans-serif',
                cursor: "pointer",
                animation: "landing-slide-right 5s ease infinite"
              }}
            >
              Analyze Company
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
