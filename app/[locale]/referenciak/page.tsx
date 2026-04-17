import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import { Server, Globe, CheckCircle2, EyeOff } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("referencesTitle"), description: t("referencesDescription") };
}

// ─── Reference data ───────────────────────────────────────────────────────────
// anonymous: true → nem jelenik meg a cégnév, csak az iparág + helyszín
// screenshot: "/screenshots/xyz.png" → csak weboldal kártyáknál
const references = [
  {
    id: 1,
    category: "systems",
    categoryLabel: { hu: "Rendszerüzemeltetés", en: "IT Operations" },
    icon: "server",
    anonymous: false,
    company: "Példa Kft.",
    industry: { hu: "Kereskedelmi vállalkozás", en: "Retail company" },
    location: "Székesfehérvár",
    since: "2023",
    screenshot: null,
    desc: {
      hu: "Teljes IT-infrastruktúra kiszervezett üzemeltetése – szerverparkkezelés, végpontvédelem, hibabejelentő rendszer és havi karbantartás. A vállalkozás azóta egyetlen IT-leállást sem tapasztalt.",
      en: "Full outsourced IT operations – server management, endpoint protection, helpdesk and monthly maintenance. Zero IT downtime since.",
    },
    results: {
      hu: ["0 tervezetlen leállás 12 hónap alatt", "Havi fix díj, nincsenek meglepetések", "Proaktív monitoring 24/7"],
      en: ["0 unplanned downtime in 12 months", "Fixed monthly fee, no surprises", "Proactive monitoring 24/7"],
    },
  },
  {
    id: 2,
    category: "websites",
    categoryLabel: { hu: "Weboldal fejlesztés", en: "Website Development" },
    icon: "globe",
    anonymous: true,                          // ← névtelen: csak iparág látszódik
    company: null,
    industry: { hu: "Székesfehérvári szépségszalon", en: "Beauty salon, Székesfehérvár" },
    location: "Székesfehérvár",
    since: "2024",
    screenshot: "/screenshots/demo-salon.png", // ← ide kerül a weboldal screenshot
    desc: {
      hu: "Egyedi arculatú, teljes képernyős foglaló rendszerrel integrált bemutatkozó weboldal fejlesztése. Mobilbarát, gyors, SEO-optimalizált megoldás WordPress nélkül.",
      en: "Custom design website with full-screen booking integration. Mobile-first, fast, SEO-optimised – no WordPress.",
    },
    results: {
      hu: ["3× több online foglalás az első hónapban", "100% mobil-kompatibilis", "Google PageSpeed 95+ pontszám"],
      en: ["3× more online bookings in first month", "100% mobile-compatible", "Google PageSpeed 95+ score"],
    },
  },
];

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={22} />,
  globe: <Globe size={22} />,
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

          {/* Stats */}
          <SectionReveal>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>2+</span>
                <span className={styles.statLabel}>{locale === "hu" ? "Aktív ügyfél" : "Active clients"}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>{locale === "hu" ? "Elégedett partner" : "Satisfied partners"}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>2023</span>
                <span className={styles.statLabel}>{locale === "hu" ? "Alapításunk éve" : "Founded"}</span>
              </div>
            </div>
          </SectionReveal>

          {/* Cards */}
          <div className={styles.cardGrid}>
            {references.map((ref, i) => (
              <SectionReveal key={ref.id} delay={i * 0.1}>
                <div className={styles.refCard}>

                  {/* Screenshot area — only for website references */}
                  {ref.screenshot && (
                    <div className={styles.screenshotWrap}>
                      {/* When real screenshot exists, replace with <Image> */}
                      <div className={styles.screenshotPlaceholder}>
                        <Globe size={32} className={styles.screenshotIcon} />
                        <span>{locale === "hu" ? "Weboldal screenshot" : "Website screenshot"}</span>
                      </div>
                    </div>
                  )}

                  {/* Card header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      {iconMap[ref.icon]}
                    </div>
                    <div>
                      <span className={styles.catBadge}>{ref.categoryLabel[lang]}</span>
                      {ref.anonymous ? (
                        <div className={styles.anonRow}>
                          <EyeOff size={13} className={styles.anonIcon} />
                          <span className={styles.companyAnon}>{ref.industry[lang]}</span>
                        </div>
                      ) : (
                        <>
                          <h2 className={styles.companyName}>{ref.company}</h2>
                          <p className={styles.cardMeta}>{ref.industry[lang]} · {ref.location} · {locale === "hu" ? "Ügyfél óta" : "Client since"}: {ref.since}</p>
                        </>
                      )}
                      {ref.anonymous && (
                        <p className={styles.cardMeta}>{ref.location} · {locale === "hu" ? "Ügyfél óta" : "Client since"}: {ref.since}</p>
                      )}
                    </div>
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

          <SectionReveal>
            <p className={styles.demoNote}>
              {locale === "hu"
                ? "* Demó verzió – hamarosan valós ügyfeleink referenciái is felkerülnek. Egyes partnereink kérésére névtelenül szerepelnek."
                : "* Demo version – real client references coming soon. Some partners are listed anonymously by request."}
            </p>
          </SectionReveal>

        </div>
      </section>

      <CtaBlock
        title={locale === "hu" ? "Elkészítjük az Ön projektjét is" : "We'll build your project too"}
        subtitle={locale === "hu"
          ? "Vegye fel velünk a kapcsolatot és egyedi megoldást kap."
          : "Get in touch and receive a custom solution."}
        cta1={{ label: locale === "hu" ? "Ajánlatkérés" : "Get a Quote", href: `/${locale}/kapcsolat` }}
      />
    </>
  );
}
