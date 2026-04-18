import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import { Server, Globe, Code, CheckCircle2, ExternalLink, Monitor } from "lucide-react";
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
    id: 1,
    category: "platform",
    categoryLabel: { hu: "Saját platform", en: "Own Platform" },
    icon: "code",
    anonymous: false,
    company: "tDarts – Tournament Hub",
    industry: { hu: "Darts versenykezelő platform", en: "Darts tournament management" },
    location: "Magyarország",
    since: "2024",
    url: "https://tdarts.hu",
    screenshot: "/tdarts.png",
    desc: {
      hu: "A tDarts a mi fejlesztésünk, a mi ötletünk – és mi is vagyunk a fenntartói. Egy teljes körű darts versenykezelő platform, ahol klubok hozhatnak létre tornákat, játékosok QR-kóddal csatlakoznak, és az eredmények valós időben követhetők. Beépített statisztikák, tablet-optimalizált táblakezelés és rugalmas versenyszabályok.",
      en: "tDarts is our own idea and product – built and maintained entirely by us. A full-featured darts tournament platform where clubs run competitions, players join via QR code, and results update in real time. Includes player stats, tablet-optimised scorekeeping, and flexible tournament formats.",
    },
    results: {
      hu: ["Saját ötlet, fejlesztés és üzemeltetés", "Valós idejű eredménykövetés", "QR-kódos belépés regisztráció nélkül", "Tablet-optimalizált felület"],
      en: ["Own concept, development and hosting", "Real-time result tracking", "QR code entry without registration", "Tablet-optimised interface"],
    },
  },
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
    id: 3,
    category: "websites",
    categoryLabel: { hu: "Weboldal karbantartás", en: "Website Maintenance" },
    icon: "globe",
    anonymous: false,
    company: "Kerámia Plus Kft.",
    industry: { hu: "Fogászati magánrendelő", en: "Private dental clinic" },
    location: "Székesfehérvár",
    since: "2024",
    url: "https://keramiadental.hu",
    screenshot: null,
    desc: {
      hu: "A Kerámia Dental székesfehérvári fogászati rendelő weboldalának karbantartását és folyamatos fejlesztését végezzük. Kérésükre módosítjuk az oldalt, együttműködve a marketingesekkel és a szakmai csapattal – hogy a weboldal mindig pontosan azt kommunikálja, amit a klinika.",
      en: "We maintain and continuously develop the website of Kerámia Dental, a private dental clinic in Székesfehérvár. We implement their requests, collaborate with their marketing team and specialists, ensuring the site always communicates exactly what the clinic wants.",
    },
    results: {
      hu: ["Folyamatos tartalom- és designfrissítések", "Marketing csapattal való együttműködés", "Google 4.7★ értékelés – a klinikának is jár a büszkeség"],
      en: ["Continuous content and design updates", "Collaboration with marketing team", "Google 4.7★ rating – a clinic worth showcasing"],
    },
  },
  {
    id: 4,
    category: "websites",
    categoryLabel: { hu: "Webfejlesztés", en: "Web Development" },
    icon: "code",
    anonymous: false,
    company: "Boathungary.hu Kft.",
    industry: { hu: "Prémium elektromos hajó- és autóbérlés", en: "Premium electric boat & car rental" },
    location: "Budapest",
    since: "2024",
    url: "https://boathungary.hu",
    screenshot: "/boathungary.png",
    desc: {
      hu: "A BoatHungary weboldala teljesen egyedi fejlesztés – React és TypeScript alapon, WordPress nélkül. Az oldal prémium elektromos hajó- és Tesla-bérlési szolgáltatásokat mutat be, letisztult vizuális megjelenéssel, mobilbarát kialakítással és közvetlen ajánlatkérési funkcióval.",
      en: "The BoatHungary website is a fully custom build – React and TypeScript, no WordPress. It presents premium electric boat and Tesla rental services with a clean visual identity, mobile-friendly design, and direct quote request functionality.",
    },
    results: {
      hu: ["Teljesen egyedi React + TypeScript fejlesztés", "Mobiloptimalizált, gyors betöltés", "Direkt ajánlatkérési form integrációval"],
      en: ["Fully custom React + TypeScript build", "Mobile-optimised, fast loading", "Integrated direct quote request form"],
    },
  },
  {
    id: 5,
    category: "platform",
    categoryLabel: { hu: "Oktatási platform", en: "Learning Platform" },
    icon: "monitor",
    anonymous: false,
    company: "Magyar Darts Akadémia",
    industry: { hu: "Darts oktatási platform", en: "Darts coaching platform" },
    location: "Magyarország",
    since: "2024",
    url: "https://365daysdarts.com",
    screenshot: "/365daysdarts.png",
    desc: {
      hu: "A 365daysdarts.com a Magyar Darts Akadémia online képzési platformja – teljesen egyedi fejlesztés. Az oldal összetett oktatási tartalmat, edzésprogramokat és közösséget fog össze egy rendszerben. A platform neve is adja az irányvonalat: 365 napon át, napi fejlődés.",
      en: "365daysdarts.com is the Magyar Darts Akadémia's online coaching platform – a fully custom build. It brings together structured learning content, training programmes and community in one system. Daily improvement, 365 days a year.",
    },
    results: {
      hu: ["Teljesen egyedi, komplex fejlesztés", "Strukturált oktatási tartalom és edzésprogramok", "Közösségi és haladáskövetési funkciók"],
      en: ["Fully custom, complex development", "Structured educational content and training plans", "Community features and progress tracking"],
    },
  },
  {
    id: 6,
    category: "websites",
    categoryLabel: { hu: "Webfejlesztés", en: "Web Development" },
    icon: "globe",
    anonymous: false,
    company: "Krausz Barkácsmester Kft.",
    industry: { hu: "Kézműves barkács- és favágó szolgáltatás", en: "Handcraft woodwork & outdoor services" },
    location: "Magyarország",
    since: "2025",
    url: "https://krauszbarkacs.hu",
    screenshot: null,
    desc: {
      hu: "A Krausz Barkácsmester weboldala jelenleg fejlesztés alatt áll – az oldal hamarosan élőben is elérhető lesz. A projekt célja egy letisztult, mobilbarát bemutatkozó weboldal, amely hitelesen kommunikálja a mester munkáját és az elérhető szolgáltatásokat.",
      en: "The Krausz Barkácsmester website is currently under development and will be live soon. The goal is a clean, mobile-first showcase that authentically presents the craftsman's work and available services.",
    },
    results: {
      hu: ["Fejlesztés alatt – hamarosan élőben", "Mobilbarát, modern kialakítás", "Saját CMS admin felülettel"],
      en: ["Under development – coming soon", "Mobile-first modern design", "With custom CMS admin panel"],
    },
  },
  {
    id: 8,
    category: "platform",
    categoryLabel: { hu: "Webplatform fejlesztés", en: "Web Platform" },
    icon: "globe",
    anonymous: false,
    company: "Magyar Darts Szövetség – OAC Liga",
    industry: { hu: "Amatőr darts liga portál", en: "Amateur darts league portal" },
    location: "Magyarország",
    since: "2024",
    url: "https://amatordarts.hu",
    screenshot: "/amatordarts.png",
    desc: {
      hu: "Az amatordarts.hu az Országos Amatőr Cashout Liga (OAC) hivatalos portálja – a Magyar Darts Szövetség megrendelésére fejlesztettük. A tDarts platformra épülő rendszer kezeli a ligaversenyek jelentkezéseit, a pontgyűjtést és az automatikus ranglistát. Fairplay-biztosítékok, automatikus szinkronizáció és teljeskörű digitális liga-menedzsment.",
      en: "amatordarts.hu is the official portal of the Országos Amatőr Cashout Liga (OAC), built on commission from the Magyar Darts Szövetség. Built on the tDarts platform, it handles league registrations, point accumulation and automatic rankings – with fairplay safeguards and full digital league management.",
    },
    results: {
      hu: ["Magyar Darts Szövetség megrendelésére", "tDarts platformra épített liga-portál", "Automatikus ranglisták és fairplay-ellenőrzés"],
      en: ["Built for Magyar Darts Szövetség", "League portal built on tDarts platform", "Automatic rankings and fairplay monitoring"],
    },
  },
];

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={22} />,
  globe: <Globe size={22} />,
  code: <Code size={22} />,
  monitor: <Monitor size={22} />,
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
