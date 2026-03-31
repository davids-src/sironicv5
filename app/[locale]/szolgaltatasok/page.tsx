import { getTranslations } from "next-intl/server";
import {
  Server, Network, ShieldCheck, Code2, Camera, Wrench,
  CheckCircle2, ExternalLink, ArrowRight
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
  { key: "webDev", icon: <Code2 size={32} /> },
  { key: "security", icon: <Camera size={32} /> },
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
      "IT Operations", "Network Building", "NIS2 Support",
      "Web & System Development", "Security Technology", "Repair"
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
                  <Link href={smartFormHref} className="btn btn-primary">{t("itOps.cta1")} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-outline">{t("itOps.cta2")} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/szolgaltatasok/rendszeruzemeltetés`} className="btn btn-ghost">
                    {locale === "hu" ? "Részletes oldal" : "Full details"} <ArrowRight size={14} />
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
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-primary">{t("network.cta")} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/szolgaltatasok/halozatepites`} className="btn btn-ghost">
                    {locale === "hu" ? "Részletes oldal" : "Full details"} <ArrowRight size={14} />
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
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-primary">{t("nis2.cta")} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/szolgaltatasok/nis2-tamogatas`} className="btn btn-ghost">
                    {locale === "hu" ? "Részletes oldal" : "Full details"} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* Web Dev */}
      <section id="fejlesztes" className="section" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={`${styles.serviceCard} ${styles.reverse}`}>
              <div className={styles.cardIcon}><Code2 size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("webDev.badge")}</span>
                <h2 className="heading-1">{t("webDev.title")}</h2>
                <p className={styles.cardSubtitle}>{t("webDev.subtitle")}</p>
                <p className="body-lg">{t("webDev.description")}</p>
                <ul className={styles.points}>
                  {(t.raw("webDev.points") as string[]).map((p, i) => (
                    <li key={i}><CheckCircle2 size={16} className={styles.check} />{p}</li>
                  ))}
                </ul>
                <div className={styles.cardCtas}>
                  <Link href={`/${locale}/referenciak`} className="btn btn-primary">{t("webDev.cta")} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/kapcsolat`} className="btn btn-outline">{locale === "hu" ? "Ajánlatkérés" : "Get a Quote"} <ArrowRight size={15} /></Link>
                  <Link href={`/${locale}/szolgaltatasok/webfejlesztes`} className="btn btn-ghost">
                    {locale === "hu" ? "Részletes oldal" : "Full details"} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* Security */}
      <section id="biztonságtechnika" className="section section-alt" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <SectionReveal>
            <div className={styles.serviceCard}>
              <div className={styles.cardIcon}><Camera size={32} /></div>
              <div className={styles.cardContent}>
                <span className="badge">{t("security.badge")}</span>
                <h2 className="heading-1">{t("security.title")}</h2>
                <p className={styles.cardSubtitle}>{t("security.subtitle")}</p>
                <p className="body-lg">{t("security.description")}</p>
                <div className={styles.cardCtas}>
                  <a href="https://siroved.hu" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {t("security.cta")} <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="divider container" />

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
