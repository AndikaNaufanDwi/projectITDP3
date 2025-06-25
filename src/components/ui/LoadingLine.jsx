import { motion } from 'framer-motion';

export default function LoadingLineReveal({ width = "200px", color = "#3490dc" }) {
  return (
    <div style={{ overflow: 'hidden', width }}>
      <motion.div
        style={{ height: 4, backgroundColor: color, opacity: 0 }}
        initial={{ x: '-100%', opacity: 0.2 }}
        animate={{
          x: ['-100%', '0%', '100%'],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
}
