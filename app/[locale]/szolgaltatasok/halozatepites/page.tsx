import { getTranslations } from "next-intl/server";
import { Network, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import FaqAccordion from "@/components/ui/FaqAccordion";
import type { Metadata } from "next";
import styles from "@/components/ui/ServiceSubpage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "servicePages.network" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        keywords: t.has("keywords") ? (t("keywords") as string).split(", ") : undefined,
        alternates: {
            canonical: `https://sironic.eu/${locale}/szolgaltatasok/halozatepites`,
        },
    };
}

export default async function HalozatepitesPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "servicePages.network" });
    const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;
    const servicesHref = `/${locale}/szolgaltatasok`;
    const contactHref = `/${locale}/kapcsolat`;

    const benefits = t.raw("benefits") as Array<{ title: string; text: string }>;
    const whoItems = t.raw("whoItems") as string[];
    const processSteps = t.raw("processSteps") as Array<{ step: string; title: string; text: string }>;
    const whyItems = t.raw("whyItems") as string[];
    const faqItems = t.raw("faqItems") as Array<{ q: string; a: string }>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: locale === "hu" ? "Hálózatépítés és hálózatfejlesztés" : "Network Building and Development",
        provider: { "@type": "Organization", name: "SIRONIC", url: "https://sironic.eu" },
        description: t("metaDescription"),
        areaServed: "HU",
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className={`${styles.hero} bg-grid`}>
                <div className="container">
                    <SectionReveal>
                        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                            <Link href={`/${locale}`}>{locale === "hu" ? "Főoldal" : "Home"}</Link>
                            <span>/</span>
                            <Link href={servicesHref}>{locale === "hu" ? "Szolgáltatások" : "Services"}</Link>
                            <span>/</span>
                            <span>{t("badge")}</span>
                        </nav>
                        <span className="badge"><Network size={13} />{t("badge")}</span>
                        <h1 className={`display-2 ${styles.heroTitle}`}>{t("heroTitle")}</h1>
                        <p className="body-lg">{t("heroSubtitle")}</p>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                            <Link href={contactHref} className="btn btn-primary btn-lg">
                                {t("ctaPrimary")} <ArrowRight size={16} />
                            </Link>
                            <Link href={smartFormHref} className="btn btn-outline btn-lg">
                                {t("ctaSecondary")}
                            </Link>
                        </div>
                    </SectionReveal>
                </div>
                <div className={styles.heroGlow} aria-hidden />
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container">
                    <SectionReveal>
                        <span className="accent-line" />
                        <h2 className="heading-1">{t("introTitle")}</h2>
                        <p className="body-lg" style={{ maxWidth: 680, marginTop: "1rem" }}>{t("introText")}</p>
                    </SectionReveal>
                </div>
            </section>

            {/* Benefits */}
            <section className="section section-alt">
                <div className="container">
                    <SectionReveal>
                        <h2 className="heading-1 section-title">{t("benefitsTitle")}</h2>
                    </SectionReveal>
                    <div className={styles.benefitsGrid} style={{ marginTop: "2.5rem" }}>
                        {benefits.map((b, i) => (
                            <SectionReveal key={i}>
                                <div className={styles.benefitCard}>
                                    <div className="icon-box"><Network size={20} /></div>
                                    <p className={styles.benefitTitle}>{b.title}</p>
                                    <p className={styles.benefitText}>{b.text}</p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who is this for */}
            <section className="section">
                <div className="container">
                    <SectionReveal>
                        <span className="accent-line" />
                        <h2 className="heading-1">{t("whoTitle")}</h2>
                        <p className="body-lg" style={{ marginTop: "1rem", maxWidth: 620 }}>{t("whoText")}</p>
                        <ul className={styles.whoList} style={{ marginTop: "1.5rem" }}>
                            {whoItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </SectionReveal>
                </div>
            </section>

            {/* How it works */}
            <section className="section section-alt">
                <div className="container">
                    <SectionReveal>
                        <h2 className="heading-1 section-title">{t("processTitle")}</h2>
                    </SectionReveal>
                    <div className={styles.processGrid} style={{ marginTop: "2.5rem" }}>
                        {processSteps.map((s, i) => (
                            <SectionReveal key={i}>
                                <div className={styles.processStep}>
                                    <div className={styles.stepNumber}>{s.step}</div>
                                    <p className={styles.stepTitle}>{s.title}</p>
                                    <p className={styles.stepText}>{s.text}</p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why SIRONIC */}
            <section className="section">
                <div className="container">
                    <SectionReveal>
                        <span className="accent-line" />
                        <h2 className="heading-1">{t("whyTitle")}</h2>
                        <ul className={styles.whyList}>
                            {whyItems.map((item, i) => (
                                <li key={i}>
                                    <CheckCircle2 size={18} className={styles.checkIcon} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </SectionReveal>
                </div>
            </section>

            {/* CTA */}
            <CtaBlock
                title={t("ctaTitle")}
                subtitle={t("ctaSubtitle")}
                cta1={{ label: t("ctaPrimary"), href: contactHref }}
                cta2={{ label: t("ctaSecondary"), href: smartFormHref }}
            />

            {/* FAQ */}
            <section className="section">
                <div className="container" style={{ maxWidth: 820 }}>
                    <SectionReveal>
                        <h2 className="heading-1 section-title">{t("faqTitle")}</h2>
                    </SectionReveal>
                    <div style={{ marginTop: "2.5rem" }}>
                        <FaqAccordion items={faqItems} />
                    </div>
                </div>
            </section>
        </>
    );
}
