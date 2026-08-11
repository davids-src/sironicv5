"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, ArrowRight, X } from "lucide-react";
import styles from "./ExitIntentAssessmentBar.module.css";

const SESSION_KEY = "sironic_assessment_dismissed";

export default function ExitIntentAssessmentBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("freeAssessment");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Do not show on contact page
    if (pathname.includes("kapcsolat") || pathname.includes("contact")) {
      return;
    }

    // Check session storage
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    let triggered = false;

    const triggerShow = () => {
      if (!triggered && typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY)) {
        triggered = true;
        setVisible(true);
      }
    };

    // 1. Desktop Exit Intent (mouse moving out of viewport top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        triggerShow();
      }
    };

    // 2. Mobile Scroll Trigger (> 55% scroll depth)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && window.scrollY / scrollHeight > 0.55) {
        triggerShow();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  };

  if (!visible) return null;

  const contactHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres`;

  return (
    <div className={styles.barWrapper} role="dialog" aria-label={t("banner.headline")}>
      <div className={styles.barInner}>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeBtn}
          aria-label="Bezárás"
        >
          <X size={16} />
        </button>

        <div className={styles.iconBox}>
          <ShieldCheck size={24} className={styles.shieldIcon} />
        </div>

        <div className={styles.textGroup}>
          <span className={styles.badge}>{t("badge")}</span>
          <h4 className={styles.title}>{t("banner.headline")}</h4>
          <p className={styles.subtitle}>{t("banner.subheadline")}</p>
        </div>

        <div className={styles.actionGroup}>
          <Link
            href={contactHref}
            onClick={handleClose}
            className="btn btn-primary btn-sm"
          >
            {t("banner.cta")} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
