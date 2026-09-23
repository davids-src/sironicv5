import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Wrench, SearchCheck } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsHub" });

  const slug = locale === "hu" ? "megoldasok" : "solutions";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok",
        hu: "https://sironic.eu/hu/megoldasok",
        en: "https://sironic.eu/en/solutions",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      siteName: "SIRONIC",
      locale: locale === "hu" ? "hu_HU" : "en_US",
      type: "website",
    },
  };
}

export default async function SolutionsHubPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=megoldasok-hub`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const cards = [
    {
      badge: locale === "hu" ? "ÚJ IRODA" : "NEW OFFICE",
      title: locale === "hu" ? "Új iroda IT infrastruktúrája az első munkanapra készen" : "New office IT infrastructure ready for day one",
      text: locale === "hu" ? "Strukturált hálózat, üzleti Wi‑Fi, firewall, rack, eszközök és Microsoft környezet összehangolt kialakítása." : "Structured cabling, business Wi‑Fi, firewall, rack, endpoints and Microsoft environment designed as one system.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}`,
    },
    {
      badge: locale === "hu" ? "ÚJ TELEPEHELY" : "NEW SITE",
      title: locale === "hu" ? "Új telephelyhez stabil IT-alapok" : "Stable IT foundations for a new site",
      text: locale === "hu" ? "A WAN kapcsolattól a végpontokig megtervezzük és kiépítjük a működéshez szükséges informatikai infrastruktúrát." : "From WAN connectivity to endpoints, we design and build the IT infrastructure required for daily operations.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-telephely-it" : "solutions/new-site-it"}`,
    },
    {
      badge: locale === "hu" ? "KAPACITÁSBŐVÍTÉS" : "EXPANSION",
      title: locale === "hu" ? "Kinőtte a jelenlegi hálózatot? Bővítsük úgy, hogy közben működjön." : "Outgrown your current network? Expand it without losing control.",
      text: locale === "hu" ? "Új végpontok, AP-k, VLAN-ok, switch-kapacitás és telephelyi bővítés kontrolláltan, dokumentáltan." : "Add endpoints, access points, VLANs and switching capacity with a documented migration path.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
    },
    {
      badge: locale === "hu" ? "KÖLTÖZÉS" : "RELOCATION",
      title: locale === "hu" ? "Irodaköltözés minimális IT-kieséssel" : "Office relocation with minimal IT downtime",
      text: locale === "hu" ? "Felmérés, új helyszín terve, eszköz- és szolgáltatásköltöztetés, tesztelés és átadás egy ütemezésben." : "Assessment, new-site design, service and equipment migration, testing and handover in one plan.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/irodakoltozes" : "solutions/office-relocation"}`,
    },
    {
      badge: locale === "hu" ? "MODERNIZÁCIÓ" : "MODERNIZATION",
      title: locale === "hu" ? "Meglévő IT környezet modernizálása" : "Modernize an existing IT environment",
      text: locale === "hu" ? "Ami működik, azt megtartjuk; ami kockázat vagy szűk keresztmetszet, azt terv szerint cseréljük vagy korszerűsítjük." : "Keep what works and replace or modernize what creates risk or capacity limits according to a clear plan.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok" : "solutions"}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "hu" ? "Főoldal" : "Home", item: `https://sironic.eu/${locale}` },
        { "@type": "ListItem", position: 2, name: locale === "hu" ? "Megoldások" : "Solutions", item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok" : "solutions"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="solutions-hub-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <SectionReveal>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{locale === "hu" ? "Főoldal" : "Home"}</Link>
              <span>/</span>
              <span style={{ color: "var(--ink)" }}>{locale === "hu" ? "Megoldások" : "Solutions"}</span>
            </nav>

            <span className="badge">
              <ShieldCheck size={13} />
              {t("badge")}
            </span>

            <h1 className={`display-2 ${styles.heroTitle}`}>{t("h1")}</h1>
            <p className={`body-lg ${styles.heroIntro}`}>{t("intro")}</p>
          </SectionReveal>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {cards.map((card, idx) => (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <Link href={card.href} className={styles.card}>
                  <div className={styles.cardBadge}>{card.badge}</div>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardText}>{card.text}</p>
                  <span className={styles.cardCta}>
                    {locale === "hu" ? "Részletes megoldás" : "View Solution"} <ArrowRight size={14} />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operations & Free Assessment Bridge */}
      <section className={styles.opsBridge}>
        <div className="container">
          <SectionReveal>
            <div className={styles.opsBox}>
              <span className="badge" style={{ marginBottom: "0.75rem" }}>
                FOLYAMATOS ÜZEMELTETÉS & AUDIT
              </span>
              <h2 className="heading-1" style={{ color: "#FFF" }}>{t("opsBridgeTitle")}</h2>
              <p className="body-lg" style={{ color: "var(--silver)", marginTop: "1rem" }}>
                {t("opsBridgeText")}
              </p>

              <div className={styles.opsCtas}>
                <Link href={`/${locale}/szolgaltatasok/rendszeruzemeltetes`} className="btn btn-primary">
                  <Wrench size={16} />
                  {t("opsCta")}
                </Link>
                <Link href={freeAssessmentHref} className="btn btn-outline">
                  <SearchCheck size={16} />
                  {t("assessmentCta")}
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <CtaBlock
        title={locale === "hu" ? "Egyeztessünk az Ön IT projektjéről!" : "Let's discuss your IT project!"}
        subtitle={
          locale === "hu"
            ? "Mérnöki megközelítéssel, transzparens árazással és rögzített határidőkkel állunk rendelkezésére."
            : "Engineering discipline, transparent pricing, and guaranteed delivery timelines."
        }
        cta1={{ label: t("primaryCta"), href: contactHref }}
        cta2={{ label: t("secondaryCta"), href: freeAssessmentHref }}
      />
    </>
  );
}
