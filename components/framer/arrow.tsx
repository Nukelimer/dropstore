'use client'

import { motion } from "framer-motion";

const ArrowIcon = () => {
  return (
      <motion.div
          key={crypto.randomUUID()}
          animate={{ x: [0, 8, 0], y: [0, 0, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
    >
      ➜
    </motion.div>
  );
};

export default ArrowIcon;
