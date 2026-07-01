"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

// design.md 7.2 Scroll reveal — once: true, viewport margin: -80px
// transition: duration 0.6, ease [0.22, 1, 0.36, 1]
export default function SectionReveal({ children, className = "", delay = 0, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
