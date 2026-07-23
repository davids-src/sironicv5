import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import { Server, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("referencesTitle"), description: t("referencesDescription") };
}

// ─── Reference data ────────────────────────────────────────────────────────────
const references = [
  {
    id: 2,
    category: "systems",
    categoryLabel: { hu: "IT Support", en: "IT Support" },
    icon: "server",
    anonymous: false,
    company: "Pervector Zrt.",
    industry: { hu: "IT support – irodai infrastruktúra", en: "IT support – office infrastructure" },
    location: "Székesfehérvár",
    since: "2024",
    url: null,
    screenshot: null,
    desc: {
      hu: "A Pervector Zrt. székesfehérvári irodájában folyamatos IT supportot biztosítunk. Végpontvédelem, hibaelhárítás, rendszeres karbantartás – hogy a csapat zavartalanul tudjon dolgozni, nekünk meg az legyen a dolgunk, hogy minden rendben legyen.",
      en: "We provide ongoing IT support at Pervector Zrt.'s Székesfehérvár office – endpoint protection, troubleshooting and regular maintenance, so the team can focus on work while we keep everything running smoothly.",
    },
    results: {
      hu: ["Folyamatos helyszíni és remote support", "Proaktív karbantartás és monitoring", "Gyors reagálás hibák esetén"],
      en: ["On-site and remote support", "Proactive maintenance and monitoring", "Fast incident response"],
    },
  },
  {
    id: 7,
    category: "systems",
    categoryLabel: { hu: "IT Support", en: "IT Support" },
    icon: "server",
    anonymous: false,
    company: "Bocskai Alba Flexum Kft.",
    industry: { hu: "IT support – irodai infrastruktúra", en: "IT support – office infrastructure" },
    location: "Székesfehérvár",
    since: "2024",
    url: null,
    screenshot: null,
    desc: {
      hu: "A Bocskai Alba Flexum Kft. számára ugyanúgy teljes körű IT supportot nyújtunk – helyszíni és távoli segítségnyújtást, rendszeres karbantartást, végpontvédelmet. Egy ügyfél, egy felelős partner, egy kevesebb fejfájás az irodában.",
      en: "For Bocskai Alba Flexum Kft. we provide the same full-coverage IT support – on-site and remote assistance, regular maintenance, and endpoint protection. One client, one responsible partner, one less headache in the office.",
    },
    results: {
      hu: ["Folyamatos helyszíni és remote support", "Végpontvédelem és rendszerkarbantartás", "Gyors reagálás, megbízható jelenlét"],
      en: ["On-site and remote support", "Endpoint protection and system maintenance", "Fast response, reliable presence"],
    },
  },
  {
    id: 9,
    category: "systems",
    categoryLabel: { hu: "IT Support", en: "IT Support" },
    icon: "server",
    anonymous: false,
    company: "Tűzhal Kft.",
    industry: { hu: "Kereskedelmi üzlethálózat", en: "Retail network" },
    location: "Magyarország",
    since: "2024",
    url: null,
    screenshot: null,
    desc: {
      hu: "A Tűzhal Kft. számára kiszervezett rendszergazdai szolgáltatást nyújtunk. Stabil IT hátteret és folyamatos támogatást biztosítunk, beleértve a helyi hibaelhárítást a cég összes üzletében.",
      en: "We provide outsourced system administration services for Tűzhal Kft. We ensure a stable IT background and continuous support, including local troubleshooting across all the company's stores.",
    },
    results: {
      hu: ["Kiszervezett rendszergazdai szolgáltatás", "Helyi hibaelhárítás az összes üzletben", "Gyors reagálás, megbízható jelenlét"],
      en: ["Outsourced system administration", "Local troubleshooting in all stores", "Fast response, reliable presence"],
    },
  },
];

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={22} />,
};

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "references" });
  const lang = locale as "hu" | "en";

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Portfólió" : "Portfolio"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      <section className="section">
        <div className="container">



          {/* Cards */}
          <div className={styles.cardGrid}>
            {references.map((ref, i) => (
              <SectionReveal key={ref.id} delay={i * 0.08}>
                <div className={styles.refCard}>

                  {/* Screenshot */}
                  {ref.screenshot && (
                    <div className={styles.screenshotWrap}>
                      <Image
                        src={ref.screenshot}
                        alt={`${ref.company} weboldal screenshot`}
                        fill
                        className={styles.screenshotImg}
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                      {ref.url && (
                        <Link
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.screenshotOverlay}
                          aria-label={`${ref.company} megtekintése`}
                        >
                          <ExternalLink size={18} />
                          <span>{locale === "hu" ? "Weboldal megnyitása" : "Open website"}</span>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Card header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      {iconMap[ref.icon]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className={styles.catBadge}>{ref.categoryLabel[lang]}</span>
                      <h2 className={styles.companyName}>{ref.company}</h2>
                      <p className={styles.cardMeta}>
                        {ref.industry[lang]} · {ref.location} · {locale === "hu" ? "Ügyfél óta" : "Since"}: {ref.since}
                      </p>
                    </div>
                    {ref.url && !ref.screenshot && (
                      <Link
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.externalBtn}
                        aria-label={`${ref.company} weboldalának megnyitása`}
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>

                  {/* Description */}
                  <p className={styles.cardDesc}>{ref.desc[lang]}</p>

                  {/* Results */}
                  <ul className={styles.resultList}>
                    {ref.results[lang].map((r, j) => (
                      <li key={j}>
                        <CheckCircle2 size={15} className={styles.checkIcon} />
                        {r}
                      </li>
                    ))}
                  </ul>

                </div>
              </SectionReveal>
            ))}
          </div>

        </div>
      </section>

      <CtaBlock
        title={locale === "hu" ? "Legyen a következő projekt az Öné" : "Let your project be next"}
        subtitle={locale === "hu"
          ? "Vegye fel velünk a kapcsolatot – megbeszéljük, mire van szüksége, és egyedi megoldást adunk."
          : "Get in touch – we'll discuss what you need and find the right solution."}
        cta1={{ label: locale === "hu" ? "Ajánlatkérés" : "Get a Quote", href: `/${locale}/kapcsolat` }}
        cta2={{ label: locale === "hu" ? "Díjkalkulátor" : "Price Calculator", href: `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}` }}
      />
    </>
  );
}
