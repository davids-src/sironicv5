"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, SearchCheck } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import TrackedLink from "@/components/ui/TrackedLink";
import styles from "./SolutionPageLayout.module.css";

export interface ProcessStepItem {
  step: string;
  title: string;
  text: string;
}

export interface RelatedCardItem {
  title: string;
  text: string;
  href: string;
}

interface Props {
  locale: string;
  badge: string;
  h1: string;
  intro: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaHref: string;
  diagramComponent: React.ReactNode;
  scopeTitle: string;
  scopeSubtitle: string;
  scopePoints: string[];
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStepItem[];
  bridgeTitle: string;
  bridgeText: string;
  relatedCards: RelatedCardItem[];
}

export default function SolutionPageLayout({
  locale,
  badge,
  h1,
  intro,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryCtaHref,
  secondaryCtaHref,
  diagramComponent,
  scopeTitle,
  scopeSubtitle,
  scopePoints,
  processTitle,
  processSubtitle,
  processSteps,
  bridgeTitle,
  bridgeText,
  relatedCards,
}: Props) {
  return (
    <>
      {/* 1. Breadcrumb & Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <SectionReveal>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{locale === "hu" ? "Főoldal" : "Home"}</Link>
              <span>/</span>
              <Link href={`/${locale}/${locale === "hu" ? "megoldasok" : "solutions"}`}>
                {locale === "hu" ? "Megoldások" : "Solutions"}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--ink)" }}>{badge}</span>
            </nav>

            <span className="badge">
              <ShieldCheck size={13} />
              {badge}
            </span>

            <h1 className={`display-2 ${styles.heroTitle}`}>{h1}</h1>
            <p className={`body-lg ${styles.heroIntro}`}>{intro}</p>

            <div className={styles.heroCtas}>
              <Link href={primaryCtaHref} className="btn btn-primary btn-lg">
                {primaryCtaLabel} <ArrowRight size={18} />
              </Link>
              <Link href={secondaryCtaHref} className="btn btn-outline btn-lg">
                <SearchCheck size={18} />
                {secondaryCtaLabel}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 2. Visual Diagram Section */}
      <section className={styles.diagramSection}>
        <div className="container">
          <SectionReveal>{diagramComponent}</SectionReveal>
        </div>
      </section>

      {/* 3. Scope Section */}
      <section className={styles.scopeSection}>
        <div className="container">
          <SectionReveal>
            <span className="accent-line" />
            <h2 className="heading-1">{scopeTitle}</h2>
            <p className="body-lg" style={{ maxWidth: 700, marginTop: "0.75rem", color: "var(--muted)" }}>
              {scopeSubtitle}
            </p>
          </SectionReveal>

          <div className={styles.scopeGrid}>
            {scopePoints.map((point, idx) => (
              <SectionReveal key={idx} delay={idx * 0.06}>
                <div className={styles.scopeCard}>
                  <CheckCircle2 size={20} className={styles.scopeCheck} />
                  <span>{point}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <SectionReveal>
            <span className="accent-line" />
            <h2 className="heading-1">{processTitle}</h2>
            <p className="body-lg" style={{ maxWidth: 700, marginTop: "0.75rem", color: "var(--muted)" }}>
              {processSubtitle}
            </p>
          </SectionReveal>

          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <div className={styles.processCard}>
                  <div className={styles.processStep}>{step.step}</div>
                  <h3 className={styles.processCardTitle}>{step.title}</h3>
                  <p className={styles.processCardText}>{step.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Existing vs New Bridge Section */}
      <section className={styles.bridgeSection}>
        <div className="container">
          <SectionReveal>
            <div className={styles.bridgeBox}>
              <span className="badge" style={{ marginBottom: "0.75rem" }}>
                ÜZEMELTETÉS & HIPOLÓGIAI HÁTTÉR
              </span>
              <h2 className="heading-1" style={{ color: "#FFF" }}>{bridgeTitle}</h2>
              <p className="body-lg" style={{ color: "var(--silver)", marginTop: "1rem" }}>
                {bridgeText}
              </p>

              <div className={styles.bridgeCtas}>
                <Link href={`/${locale}/szolgaltatasok/rendszeruzemeltetes`} className="btn btn-primary">
                  <Wrench size={16} />
                  {locale === "hu" ? "IT Üzemeltetési Szolgáltatások" : "IT Managed Operations"}
                </Link>
                <Link href={secondaryCtaHref} className="btn btn-outline">
                  <SearchCheck size={16} />
                  {locale === "hu" ? "Díjmentes Rendszer-Audit Kérése" : "Request Free System Audit"}
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 6. Related Services & Solutions */}
      <section className={styles.relatedSection}>
        <div className="container">
          <SectionReveal>
            <h2 className="heading-2">
              {locale === "hu" ? "Kapcsolódó IT Megoldások & Szolgáltatások" : "Related IT Solutions & Services"}
            </h2>
          </SectionReveal>

          <div className={styles.relatedGrid}>
            {relatedCards.map((card, idx) => (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <Link href={card.href} className={styles.relatedCard}>
                  <h3 className={styles.relatedTitle}>{card.title}</h3>
                  <p className={styles.relatedText}>{card.text}</p>
                  <span className={styles.relatedCta}>
                    {locale === "hu" ? "Megtekintés →" : "View Details →"}
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA Block */}
      <CtaBlock
        title={locale === "hu" ? "Készen áll az IT projekt elindítására?" : "Ready to launch your IT project?"}
        subtitle={
          locale === "hu"
            ? "Mérnöki megközelítéssel, transzparens árazással és rögzített határidőkkel vállaljuk cége IT kiépítését vagy korszerűsítését."
            : "Engineering excellence, transparent pricing, and guaranteed delivery timelines for your company's IT deployment."
        }
        cta1={{ label: primaryCtaLabel, href: primaryCtaHref }}
        cta2={{ label: secondaryCtaLabel, href: secondaryCtaHref }}
      />
    </>
  );
}
