import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { Server, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import FreeAssessmentSection from "@/components/sections/FreeAssessmentSection";
import CtaBlock from "@/components/ui/CtaBlock";
import FaqAccordion from "@/components/ui/FaqAccordion";
import SectionTracker from "@/components/ui/SectionTracker";
import TrackedLink from "@/components/ui/TrackedLink";
import IdovonalHaromHonap from "@/components/graphics/IdovonalHaromHonap";
import KopoalkatreszPolc from "@/components/graphics/KopoalkatreszPolc";
import type { Metadata } from "next";
import styles from "@/components/ui/ServiceSubpage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "servicePages.itOps" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        keywords: t.has("keywords") ? (t("keywords") as string).split(", ") : undefined,
        alternates: {
            canonical: `https://sironic.eu/${locale}/szolgaltatasok/rendszeruzemeltetes`,
        },
    };
}

export default async function RendszeruzemeltetesPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "servicePages.itOps" });
    const freeAssessmentHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres`;
    const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;
    const servicesHref = `/${locale}/szolgaltatasok`;
    const contactHref = `/${locale}/kapcsolat`;

    const benefits = t.raw("benefits") as Array<{ title: string; text: string }>;
    const whoItems = t.raw("whoItems") as string[];
    const processSteps = t.raw("processSteps") as Array<{ step: string; title: string; text: string }>;
    const whyItems = t.raw("whyItems") as string[];
    const faqItems = t.raw("faqItems") as Array<{ q: string; a: string; id?: string }>;
    const processLead = t("processLead");
    const inventoryPanel = t.raw("inventoryPanel") as { eyebrow: string; title: string; text: string; footer: string };
    const durationSection = t.raw("durationSection") as {
        eyebrow: string; title: string; lead: string; footer: string;
        cards: Array<{ title: string; subtitle: string; text: string; priceLabel: string; featured?: boolean }>
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: locale === "hu" ? "IT Rendszerüzemeltetés" : "IT Systems Operations",
        provider: { "@type": "Organization", name: "SIRONIC", url: "https://sironic.eu" },
        description: t("metaDescription"),
        areaServed: "HU",
        serviceType: locale === "hu" ? "Kiszervezett IT-üzemeltetés" : "Outsourced IT Operations",
    };

    return (
        <>
            <Script id="rendszer-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
                        <span className="badge"><Server size={13} />{t("badge")}</span>
                        <h1 className={`display-2 ${styles.heroTitle}`}>{t("heroTitle")}</h1>
                        <p className="body-lg">{t("heroSubtitle")}</p>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                            <Link href={freeAssessmentHref} className="btn btn-primary btn-lg">
                                {locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free Assessment"} <ArrowRight size={16} />
                            </Link>
                            <Link href={smartFormHref} className="btn btn-outline btn-lg">
                                {t("ctaPrimary")}
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
                                    <div className="icon-box"><Server size={20} /></div>
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
                    <div className="grid-2" style={{ alignItems: "start", gap: "3rem" }}>
                        <SectionReveal>
                            <span className="accent-line" />
                            <h2 className="heading-1">{t("whoTitle")}</h2>
                            <p className="body-lg" style={{ marginTop: "1rem" }}>{t("whoText")}</p>
                            <ul className={styles.whoList}>
                                {whoItems.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </SectionReveal>
                        <SectionReveal>
                            <div className="card" style={{ background: "var(--surface-2)" }}>
                                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                                    {locale === "hu" ? "Tudta?" : "Did you know?"}
                                </p>
                                <p className="body-lg">
                                    {locale === "hu"
                                        ? "Egy mikrovállalkozás esetén az IT-üzemeltetés kiszervezése akár 60-80%-kal is olcsóbb lehet, mint egy belső IT-szakember foglalkoztatása – miközben profibb megoldást kap."
                                        : "For a micro-business, outsourcing IT operations can be 60–80% cheaper than employing an in-house IT specialist – while getting a more professional solution."}
                                </p>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <SectionTracker id="lepcsozetes_modell" page="rendszeruzemeltetes">
                <section className="section section-alt">
                    <div className="container">
                        <SectionReveal>
                            <h2 className="heading-1 section-title">{t("processTitle")}</h2>
                            <p className="body-lg" style={{ maxWidth: 800, margin: "1rem auto 2.5rem auto", textAlign: "center" }}>
                                {processLead}
                            </p>
                        </SectionReveal>
                        
                        <SectionReveal>
                            <IdovonalHaromHonap className="mb-12" style={{ marginBottom: "3rem" }} />
                        </SectionReveal>

                        <div className={styles.processGrid}>
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
                
                {/* Inventory Panel */}
                <section className="section">
                    <div className="container">
                        <SectionReveal>
                            <div className="card" style={{ background: "var(--surface-2)", borderLeft: "4px solid var(--accent)", padding: "2.5rem" }}>
                                <div className="grid-2" style={{ alignItems: "center", gap: "3rem" }}>
                                    <div>
                                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                                            {inventoryPanel.eyebrow}
                                        </p>
                                        <h3 className="heading-2">{inventoryPanel.title}</h3>
                                        <p className="body-lg" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                                            {inventoryPanel.text}
                                        </p>
                                        <div style={{ padding: "1rem", background: "var(--surface)", borderRadius: "var(--r-card)", border: "1px solid var(--line)" }}>
                                            <p style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 500 }}>{inventoryPanel.footer}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <KopoalkatreszPolc />
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </section>
            </SectionTracker>

            {/* Duration Section */}
            <SectionTracker id="futamido" page="rendszeruzemeltetes">
                <section className="section section-alt">
                    <div className="container">
                        <SectionReveal>
                            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 3rem auto" }}>
                                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                                    {durationSection.eyebrow}
                                </p>
                                <h2 className="heading-1">{durationSection.title}</h2>
                                <p className="body-lg" style={{ marginTop: "1rem" }}>{durationSection.lead}</p>
                            </div>
                        </SectionReveal>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                            {durationSection.cards.map((card, i) => (
                                <SectionReveal key={i}>
                                    <div className="card" style={{ 
                                        height: "100%", 
                                        display: "flex", 
                                        flexDirection: "column",
                                        borderColor: card.featured ? "var(--primary)" : "var(--line)",
                                        boxShadow: card.featured ? "0 8px 30px rgba(232, 39, 26, 0.08)" : "none",
                                        position: "relative"
                                    }}>
                                        {card.featured && (
                                            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                                                {locale === "hu" ? "LEGNÉPSZERŰBB" : "MOST POPULAR"}
                                            </div>
                                        )}
                                        <div style={{ height: "4px", background: card.featured ? "var(--primary)" : "var(--line)", width: i === 0 ? "30%" : i === 1 ? "60%" : "100%", marginBottom: "1.5rem", borderRadius: "2px" }} />
                                        
                                        <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "0.5rem" }}>{card.title}</h3>
                                        <p style={{ color: "var(--muted)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "1.5rem" }}>{card.subtitle}</p>
                                        
                                        <p style={{ color: "var(--ink)", lineHeight: 1.6, flexGrow: 1 }}>{card.text}</p>
                                        
                                        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
                                            <p style={{ margin: 0, fontWeight: 700, color: card.featured ? "var(--primary)" : "var(--ink)" }}>{card.priceLabel}</p>
                                        </div>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>
                        
                        <SectionReveal>
                            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.9375rem" }}>
                                {durationSection.footer}
                            </p>
                        </SectionReveal>
                    </div>
                </section>
            </SectionTracker>

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

            {/* Contextual Compact Free Assessment Banner */}
            <FreeAssessmentSection locale={locale} variant="compact" />

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

            <CtaBlock
                title={locale === "hu" ? "Kezdjük egy ingyenes felméréssel" : "Let's start with a free assessment"}
                subtitle={locale === "hu"
                    ? "Helyszíni felmérésünk díjmentes és kötelezettségmentes. Egy héten belül írásos javaslatot adunk."
                    : "Our on-site assessment is free and without obligation. Receive a written proposal within a week."}
                cta1={{ label: locale === "hu" ? "Kérem az ingyenes felmérést" : "Request Free Assessment", href: `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}` }}
                cta2={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: contactHref }}
            />
        </>
    );
}
