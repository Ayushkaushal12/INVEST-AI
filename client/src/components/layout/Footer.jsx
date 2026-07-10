import { Code, Briefcase, Mail, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(52, 211, 153, 0.15)",
      background: "rgba(6, 20, 27, 0.8)",
      padding: "4rem 2rem 2rem 2rem",
      color: "#94A3B8"
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 className="landing-brand" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: "#FFFFFF" }}>Invest<span style={{ color: '#10B981' }}>AI</span></h2>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "250px" }}>
              Institutional-grade AI investment research engine. Empowering investors with deep financial insights.
            </p>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "1.25rem", fontSize: "1rem" }}>Product</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><Link to="/dashboard" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>Dashboard</Link></li>
            <li><a href="#features" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>Features</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "1.25rem", fontSize: "1rem" }}>Company</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>About Us</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>Contact</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#10B981"} onMouseOut={e => e.target.style.color = "#94A3B8"}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "1.25rem", fontSize: "1rem" }}>Connect</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#" style={{ color: "inherit", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#10B981"} onMouseOut={e => e.currentTarget.style.color = "#94A3B8"}>
              <Code size={20} />
            </a>
            <a href="#" style={{ color: "inherit", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#10B981"} onMouseOut={e => e.currentTarget.style.color = "#94A3B8"}>
              <Briefcase size={20} />
            </a>
            <a href="#" style={{ color: "inherit", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#10B981"} onMouseOut={e => e.currentTarget.style.color = "#94A3B8"}>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(52, 211, 153, 0.15)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.875rem" }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} InvestAI. All rights reserved.</p>
        <p style={{ margin: 0 }}>Built for modern investors.</p>
      </div>
    </footer>
  );
}

export default Footer;
