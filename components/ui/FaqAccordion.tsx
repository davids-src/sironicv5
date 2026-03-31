"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FaqAccordion.module.css";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.list} role="list">
      {items.map((item, i) => (
        <div key={i} className={styles.item} role="listitem">
          <button
            className={`${styles.question} ${open === i ? styles.active : ""}`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            id={`faq-q-${i}`}
            aria-controls={`faq-a-${i}`}
          >
            <span>{item.q}</span>
            <motion.span
              className={styles.icon}
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={styles.answer}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={styles.answerInner}>{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
