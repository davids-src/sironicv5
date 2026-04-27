import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle"), description: t("aboutDescription") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      {/* Hero */}
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Cégünkről" : "Our Company"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* Company Intro */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className="card" style={{ maxWidth: 820 }}>
              <span className="accent-line" />
              <h2 className="heading-2">{t("story")}</h2>
              <p className="body-lg" style={{ marginTop: "1rem", fontWeight: 500 }}>
                {t("storyIntro")}
              </p>
              <p className="body-lg" style={{ marginTop: "0.75rem" }}>
                {t("storyContent")}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* Services Overview */}
      <section className="section section-alt">
        <div className="container">
          <SectionReveal>
            <h2 className="heading-1 section-title">{t("servicesTitle")}</h2>
          </SectionReveal>
          <div className={styles.serviceList}>
            {(t.raw("serviceItems") as { title: string; text: string }[]).map((item, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className={styles.serviceItem}>
                  <CheckCircle2 size={22} className={styles.check} />
                  <div>
                    <h3 className="heading-3">{item.title}</h3>
                    <p className="body-md" style={{ marginTop: "0.4rem" }}>{item.text}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* Why us + Values */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <SectionReveal>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2">{t("whyTitle")}</h2>
                <p className="body-lg" style={{ marginTop: "1rem" }}>{t("whyContent")}</p>
                <p className="body-lg" style={{ marginTop: "0.75rem", opacity: 0.8 }}>{t("closingContent")}</p>
                <div style={{ marginTop: "1.5rem" }}>
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-primary">
                    {locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us"} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2">{t("values")}</h2>
                <ul className={styles.valueList}>
                  {(t.raw("valueItems") as string[]).map((v, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className={styles.check} />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <CtaBlock
        title={locale === "hu" ? "Felmérnénk az igényeit?" : "Ready to get started?"}
        subtitle={locale === "hu" ? "Vegyük fel a kapcsolatot – az első egyeztetés ingyenes és kötelezettségmentes." : "Get in touch – the first consultation is free and non-binding."}
        cta1={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: `/${locale}/kapcsolat` }}
        cta2={{ label: locale === "hu" ? "Intelligens igényfelmérés" : "Smart Assessment", href: `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}` }}
      />
    </>
  );
}

