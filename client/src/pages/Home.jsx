import React from "react";
import "../styles/Landing.css";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import About from "../components/landing/About";
import Workflow from "../components/landing/Workflow";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div className="landing-page">
      {/* Background Elements */}
      <div className="landing-bg">
        <div className="landing-grid"></div>
      </div>
      
      {/* Page Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Workflow />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
