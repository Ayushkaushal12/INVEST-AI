import { motion } from "framer-motion";

function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: "0 18px 35px rgba(16,185,129,0.18)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      style={{
        background: "#111827",
        border: "1px solid rgba(16,185,129,0.18)",
        borderRadius: "18px",
        padding: "32px",
        cursor: "pointer",
        overflow: "hidden",
        fontFamily: '"Manrope", sans-serif',
      }}
    >
      <motion.div
        whileHover={{
          rotate: 15,
          scale: 1.15,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        style={{
          width: "68px",
          height: "68px",
          borderRadius: "14px",
          background: "rgba(16,185,129,0.12)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#10B981",
          marginBottom: "22px",
          fontSize: "30px",
          boxShadow: "0 0 15px rgba(16,185,129,0.12)",
        }}
      >
        {icon}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          color: "#F9FAFB",
          fontSize: "23px",
          fontWeight: "700",
          marginBottom: "14px",
          letterSpacing: "0.5px",
          fontFamily: '"Manrope", sans-serif',
        }}
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: "#9CA3AF",
          fontSize: "15px",
          lineHeight: "1.8",
          fontWeight: "400",
          fontFamily: '"Roboto", geogia, sans-serif',
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default FeatureCard;