import { getTranslations } from "next-intl/server";
import {
  Server, Network, ShieldCheck, Wrench,
  CheckCircle2, ArrowRight
} from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("servicesTitle"), description: t("servicesDescription") };
}

const serviceIcons = [
  { key: "itOps", icon: <Server size={32} /> },
  { key: "network", icon: <Network size={32} /> },
  { key: "nis2", icon: <ShieldCheck size={32} /> },
  { key: "repair", icon: <Wrench size={32} /> },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "hu" ? "SIRONIC Szolgáltatások" : "SIRONIC Services",
    itemListElement: [
      "IT Operations", "Network Building", "NIS2 Support", "Repair"
    ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Page Header */}
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Teljes portfólió" : "Full portfolio"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("sectionTitle")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("sectionSubtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* IT Operations */}
      <section id="it-uzemeltetés" className="section" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={styles.serviceCard}>
              <div className={styles.cardIcon}><Server size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("itOps.badge")}</span>
                <h2 className="heading-1">{t("itOps.title")}</h2>
                <p className={styles.cardSubtitle}>{t("itOps.subtitle")}</p>
                <p className="body-lg">{t("itOps.description")}</p>
                <ul className={styles.points}>
                  {(t.raw("itOps.points") as string[]).map((p, i) => (
                    <li key={i}><CheckCircle2 size={16} className={styles.check} />{p}</li>
                  ))}
                </ul>
                <div className={styles.cardCtas}>
                  <Link href={`/${locale}/szolgaltatasok/rendszeruzemeltetes`} className="btn btn-primary">
                    {locale === "hu" ? "További információ" : "Learn more"} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* Network */}
      <section id="halozatepites" className="section" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={`${styles.serviceCard} ${styles.reverse}`}>
              <div className={styles.cardIcon}><Network size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("network.badge")}</span>
                <h2 className="heading-1">{t("network.title")}</h2>
                <p className={styles.cardSubtitle}>{t("network.subtitle")}</p>
                <p className="body-lg">{t("network.description")}</p>
                <ul className={styles.points}>
                  {(t.raw("network.points") as string[]).map((p, i) => (
                    <li key={i}><CheckCircle2 size={16} className={styles.check} />{p}</li>
                  ))}
                </ul>
                <div className={styles.cardCtas}>
                  <Link href={`/${locale}/szolgaltatasok/halozatepites`} className="btn btn-primary">
                    {locale === "hu" ? "További információ" : "Learn more"} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* NIS2 */}
      <section id="nis2" className="section section-alt" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={styles.serviceCard}>
              <div className={styles.cardIcon}><ShieldCheck size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("nis2.badge")}</span>
                <h2 className="heading-1">{t("nis2.title")}</h2>
                <p className={styles.cardSubtitle}>{t("nis2.subtitle")}</p>
                <p className="body-lg">{t("nis2.description")}</p>
                <ul className={styles.points}>
                  {(t.raw("nis2.points") as string[]).map((p, i) => (
                    <li key={i}><CheckCircle2 size={16} className={styles.check} />{p}</li>
                  ))}
                </ul>
                <div className={styles.cardCtas}>
                  <Link href={`/${locale}/szolgaltatasok/nis2-tamogatas`} className="btn btn-primary">
                    {locale === "hu" ? "További információ" : "Learn more"} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Repair */}
      <section id="szerviz" className="section" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={`${styles.serviceCard} ${styles.reverse}`}>
              <div className={styles.cardIcon}><Wrench size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("repair.badge")}</span>
                <h2 className="heading-1">{t("repair.title")}</h2>
                <p className={styles.cardSubtitle}>{t("repair.subtitle")}</p>
                <p className="body-lg">{t("repair.description")}</p>
                <div className={styles.cardCtas}>
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-primary">{t("repair.cta")} <ArrowRight size={15} /></Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CtaBlock
        title={locale === "hu" ? "Nem találta amit keresett?" : "Didn't find what you need?"}
        subtitle={locale === "hu" ? "Vegye fel velünk a kapcsolatot – szívesen segítünk." : "Get in touch – we're happy to help."}
        cta1={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: `/${locale}/kapcsolat` }}
        cta2={{ label: locale === "hu" ? "Intelligens igényfelmérés" : "Smart Assessment", href: smartFormHref }}
      />
    </>
  );
}
