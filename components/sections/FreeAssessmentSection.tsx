"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Award, Clock } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import styles from "./FreeAssessmentSection.module.css";

type Props = {
  locale: string;
  variant?: "full" | "compact" | "nis2";
};

export default function FreeAssessmentSection({ locale, variant = "full" }: Props) {
  const t = useTranslations("freeAssessment");

  const contactHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres`;

  if (variant === "compact") {
    return (
      <section className={styles.compactSection} aria-label={t("compact.headline")}>
        <div className="container">
          <SectionReveal>
            <div className={styles.compactCard}>
              <div className={styles.compactGlow} aria-hidden />
              <div className={styles.compactContent}>
                <span className={styles.eyebrow}>
                  <ShieldCheck size={14} />
                  {t("badge")}
                </span>
                <h3 className={styles.compactHeadline}>{t("compact.headline")}</h3>
                <p className={styles.compactSubheadline}>{t("compact.subheadline")}</p>
                <div className={styles.compactAction}>
                  <Link href={contactHref} className="btn btn-primary">
                    {t("compact.cta")} <ArrowRight size={16} />
                  </Link>
                  <span className={styles.microcopy}>{t("compact.microcopy")}</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    );
  }

  if (variant === "nis2") {
    return (
      <section className={styles.nis2Section} aria-label={t("nis2.headline")}>
        <div className="container">
          <SectionReveal>
            <div className={styles.nis2Card}>
              <div className={styles.nis2BadgeRow}>
                <span className={styles.eyebrow}>
                  <ShieldCheck size={14} />
                  NIS2 & IT Audit
                </span>
              </div>
              <h3 className={styles.nis2Headline}>{t("nis2.headline")}</h3>
              <p className={styles.nis2Subheadline}>{t("nis2.subheadline")}</p>
              <div className={styles.nis2Action}>
                <Link href={contactHref} className="btn btn-primary">
                  {t("nis2.cta")} <ArrowRight size={16} />
                </Link>
                <span className={styles.microcopy}>{t("nis2.microcopy")}</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    );
  }

  // Default: Full hero-adjacent variant
  const bullets = t.raw("full.bullets") as string[];

  return (
    <section id="ingyenes-felmeres" className={styles.wrapper} aria-labelledby="free-assessment-title">
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      <div className="container">
        <div className={styles.grid}>
          {/* Main Content Column */}
          <SectionReveal className={styles.leftCol}>
            <div className={styles.headerBox}>
              <span className={styles.eyebrow}>
                <ShieldCheck size={15} />
                {t("badge")}
              </span>

              <h2 id="free-assessment-title" className={styles.headline}>
                {t("full.headline")}
              </h2>

              <p className={styles.subheadline}>
                {t("full.subheadline")}
              </p>
            </div>

            {/* Bullets List */}
            <ul className={styles.bulletList}>
              {bullets.map((bullet, idx) => (
                <li key={idx} className={styles.bulletItem}>
                  <span className={styles.checkIconWrapper}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                  </span>
                  <span className={styles.bulletText}>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Primary Action Box */}
            <div className={styles.ctaBox}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link href={contactHref} className="btn btn-primary btn-lg">
                  {t("full.ctaPrimary")} <ArrowRight size={18} />
                </Link>
                <Link href={`/${locale}/ingyenes-felmeres`} className="btn btn-outline">
                  {t("full.howItWorksLink")}
                </Link>
              </div>
              <p className={styles.microcopy}>
                <Lock size={13} style={{ display: "inline", marginRight: "4px" }} />
                {t("full.microcopy")}
              </p>
            </div>

            {/* Trust Line */}
            <div className={styles.trustRow}>
              <Award size={16} className={styles.trustIcon} />
              <span>{t("full.trustLine")}</span>
            </div>
          </SectionReveal>

          {/* Visual Showcase Card */}
          <SectionReveal delay={0.15} className={styles.rightCol}>
            <div className={styles.showcaseCard}>
              <div className={styles.showcaseHeader}>
                <div className={styles.windowDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <span className={styles.windowTitle}>SIRONIC IT Audit & Security Check</span>
              </div>

              <div className={styles.showcaseBody}>
                <div className={styles.auditMetric} style={{ justifyContent: "center" }}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>0 Ft</span>
                    <span className={styles.metricLabel}>Díjmentes & kötelezettségmentes</span>
                  </div>
                </div>

                <div className={styles.auditChecklist}>
                  <div className={styles.checkRow}>
                    <span className={styles.statusDotActive} />
                    <span>Infrastruktúra & Hardver leltár</span>
                  </div>
                  <div className={styles.checkRow}>
                    <span className={styles.statusDotActive} />
                    <span>Szoftver-licencek & Biztonsági mentések</span>
                  </div>
                  <div className={styles.checkRow}>
                    <span className={styles.statusDotActive} />
                    <span>Hálózati sérülékenységi felmérés</span>
                  </div>
                  <div className={styles.checkRow}>
                    <span className={styles.statusDotActive} />
                    <span>NIS2 kiberbiztonsági hiányelemzés</span>
                  </div>
                </div>

                <div className={styles.cardFooterBanner}>
                  <span>💡 Írásos összefoglaló és árazott javaslat egy héten belül.</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
