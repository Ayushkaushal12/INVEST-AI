import { motion } from "framer-motion";
import { Search, Database, LineChart, Newspaper, Building, ShieldAlert, FileText } from "lucide-react";
import React from "react";

const steps = [
  { title: "User enters company", icon: Search },
  { title: "AI searches data", icon: Database },
  { title: "Financial analysis", icon: LineChart },
  { title: "News analysis", icon: Newspaper },
  { title: "Business evaluation", icon: Building },
  { title: "Risk detection", icon: ShieldAlert },
  { title: "Final investment report", icon: FileText }
];

function Workflow() {
  return (
    <section className="landing-section" style={{ position: "relative", zIndex: 10 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <div style={{ color: '#10B981', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(16,185,129,0.4)' }}>
          How It Works
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: 0 }}>
          The <span className="text-gradient">Engine</span> Behind the Insights.
        </h2>
      </motion.div>

      <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "2rem 0" }}>
        
        {/* Continuous Line */}
        <div style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "50%",
          width: "2px",
          background: "linear-gradient(to bottom, rgba(16,185,129,0.1), rgba(52,211,153,0.5), rgba(16,185,129,0.1))",
          transform: "translateX(-50%)",
          zIndex: 1
        }} />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-end" : "flex-start",
                alignItems: "center",
                width: "50%",
                marginLeft: isLeft ? "0" : "50%",
                paddingRight: isLeft ? "3rem" : "0",
                paddingLeft: isLeft ? "0" : "3rem",
                position: "relative",
                marginBottom: "3rem",
                zIndex: 2
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(52,211,153,0.5)" }}
                style={{
                  position: "absolute",
                  [isLeft ? "right" : "left"]: "-24px",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#0B1F2A",
                  border: "2px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  boxShadow: "0 0 10px rgba(16,185,129,0.2)"
                }}
              >
                <Icon size={20} color="#10B981" />
              </motion.div>

              {/* Card */}
              <div 
                className="landing-card"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  padding: "1.5rem",
                  background: "rgba(17, 45, 56, 0.6)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <h3 style={{ fontSize: "1.1rem", margin: 0, color: "#F8FAFC", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ color: "#10B981", opacity: 0.8, fontSize: "0.9rem", fontWeight: "600" }}>0{index + 1}</span>
                  {step.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Workflow;
