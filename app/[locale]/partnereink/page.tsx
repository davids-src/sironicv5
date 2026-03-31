import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("partnersTitle"), description: t("partnersDescription") };
}

const partnerSections = [
  { key: "ourPartners", count: 6 },
  { key: "suppliers", count: 4 },
  { key: "techPartners", count: 5 },
];

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Együttműködők" : "Collaborators"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* Partner sections */}
      {partnerSections.map(({ key, count }, si) => (
        <section key={key} className={`section ${si % 2 !== 0 ? "section-alt" : ""}`}>
          <div className="container">
            <SectionReveal>
              <h2 className={`heading-1 ${styles.sectionTitle}`}>
                {key === "ourPartners" ? t("ourPartners") : key === "suppliers" ? t("suppliers") : t("techPartners")}
              </h2>
              <div className={styles.logoGrid}>
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className={styles.logoSlot}>
                    <span className={styles.logoPlaceholder}>{locale === "hu" ? "Partner logó" : "Partner logo"}</span>
                  </div>
                ))}
              </div>
              <p className={styles.comingSoon}>{t("comingSoon")}</p>
            </SectionReveal>
          </div>
        </section>
      ))}

      <CtaBlock
        title={locale === "hu" ? "Érdekli a partnerség?" : "Interested in partnership?"}
        subtitle={locale === "hu" ? "Vegye fel velünk a kapcsolatot." : "Get in touch with us."}
        cta1={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: `/${locale}/kapcsolat` }}
      />
    </>
  );
}
