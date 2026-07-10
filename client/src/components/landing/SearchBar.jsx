import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SearchBar() {
  const [company, setCompany] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!company.trim()) {
      alert("Please enter a company name.");
      return;
    }

    navigate("/dashboard", {
      state: {
        company,
      },
    });
  };

  return (
    <motion.form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      className={isFocused ? "search-glow-border" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        maxWidth: "600px",
        padding: "8px 8px 8px 24px",
        background: "rgba(14, 21, 37, 0.6)",
        backdropFilter: "blur(24px)",
        border: isFocused ? "1px solid rgba(34, 211, 238, 0.6)" : "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: isFocused ? "0 0 40px rgba(34, 211, 238, 0.2)" : "0 10px 30px rgba(0, 0, 0, 0.5)",
        transition: "all 0.3s ease",
      }}
    >
      <Search size={20} color={isFocused ? "#22D3EE" : "#94A3B8"} style={{ transition: "color 0.3s ease" }} />
      
      <input
        type="text"
        placeholder="Search Apple, Tesla, Nvidia..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "1.1rem",
          fontFamily: '"Inter", sans-serif',
          padding: "12px 0",
        }}
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px 24px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
          color: "white",
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: '"Poppins", sans-serif',
          cursor: "pointer",
        }}
      >
        Analyze
        <motion.div
          animate={{ x: isFocused ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowRight size={18} />
        </motion.div>
      </motion.button>
    </motion.form>
  );
}

export default SearchBar;