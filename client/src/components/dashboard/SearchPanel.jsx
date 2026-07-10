import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function SearchPanel({ companyName, setCompanyName, onAnalyze, loading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onAnalyze(companyName);
  };

  return (
    <motion.form
      className="search-panel"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <label className="search-input-wrap">
        <Search size={20} aria-hidden="true" />
        <input
          type="text"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Company name or ticker"
        />
      </label>

      <button type="submit" disabled={loading}>
        <Sparkles size={18} aria-hidden="true" />
        {loading ? "Researching" : "Analyze"}
      </button>
    </motion.form>
  );
}

export default SearchPanel;
