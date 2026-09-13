import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { Mail, Phone, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isHu = locale === "hu";
  return {
    title: t("partnerPageTitle"),
    description: t("partnerPageDescription"),
    alternates: {
      canonical: isHu
        ? "https://sironic.eu/hu/partneri-egyuttmukodes"
        : "https://sironic.eu/en/partnership",
      languages: {
        hu: "https://sironic.eu/hu/partneri-egyuttmukodes",
        en: "https://sironic.eu/en/partnership",
      },
    },
    openGraph: {
      title: isHu
        ? "IT-kapacitás a csapata mellé — SIRONIC"
        : "IT Capacity Alongside Your Team — SIRONIC",
      description: isHu
        ? "Alvállalkozói IT-kapacitás MSP-knek, rendszerintegrátoroknak és saját IT-csapattal működő cégeknek."
        : "Subcontractor IT capacity for MSPs, system integrators and companies with in-house IT teams.",
      type: "website",
    },
  };
}

// ─── STATIC CONTENT ──────────────────────────────────────────────────────────

// B2B partners (empty = section not shown)
const b2bPartners: Array<{
  name: string;
  type: { hu: string; en: string };
  quote?: { hu: string; en: string };
}> = [];

export default async function PartnerPageB2B({ params }: Props) {
  const { locale } = await params;
  const isHu = locale === "hu";
  const lang = locale as "hu" | "en";

  const freeAssessmentHref = `/${locale}/${isHu ? "ingyenes-felmeres" : "free-assessment"}`;

  // ─── JSON-LD — FAQPage ───────────────────────────────────────────────────
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isHu ? "hu-HU" : "en-US",
    mainEntity: [
      {
        "@type": "Question",
        name: isHu
          ? "Milyen technológiákban vállalnak delegált feladatot?"
          : "What technologies do you cover for delegated tasks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Elsősorban Microsoft-környezetben: Windows Server, Active Directory, Entra ID, Microsoft 365, Azure és Hyper-V — on-premise és felhős környezetben egyaránt. Emellett VMware és Linux szerverek üzemeltetését, valamint hálózati kivitelezést is vállalunk."
            : "Primarily in Microsoft environments: Windows Server, Active Directory, Entra ID, Microsoft 365, Azure and Hyper-V — both on-premise and cloud. We also cover VMware and Linux server operations, as well as network deployment.",
        },
      },
      {
        "@type": "Question",
        name: isHu
          ? "Hol vállalnak helyszíni munkát?"
          : "Where do you take on on-site work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Helyszíni kivitelezést Fejér megyében, Budapesten és a Közép-Dunántúlon vállalunk. Távoli üzemeltetést és támogatást országosan."
            : "On-site work in Fejér County, Budapest and Central Transdanubia. Remote operations and support nationwide.",
        },
      },
      {
        "@type": "Question",
        name: isHu
          ? "Hogyan számoltok el — óradíjban vagy projektre?"
          : "How do you bill — hourly or per project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Mindkettő működik. Havi óra-keret előre egyeztetett óraszámmal, vagy projektalapú elszámolás — attól függően, melyik illeszkedik jobban a feladathoz."
            : "Both work. A monthly hour frame with a pre-agreed number of hours, or project-based billing — depending on which fits better.",
        },
      },
      {
        "@type": "Question",
        name: isHu
          ? "Mi történik, ha egy projekt több embert igényel?"
          : "What if a project requires more people?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Felkészültünk a kapacitásbővítésre. Ha egy feladat több szakembert kíván, bevont kollégákkal bővítünk — a vállalt határidő ettől nem csúszik."
            : "We are prepared for capacity scaling. If a task requires more specialists, we bring in additional colleagues — the agreed deadline does not slip.",
        },
      },
      {
        "@type": "Question",
        name: isHu
          ? "A mi ticketrendszerünkben tudnak dolgozni?"
          : "Can you work in our ticketing system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Igen. Az Önök folyamatai szerint dolgozunk: a ticketrendszerükben, a dokumentációs sablonjaikkal, a változáskezelési rendjük szerint."
            : "Yes. We work according to your processes: in your ticketing system, with your documentation templates, following your change management procedures.",
        },
      },
      {
        "@type": "Question",
        name: isHu
          ? "Megkeresik később a mi ügyfelünket?"
          : "Will you approach our client later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHu
            ? "Nem. Az Önök ügyfele az Önöké marad."
            : "No. Your client remains yours.",
        },
      },
    ],
  };

  // ─── JSON-LD — Service ───────────────────────────────────────────────────
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    inLanguage: isHu ? "hu-HU" : "en-US",
    serviceType: isHu
      ? "IT alvállalkozói kapacitás és rendszerüzemeltetési támogatás"
      : "IT subcontractor capacity and systems operations support",
    name: isHu
      ? "B2B IT alvállalkozói együttműködés — SIRONIC"
      : "B2B IT Subcontractor Cooperation — SIRONIC",
    description: isHu
      ? "IT-kapacitás meglévő csapatok mellé: Microsoft-környezet (Windows Server, Active Directory, Entra ID, Microsoft 365, Azure, Hyper-V), VMware, Linux, hálózatépítés. Helyszíni és távoli üzemeltetés."
      : "IT capacity alongside existing teams: Microsoft environment (Windows Server, Active Directory, Entra ID, Microsoft 365, Azure, Hyper-V), VMware, Linux, network building. On-site and remote operations.",
    provider: {
      "@type": "Organization",
      name: "SIROTECH Kft.",
      url: "https://sironic.eu",
      email: "skoda.david@sironic.hu",
      telephone: "+36-70-273-5532",
    },
    areaServed: [
      { "@type": "State", name: "Fejér megye" },
      { "@type": "City", name: "Budapest" },
      { "@type": "AdministrativeArea", name: "Közép-Dunántúl" },
      { "@type": "Country", name: "Magyarország" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: isHu
        ? "IT-szolgáltatók, MSP-k, rendszerintegrátorok, saját IT-csapattal működő cégek"
        : "IT service providers, MSPs, system integrators, companies with in-house IT teams",
    },
  };

  return (
    <>
      {/* ─── JSON-LD ───────────────────────────────────────────────────── */}
      <Script
        id="b2b-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="b2b-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ─── 1. HERO ──────────────────────────────────────────────────── */}
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className={styles.eyebrow}>
              {isHu ? "B2B EGYÜTTMŰKÖDÉS" : "B2B COOPERATION"}
            </span>
            <h1 className={`display-2 ${styles.heroTitle}`}>
              {isHu
                ? "IT-kapacitás a csapata mellé — projektre, szakterületre vagy időszakra"
                : "IT capacity alongside your team — for a project, a specialisation or a period"}
            </h1>
            <p className={styles.heroLead}>
              {isHu
                ? "Nem a meglévő IT-csapat helyére pályázunk, hanem mellé dolgozunk. Delegálható szakterület, helyszíni kéz egy távoli ügyfélnél, vagy plusz kapacitás egy projekt idejére."
                : "We do not compete with your existing IT team — we work alongside it. A delegated technical area, on-site hands at a remote client, or extra capacity for the duration of a project."}
            </p>
            <div className={styles.heroActions}>
              <a href="#kapcsolat" className={styles.btnPrimary}>
                {isHu ? "Beszéljünk egy feladatról" : "Let's talk about a project"}
              </a>
              <a href="#amit-vallalunk" className={styles.btnSecondary}>
                {isHu ? "Mit vállalunk" : "What we do"}
              </a>
            </div>
            <div className={styles.statBar}>
              <div className={styles.stat}>
                <span className={styles.statValue}>Microsoft-vonal</span>
                <span className={styles.statLabel}>{isHu ? "ON-PREMISE ÉS AZURE" : "ON-PREMISE AND AZURE"}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{isHu ? "Országosan" : "Nationwide"}</span>
                <span className={styles.statLabel}>{isHu ? "TÁVOLI TÁMOGATÁS" : "REMOTE SUPPORT"}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>1 {isHu ? "munkanap" : "business day"}</span>
                <span className={styles.statLabel}>{isHu ? "VÁLASZIDŐ MEGKERESÉSRE" : "RESPONSE TO ENQUIRIES"}</span>
              </div>
            </div>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* ─── 2. KIKKEL DOLGOZUNK ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "KIKKEL DOLGOZUNK" : "WHO WE WORK WITH"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu
                  ? "Nem mindenki ugyanazért keres minket"
                  : "Not everyone comes to us for the same reason"}
              </h2>
              <p className={styles.sectionLead}>
                {isHu
                  ? "Más kell egy saját IT-csapattal működő cégnek, mint egy MSP-nek vagy egy rendszerintegrátornak. Az alábbi négy helyzetben dolgozunk a leggyakrabban."
                  : "A company with its own IT team has different needs from an MSP or a system integrator. These are the four situations we work in most often."}
              </p>
            </div>
          </SectionReveal>
          <div className={styles.cardGrid2}>
            {[
              {
                title: isHu ? "Cégek saját IT-csapattal" : "Companies with in-house IT",
                text: isHu
                  ? "Amikor egyszerre jön több dolog: egy migráció, egy telephely-költözés, egy szabadságolási időszak. Nem a csapat helyett, hanem mellé."
                  : "When several things come at once: a migration, an office move, a holiday period. Not instead of the team, but alongside it.",
              },
              {
                title: "IT-szolgáltatók, MSP-k",
                text: isHu
                  ? "Ha az ügyfél Fejér megyében vagy a Közép-Dunántúlon van, Önök viszont Budapestről vagy távolabbról dolgoznak. Helyszíni kézként bekapcsolódunk, a rendszert Önök viszik tovább."
                  : "If the client is in Fejér County or Central Transdanubia but you work from Budapest or further away. We step in as on-site hands; you continue to run the system.",
              },
              {
                title: isHu ? "Rendszerintegrátorok" : "System integrators",
                text: isHu
                  ? "Kivitelezési kapacitás egy projekthez: hálózatépítés, rack-szerelés, eszköztelepítés, helyszíni beüzemelés."
                  : "Deployment capacity for a project: network installation, rack assembly, device deployment, on-site commissioning.",
              },
              {
                title: isHu ? "Szoftvercégek" : "Software companies",
                text: isHu
                  ? "Amikor a szoftver kész, de az infrastruktúra-oldal nem az Önök szakterülete. Szerver, hálózat, jogosultságok, üzemeltetés."
                  : "When the software is ready but the infrastructure side is not your speciality. Servers, networking, permissions, operations.",
              },
            ].map((card, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className={styles.targetCard}>
                  <h3 className={styles.targetCardTitle}>{card.title}</h3>
                  <p className={styles.targetCardText}>{card.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. AMIT VÁLLALUNK ───────────────────────────────────────── */}
      <section className="section" id="amit-vallalunk">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "SZAKTERÜLETEK" : "SPECIALISATIONS"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Amit átvehetünk" : "What we can take over"}
              </h2>
              <p className={styles.sectionLead}>
                {isHu
                  ? "Egy-egy szakterület teljes egészében, vagy egy projekt kivitelezési része. Amiben a legerősebbek vagyunk, az a Microsoft-vonal — on-premise és felhős környezetben egyaránt."
                  : "An entire specialisation, or the deployment part of a project. Our strongest suit is the Microsoft stack — both on-premise and in the cloud."}
              </p>
            </div>
          </SectionReveal>
          <div className={styles.serviceGroups}>
            {[
              {
                title: "Microsoft-környezet",
                featured: true,
                items: [
                  "Windows Server telepítés, üzemeltetés, migráció",
                  "Active Directory és Entra ID (Azure AD) kezelés",
                  "Microsoft 365 bevezetés, migráció, adminisztráció",
                  "Azure erőforrások kialakítása és üzemeltetése",
                  "Hyper-V virtualizációs környezet",
                  "Hibrid (on-premise + felhő) környezetek összehangolása",
                ],
                itemsEn: [
                  "Windows Server installation, operations, migration",
                  "Active Directory and Entra ID (Azure AD) management",
                  "Microsoft 365 deployment, migration, administration",
                  "Azure resource design and operations",
                  "Hyper-V virtualisation environment",
                  "Hybrid (on-premise + cloud) environment alignment",
                ],
              },
              {
                title: isHu ? "Infrastruktúra" : "Infrastructure",
                featured: false,
                items: [
                  "VMware virtualizációs környezet",
                  "Linux szerverek üzemeltetése",
                  "Mentési rendszerek kialakítása és tesztelése",
                  "Szerverpark felügyelet, monitoring",
                ],
                itemsEn: [
                  "VMware virtualisation environment",
                  "Linux server operations",
                  "Backup system design and testing",
                  "Server park monitoring",
                ],
              },
              {
                title: isHu ? "Hálózat és helyszíni kivitelezés" : "Network and on-site deployment",
                featured: false,
                items: [
                  "Strukturált kábelezés, rack-szerelés, patch panel",
                  "Aktív hálózati eszközök telepítése, konfigurálása",
                  "Vállalati WiFi tervezés és kiépítés",
                  "Telephely-költözés, rendszerátállás",
                ],
                itemsEn: [
                  "Structured cabling, rack assembly, patch panel",
                  "Active network device installation and configuration",
                  "Enterprise WiFi design and deployment",
                  "Office relocation, system switchover",
                ],
              },
              {
                title: isHu ? "Dokumentáció és felmérés" : "Documentation and assessment",
                featured: false,
                items: [
                  "Eszközleltár, hálózati rajz készítése",
                  "Hozzáférés-nyilvántartás összeállítása",
                  "Rendszerfelmérés, állapotdokumentáció",
                  "NIS2 hiányelemzés és felkészítési támogatás",
                ],
                itemsEn: [
                  "Asset inventory, network diagram",
                  "Access register compilation",
                  "System assessment, status documentation",
                  "NIS2 gap analysis and readiness support",
                ],
              },
            ].map((group, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div
                  className={`${styles.serviceGroup} ${group.featured ? styles.serviceGroupFeatured : ""}`}
                >
                  <h3 className={styles.serviceGroupTitle}>
                    {group.title}
                    {group.featured && (
                      <span className={styles.featuredBadge}>
                        {isHu ? "Fő szakterület" : "Core area"}
                      </span>
                    )}
                  </h3>
                  <ul className={styles.serviceList}>
                    {(isHu ? group.items : group.itemsEn).map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. NEM A CSAPAT HELYETT ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "AMIBEN MÁSOK VAGYUNK" : "WHAT SETS US APART"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Nem a csapat helyett" : "Not instead of the team"}
              </h2>
              <p className={styles.sectionLead}>
                {isHu
                  ? "A legtöbb IT-szolgáltató megkeresése úgy hangzik, mintha le akarná váltani a meglévő csapatot. Ez az IT-vezetőnek nem ajánlat, hanem fenyegetés — és jellemzően ott ér véget a beszélgetés."
                  : "Most IT provider approaches sound as if they want to replace the existing team. For an IT manager, that is not an offer — it is a threat. And typically that is where the conversation ends."}
              </p>
              <div className={styles.highlightPanel}>
                {isHu
                  ? "Mi kapacitást kínálunk, nem helycserét. Az Önök csapata viszi a rendszert, mi azt a részt visszük, amit átadnak."
                  : "We offer capacity, not replacement. Your team runs the system; we take on the part you delegate."}
              </div>
            </div>
          </SectionReveal>
          <div className={styles.pointGrid}>
            {[
              {
                title: isHu ? "Az Önök folyamatai szerint" : "Following your processes",
                text: isHu
                  ? "A ticketrendszerükben, a dokumentációs sablonjaikkal, a változáskezelési rendjük szerint dolgozunk."
                  : "We work in your ticketing system, with your documentation templates, following your change management procedures.",
              },
              {
                title: isHu ? "Az Önök kapcsolattartójával" : "With your point of contact",
                text: isHu
                  ? "Egy emberrel egyeztetünk, nem a szervezetükön keresztül."
                  : "We coordinate with one person, not through the organisation.",
              },
              {
                title: isHu ? "Átadható munka" : "Handover-ready work",
                text: isHu
                  ? "Amit csinálunk, azt úgy dokumentáljuk, hogy a csapatuk bármikor átvehesse. Nem építünk függőséget."
                  : "Everything we do is documented so your team can take it over at any time. We do not build dependency.",
              },
            ].map((point, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className={styles.pointCard}>
                  <h3 className={styles.pointCardTitle}>{point.title}</h3>
                  <p className={styles.pointCardText}>{point.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. EGY KÉZBŐL ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "KIVITELEZÉSI PROJEKTEKNÉL" : "DEPLOYMENT PROJECTS"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Ha az épületben is dolgozni kell" : "When on-site work is needed"}
              </h2>
              <p className={styles.sectionLead}>
                {isHu
                  ? "Egy irodaköltözésnél vagy új telephelynél a hálózat ritkán áll meg a patch panelnél. Kell hozzá nyomvonal, kell hozzá tápellátás, és gyakran kamera vagy beléptetés is."
                  : "On an office move or a new site, the network rarely stops at the patch panel. You need conduit, you need power, and often cameras or access control too."}
              </p>
              <div className={styles.highlightPanel}>
                {isHu
                  ? "Ezeket ugyanaz a cég viszi — nem kell három alvállalkozót összehangolnia."
                  : "All of this is handled by the same company — you do not need to coordinate three subcontractors."}
              </div>
            </div>
          </SectionReveal>
          <div className={styles.divisionGrid}>
            {[
              {
                name: "SIRONIC",
                area: isHu ? "Informatika, hálózat" : "IT, networking",
                desc: isHu
                  ? "Strukturált kábelezés, rack, aktív eszközök, szerverek"
                  : "Structured cabling, rack, active devices, servers",
                href: null,
              },
              {
                name: "SIROVILL",
                area: isHu ? "Erősáram, villanyszerelés" : "Power, electrical",
                desc: isHu
                  ? "Nyomvonal, csövezés, tápellátás, elosztó"
                  : "Conduit, trunking, power supply, distribution board",
                href: "https://sirovill.hu",
              },
              {
                name: "SIRO-VÉD",
                area: isHu ? "Gyengeáram, biztonságtechnika" : "Low-voltage, security",
                desc: isHu
                  ? "Kamera, riasztó, beléptetés, tűzjelző"
                  : "Cameras, alarms, access control, fire detection",
                href: "https://siroved.hu",
              },
            ].map((div, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                {div.href ? (
                  <a
                    href={div.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.divisionCard}
                  >
                    <div className={styles.divisionName}>{div.name}</div>
                    <div className={styles.divisionArea}>{div.area}</div>
                    <p className={styles.divisionDesc}>{div.desc}</p>
                    <div className={styles.divisionLink}>
                      {div.href.replace("https://", "")} <ArrowRight size={14} />
                    </div>
                  </a>
                ) : (
                  <div className={styles.divisionCard}>
                    <div className={styles.divisionName}>{div.name}</div>
                    <div className={styles.divisionArea}>{div.area}</div>
                    <p className={styles.divisionDesc}>{div.desc}</p>
                  </div>
                )}
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. AHOGYAN EGYÜTT DOLGOZUNK ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "MŰKÖDÉS" : "HOW IT WORKS"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Ahogyan együtt dolgozunk" : "How we work together"}
              </h2>
            </div>
          </SectionReveal>
          <div className={styles.pointGrid}>
            {[
              {
                title: isHu ? "Óra-keretben vagy projektre" : "Hour frame or project",
                text: isHu
                  ? "Havi óra-keret előre egyeztetett óraszámmal, vagy projektalapú elszámolás — amelyik jobban illeszkedik."
                  : "A monthly hour frame with a pre-agreed number of hours, or project-based billing — whichever fits better.",
              },
              {
                title: isHu ? "Az Önök ütemezéséhez igazodunk" : "We align to your schedule",
                text: isHu
                  ? "Karbantartási ablakok, változáskezelési rend, üzemidőn kívüli munka — ahogy az Önök működése megkívánja."
                  : "Maintenance windows, change management procedures, out-of-hours work — as your operations require.",
              },
              {
                title: isHu ? "Felkészültünk a kapacitásbővítésre" : "Prepared for capacity scaling",
                text: isHu
                  ? "Ha egy feladat több embert kíván, mint amennyit a saját csapatunk ad, bevont szakemberekkel bővítünk. A vállalt határidő ettől nem csúszik."
                  : "If a task requires more people than our own team provides, we scale with additional specialists. The agreed deadline does not slip.",
              },
              {
                title: isHu ? "Dokumentált munka" : "Documented work",
                text: isHu
                  ? "Amit csinálunk, azt leírjuk — az Önök sablonjaival, ha van ilyen. Nem marad tudás egyetlen ember fejében."
                  : "Everything we do is written down — using your templates if you have them. No knowledge stays in one person's head.",
              },
              {
                title: isHu ? "Ha az Önök arculatában kell dolgoznunk" : "White-label if needed",
                text: isHu
                  ? "Van, aki azt kéri, hogy az ügyfele felé az ő csapataként jelenjünk meg. Ezt is vállaljuk, ha erre van szükség."
                  : "Some partners ask us to appear as their team to their client. We take that on too, if needed.",
              },
            ].map((point, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className={styles.pointCard}>
                  <h3 className={styles.pointCardTitle}>{point.title}</h3>
                  <p className={styles.pointCardText}>{point.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. LEFEDETTSÉG ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "HOL DOLGOZUNK" : "WHERE WE WORK"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Helyszíni és távoli munka" : "On-site and remote work"}
              </h2>
            </div>
          </SectionReveal>
          <div className={styles.coverageGrid}>
            <div className={styles.coverageCard}>
              <h3 className={styles.coverageTitle}>
                {isHu ? "Helyszíni kivitelezés" : "On-site deployment"}
              </h3>
              <p className={styles.coverageText}>
                {isHu
                  ? "Fejér megye, Budapest, Közép-Dunántúl"
                  : "Fejér County, Budapest, Central Transdanubia"}
              </p>
            </div>
            <div className={styles.coverageCard}>
              <h3 className={styles.coverageTitle}>
                {isHu ? "Távoli üzemeltetés és támogatás" : "Remote operations and support"}
              </h3>
              <p className={styles.coverageText}>
                {isHu ? "Országosan" : "Nationwide"}
              </p>
            </div>
          </div>
          <p className={styles.coverageNote}>
            {isHu
              ? "A távoli munka nem korlátozódik a fenti régióra — szerver- és felhőüzemeltetést, valamint távoli támogatást országosan vállalunk."
              : "Remote work is not limited to the above regions — server and cloud operations as well as remote support are available nationwide."}
          </p>
        </div>
      </section>

      {/* ─── 8. REFERENCIÁK (conditional) ───────────────────────────── */}
      {b2bPartners.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionReveal>
              <div className={styles.sectionHeader}>
                <span className={styles.eyebrow}>
                  {isHu ? "EGYÜTTMŰKÖDÉSEINK" : "OUR PARTNERSHIPS"}
                </span>
                <h2 className={styles.sectionTitle}>
                  {isHu ? "Akikkel már dolgozunk" : "Partners we already work with"}
                </h2>
              </div>
            </SectionReveal>
            <div className={styles.cardGrid2}>
              {b2bPartners.map((partner, i) => (
                <SectionReveal key={i} delay={i * 0.07}>
                  <div className={styles.targetCard}>
                    <h3 className={styles.targetCardTitle}>{partner.name}</h3>
                    <p className={styles.targetCardText}>{partner.type[lang]}</p>
                    {partner.quote && (
                      <p className={styles.targetCardText} style={{ fontStyle: "italic", marginTop: "0.75rem" }}>
                        &ldquo;{partner.quote[lang]}&rdquo;
                      </p>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 9. GYIK ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>
                {isHu ? "GYIK" : "FAQ"}
              </span>
              <h2 className={styles.sectionTitle}>
                {isHu ? "Gyakori kérdések" : "Frequently asked questions"}
              </h2>
            </div>
          </SectionReveal>
          <div className={styles.faqList}>
            {[
              {
                q: isHu
                  ? "Milyen technológiákban vállalnak delegált feladatot?"
                  : "What technologies do you cover for delegated tasks?",
                a: isHu
                  ? "Elsősorban Microsoft-környezetben: Windows Server, Active Directory, Entra ID, Microsoft 365, Azure és Hyper-V — on-premise és felhős környezetben egyaránt. Emellett VMware és Linux szerverek üzemeltetését, valamint hálózati kivitelezést is vállalunk."
                  : "Primarily in Microsoft environments: Windows Server, Active Directory, Entra ID, Microsoft 365, Azure and Hyper-V — both on-premise and cloud. We also cover VMware and Linux server operations, as well as network deployment.",
              },
              {
                q: isHu
                  ? "Hol vállalnak helyszíni munkát?"
                  : "Where do you take on on-site work?",
                a: isHu
                  ? "Helyszíni kivitelezést Fejér megyében, Budapesten és a Közép-Dunántúlon vállalunk. Távoli üzemeltetést és támogatást országosan."
                  : "On-site work in Fejér County, Budapest and Central Transdanubia. Remote operations and support nationwide.",
              },
              {
                q: isHu
                  ? "Hogyan számoltok el — óradíjban vagy projektre?"
                  : "How do you bill — hourly or per project?",
                a: isHu
                  ? "Mindkettő működik. Havi óra-keret előre egyeztetett óraszámmal, vagy projektalapú elszámolás — attól függően, melyik illeszkedik jobban a feladathoz."
                  : "Both work. A monthly hour frame with a pre-agreed number of hours, or project-based billing — depending on which fits better.",
              },
              {
                q: isHu
                  ? "Mi történik, ha egy projekt több embert igényel?"
                  : "What if a project requires more people?",
                a: isHu
                  ? "Felkészültünk a kapacitásbővítésre. Ha egy feladat több szakembert kíván, bevont kollégákkal bővítünk — a vállalt határidő ettől nem csúszik."
                  : "We are prepared for capacity scaling. If a task requires more specialists, we bring in additional colleagues — the agreed deadline does not slip.",
              },
              {
                q: isHu
                  ? "A mi ticketrendszerünkben tudnak dolgozni?"
                  : "Can you work in our ticketing system?",
                a: isHu
                  ? "Igen. Az Önök folyamatai szerint dolgozunk: a ticketrendszerükben, a dokumentációs sablonjaikkal, a változáskezelési rendjük szerint."
                  : "Yes. We work according to your processes: in your ticketing system, with your documentation templates, following your change management procedures.",
              },
              {
                q: isHu
                  ? "Megkeresik később a mi ügyfelünket?"
                  : "Will you approach our client later?",
                a: isHu
                  ? "Nem. Az Önök ügyfele az Önöké marad."
                  : "No. Your client remains yours.",
              },
            ].map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. ZÁRÓ CTA + KAPCSOLAT ────────────────────────────────── */}
      <section className="section" id="kapcsolat">
        <div className="container">
          <SectionReveal>
            <div className={styles.closingSection}>
              {/* Ügyfélvédelmi mondat — egy sor, a CTA fölött */}
              <p className={styles.privacyNote}>
                {isHu
                  ? "És ami talán a legfontosabb: az Önök ügyfele az Önöké marad. Nem keressük meg, nem ajánlkozunk náluk."
                  : "And perhaps most importantly: your client remains yours. We do not approach them, we do not pitch to them."}
              </p>

              <h2 className={styles.closingTitle}>
                {isHu ? "Beszéljünk" : "Let's talk"}
              </h2>
              <p className={styles.closingLead}>
                {isHu
                  ? "Akkor is, ha most nincs aktuális feladat. Egy bejáratott partneri kapcsolat általában akkor ér a legtöbbet, amikor már megvan, mielőtt szükség lenne rá."
                  : "Even if there is no immediate task. An established partnership is usually worth the most when it already exists before it is needed."}
              </p>

              <div className={styles.contactBlock}>
                <div className={styles.contactName}>Skoda Dávid</div>
                <div className={styles.contactRole}>
                  {isHu ? "ügyvezető, SIROTECH Kft." : "Managing Director, SIROTECH Kft."}
                </div>
                <a href="mailto:skoda.david@sironic.hu" className={styles.contactRow}>
                  <Mail size={16} className={styles.contactIcon} />
                  skoda.david@sironic.hu
                </a>
                <a href="tel:+36702735532" className={styles.contactRow}>
                  <Phone size={16} className={styles.contactIcon} />
                  +36 70 273 5532
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── AI-SEO — entitás megnevezés ─────────────────────────────── */}
      <div style={{ display: "none" }} aria-hidden="true">
        A SIRONIC a SIROTECH Informatikai és Biztonságtechnikai Kft. informatikai divíziója.
      </div>
    </>
  );
}
