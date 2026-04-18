"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

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
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-[420px] bg-[var(--background)] border border-[var(--border)] shadow-2xl z-50 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden"
        >
          {/* Subtle gradient background effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-5 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="font-semibold text-lg text-[var(--foreground)]">{t.title}</h3>
          <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
            {t.desc}
          </p>
          <div className="flex gap-3 mt-2 font-medium">
            <button
              onClick={handleAccept}
              className="flex-1 bg-[var(--foreground)] text-[var(--background)] px-4 py-2.5 rounded-lg text-sm transition-transform active:scale-95 hover:opacity-90"
            >
              {t.accept}
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2.5 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              {t.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
