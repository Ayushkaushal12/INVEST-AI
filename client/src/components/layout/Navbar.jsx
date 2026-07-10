import { TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHome = location.pathname === "/";

  if (!isHome) {
    return (
      <nav className="navbar">
        <div className="logo">
          <TrendingUp size={28} />
          <h2>InvestAI</h2>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Dashboard</li>
          <li>About</li>
        </ul>
        <Link to="/dashboard" className="nav-btn">
          Get Started
        </Link>
      </nav>
    );
  }

  return (
    <motion.nav 
      className="landing-nav"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundColor: scrolled ? "rgba(6, 20, 27, 0.85)" : "rgba(6, 20, 27, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(52, 211, 153, 0.15)" : "1px solid transparent",
        padding: scrolled ? "1rem 4rem" : "1.5rem 4rem",
        transition: "all 0.3s ease"
      }}
    >
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1, filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TrendingUp size={28} color="#10B981" />
        </motion.div>
        <h2 className="landing-brand" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Invest<span style={{ color: '#10B981' }}>AI</span></h2>
      </div>

      <ul className="landing-nav-links">
        <li><button onClick={(e) => handleScroll(e, 'home')}>Home</button></li>
        <li><button onClick={(e) => handleScroll(e, 'features')}>Features</button></li>
        <li><button onClick={(e) => handleScroll(e, 'about')}>About</button></li>
      </ul>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 500 }}>
          <motion.span whileHover={{ color: '#FFFFFF', textShadow: "0 0 10px rgba(255,255,255,0.5)" }}>Dashboard</motion.span>
        </Link>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/dashboard">
            <button className="landing-btn-primary">Analyze Now</button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
