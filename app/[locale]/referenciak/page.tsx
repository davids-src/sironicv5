import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("referencesTitle"), description: t("referencesDescription") };
}

const categories = ["all", "websites", "systems", "tools"] as const;

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "references" });

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
          {/* Filter tabs */}
          <SectionReveal>
            <div className={styles.filterBar} role="tablist">
              {categories.map((cat) => (
                <button key={cat} className={`${styles.filterBtn} ${cat === "all" ? styles.active : ""}`} role="tab">
                  {t(`filter.${cat}`)}
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Empty state / Coming soon */}
          <SectionReveal delay={0.1}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📁</div>
              <h2 className="heading-2">{t("comingSoon")}</h2>
              <p className="body-lg" style={{ textAlign: "center", maxWidth: 400 }}>
                {locale === "hu"
                  ? "A referencia-portfólió feltöltés alatt – hamarosan megjelennek projektjeink."
                  : "The reference portfolio is being uploaded – our projects will appear soon."}
              </p>
            </div>
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
