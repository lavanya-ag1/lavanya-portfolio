import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, x = 0, y = 24, className = "", id, style }) {
  return (
    <motion.div
      id={id}
      style={style}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
