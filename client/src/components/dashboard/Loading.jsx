import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <motion.div
      className="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoaderCircle size={70} className="spinner" />

      <h2>Researching Company...</h2>

      <p>Reading market signals, headlines, risks, and catalysts</p>
    </motion.div>
  );
}

export default Loading;
