import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

function InvalidCompanyPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              padding: "2.5rem",
              maxWidth: "450px",
              width: "90%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: "1px solid #334155",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: "50%" }}>
                <AlertCircle size={40} color="#ef4444" />
              </div>
            </div>
            
            <h2 style={{ fontSize: "1.5rem", color: "#f8fafc", marginBottom: "1rem" }}>
              Company Not Found
            </h2>
            
            <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: "2rem" }}>
              The company you entered could not be verified using available public financial data.
              <br /><br />
              For your protection, no investment recommendation can be generated.
            </p>

            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>Recommendation Badge:</span>
                <strong style={{ color: "#ef4444", fontSize: "1.1rem" }}>🔴 DO NOT INVEST</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>Reason:</span>
                <span style={{ color: "#f8fafc", fontSize: "0.95rem" }}>Unknown or unverifiable company.</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>Risk Level:</span>
                <span style={{ color: "#ef4444", fontSize: "0.95rem", fontWeight: "bold" }}>Very High</span>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  background: "transparent",
                  color: "#cbd5e1",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#334155"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                Close
              </button>
              
              <button
                onClick={onClose}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#3b82f6",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#2563eb"}
                onMouseOut={(e) => e.currentTarget.style.background = "#3b82f6"}
              >
                Search Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InvalidCompanyPopup;
