import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import FreeAssessmentSection from "@/components/sections/FreeAssessmentSection";
import CtaBlock from "@/components/ui/CtaBlock";
import FaqAccordion from "@/components/ui/FaqAccordion";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "freeAssessmentLanding" });

  const keywordsString = t("keywords");
  const keywordsList = keywordsString ? keywordsString.split(", ") : undefined;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: keywordsList,
    alternates: {
      canonical: `https://sironic.eu/${locale}/ingyenes-felmeres`,
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/ingyenes-felmeres`,
      siteName: "SIRONIC",
      locale: locale === "hu" ? "hu_HU" : "en_US",
      type: "website",
    },
  };
}

export default async function FreeAssessmentLandingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "freeAssessmentLanding" });
  const tFaq = await getTranslations({ locale, namespace: "servicePages.itOps" });

  const contactHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres-aloldal`;
  const processSteps = t.raw("steps") as Array<{ step: string; text: string }>;
  const faqItems = tFaq.raw("faqItems") as Array<{ q: string; a: string }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "hu" ? "Ingyenes Informatikai Állapotfelmérés" : "Free IT System Assessment",
    provider: {
      "@type": "Organization",
      name: "SIRONIC",
      url: "https://sironic.eu",
    },
    description: t("metaDescription"),
    areaServed: ["HU", "Budapest", "Pest megye", "Székesfehérvár", "Fejér megye", "Győr", "Debrecen"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HUF",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script
        id="felmeres-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className={`${styles.hero} bg-grid`}>
        <div className="container">
          <SectionReveal>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{locale === "hu" ? "Főoldal" : "Home"}</Link>
              <span>/</span>
              <span>{t("badge")}</span>
            </nav>

            <span className="badge">
              <ShieldCheck size={13} />
              {t("badge")}
            </span>

            <h1 className={`display-2 ${styles.heroTitle}`}>{t("heroTitle")}</h1>
            <p className="body-lg" style={{ maxWidth: 780 }}>{t("heroSubtitle")}</p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href={contactHref} className="btn btn-primary btn-lg">
                {locale === "hu" ? "Kérem az ingyenes felmérést" : "Request Free Assessment"} <ArrowRight size={18} />
              </Link>
            </div>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* Primary Free Assessment Hero Section Component */}
      <FreeAssessmentSection locale={locale} variant="full" />

      {/* Process Explanation Section (Hogyan zajlik ez pontosan?) */}
      <section className="section section-alt">
        <div className="container">
          <SectionReveal>
            <span className="accent-line" />
            <h2 className="heading-1">{t("processTitle")}</h2>
            <p className="body-lg" style={{ maxWidth: 700, marginTop: "0.75rem" }}>
              {t("processSubtitle")}
            </p>
          </SectionReveal>

          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <div className={styles.processCard}>
                  <span className={styles.stepBadge}>{step.step}</span>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <CtaBlock
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        cta1={{ label: locale === "hu" ? "Kérem az ingyenes felmérést" : "Request Free Assessment", href: contactHref }}
      />

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionReveal>
            <h2 className="heading-1 section-title">
              {locale === "hu" ? "Gyakran Ismételt Kérdések" : "Frequently Asked Questions"}
            </h2>
          </SectionReveal>
          <div style={{ marginTop: "2.5rem" }}>
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
