import { motion } from "framer-motion";
import { Cpu, Server, Workflow, Bot, Brain } from "lucide-react";
import React from "react";

const techStack = [
  { icon: Cpu, name: "React", desc: "Interactive UI" },
  { icon: Server, name: "Node.js", desc: "Robust Backend" },
  { icon: Workflow, name: "LangChain", desc: "LLM Orchestration" },
  { icon: Brain, name: "LangGraph", desc: "Agent Workflows" },
  { icon: Bot, name: "AI Agents", desc: "Autonomous Research" }
];

function About() {
  return (
    <section id="about" className="landing-section" style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ color: '#10B981', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(16,185,129,0.4)' }}>
            The Engine
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: 0 }}>
            Inside <span className="text-gradient">InvestAI.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", marginBottom: "5rem" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="landing-card"
          >
            <h3 style={{ color: "#F8FAFC", fontSize: "1.5rem", marginBottom: "1rem" }}>What is InvestAI?</h3>
            <p style={{ color: "#94A3B8", lineHeight: 1.6 }}>
              InvestAI is an autonomous financial research agent built for modern investors. It transforms hours of manual due diligence—reading SEC filings, earnings transcripts, and news—into instant, actionable insights. By acting as an always-on institutional analyst, it helps you uncover hidden risks and growth catalysts in seconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="landing-card"
          >
            <h3 style={{ color: "#F8FAFC", fontSize: "1.5rem", marginBottom: "1rem" }}>How It Works</h3>
            <p style={{ color: "#94A3B8", lineHeight: 1.6 }}>
              Upon entering a ticker, a swarm of specialized AI Agents is deployed. They aggregate live market data, parse complex financial statements, and analyze sentiment across thousands of news articles. Finally, an advanced reasoning engine synthesizes this data to generate a definitive "Invest" or "Pass" recommendation backed by transparent logic.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default About;
