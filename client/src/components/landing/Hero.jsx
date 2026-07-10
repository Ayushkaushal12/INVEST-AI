import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const typingWords = [
  "Research Companies",
  "Read Financial Reports",
  "Understand Business Models",
  "Track Breaking News",
  "Detect Hidden Risks",
  "Find Growth Catalysts",
  "Generate Investment Thesis",
  "Decide Invest or Pass"
];

function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = typingWords[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="home" className="landing-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
        
        {/* Left Side: Typography and Search */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 style={{ 
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            AI That Thinks Like <br />
            <span className="text-gradient">An Investment Analyst.</span>
          </h1>

          <div style={{ fontSize: '1.5rem', color: '#10B981', minHeight: '2.5rem', marginBottom: '1.5rem', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ display: 'inline-block', width: '3px', height: '1.2em', backgroundColor: '#10B981', verticalAlign: 'middle', marginLeft: '2px', boxShadow: '0 0 10px rgba(16,185,129,0.8)' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ color: '#CBD5E1', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px' }}
          >
            Harness the power of AI to perform institutional-grade investment research in seconds. Analyze business models, financial performance, competitive moats, and market news before receiving a clear AI-powered Invest or Pass recommendation.
          </motion.p>

          <SearchBar />
        </motion.div>

        {/* Right Side: Floating Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Central AI Node */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ 
              width: '120px', height: '120px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.2))',
              border: '2px solid rgba(16,185,129,0.5)',
              boxShadow: '0 0 40px rgba(16,185,129,0.4)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2,
              position: 'absolute'
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #34D399)', animation: 'landing-pulse-glow 3s infinite' }} />
          </motion.div>

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="landing-card"
            style={{ position: 'absolute', top: '20px', right: '40px', width: '200px', padding: '1rem', zIndex: 3 }}
          >
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '5px' }}>Confidence Score</div>
            <div style={{ fontSize: '1.5rem', color: '#10B981', fontWeight: 700, textShadow: '0 0 10px rgba(16,185,129,0.5)' }}>96% MATCH</div>
          </motion.div>

          <motion.div
            animate={{ y: [15, -15, 15], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="landing-card"
            style={{ position: 'absolute', bottom: '40px', left: '0px', width: '220px', padding: '1rem', zIndex: 3 }}
          >
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '5px' }}>Financial Trend</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '30px' }}>
              {[40, 60, 45, 80, 65, 90, 100].map((h, i) => (
                <div key={i} style={{ width: '8px', height: `${h}%`, background: '#10B981', borderRadius: '2px', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
              ))}
            </div>
          </motion.div>

          {/* Neural lines/Orbit */}
          <svg style={{ position: 'absolute', width: '400px', height: '400px', zIndex: 1, pointerEvents: 'none' }}>
            <motion.circle 
              cx="200" cy="200" r="140" 
              fill="none" 
              stroke="rgba(16,185,129,0.2)" 
              strokeWidth="2" 
              strokeDasharray="10 10"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              style={{ originX: '50%', originY: '50%' }}
            />
            <motion.circle 
              cx="200" cy="200" r="180" 
              fill="none" 
              stroke="rgba(52,211,153,0.2)" 
              strokeWidth="2" 
              strokeDasharray="20 10 5 10"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              style={{ originX: '50%', originY: '50%' }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
