"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("sironic_cookie_consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500); // Delay appearance for 1.5 seconds
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("sironic_cookie_consent", "accepted");
    setIsVisible(false);
    // Reload to apply Google Analytics if we conditionally load it
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("sironic_cookie_consent", "declined");
    setIsVisible(false);
  };

  const texts = {
    hu: {
      title: "Sütiket használunk a jobb élményért 🍪",
      desc: "Oldalunk Google Analytics sütiket (cookies) használ a látogatottsági statisztikák mérésére. Ezzel segíted a munkánkat, hogy még jobb szolgáltatást nyújthassunk. A te döntésed, hogy engedélyezed-e.",
      accept: "Elfogadom",
      decline: "Csak a szükségesek",
    },
    en: {
      title: "We use cookies for a better experience 🍪",
      desc: "Our website uses Google Analytics cookies to track visitor statistics. This helps us provide a better service. It is your choice to allow them.",
      accept: "Accept",
      decline: "Essential only",
    },
  };

  const t = locale === "en" ? texts.en : texts.hu;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={styles.overlay}
        >
          {/* Subtle gradient background effect */}
          <div className={styles.glow} />
          
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.desc}>
            {t.desc} <br /><a href="/SIRONIC_Adatkezelesi_Tajekoztato.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--text)" }}>{locale === "en" ? "Privacy Policy" : "Adatkezelési Tájékoztató"}</a>
          </p>
          <div className={styles.buttons}>
            <button onClick={handleAccept} className={styles.btnAccept}>
              {t.accept}
            </button>
            <button onClick={handleDecline} className={styles.btnDecline}>
              {t.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
