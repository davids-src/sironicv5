import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle"), description: t("aboutDescription") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Cégünkről" : "Our Company"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <SectionReveal>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2">{t("story")}</h2>
                <p className="body-lg" style={{ marginTop: "1rem" }}>{t("storyContent")}</p>
                <div className={styles.placeholder}>
                  <p>{locale === "hu" ? "📝 Részletes cégtörténet hamarosan – az ügyfél által megadott tartalom alapján." : "📝 Detailed company story coming soon – based on client-provided content."}</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2">{t("values")}</h2>
                <ul className={styles.valueList}>
                  {(t.raw("valueItems") as string[]).map((v, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className={styles.check} />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="section section-alt">
        <div className="container">
          <SectionReveal>
            <h2 className="heading-1 section-title">{locale === "hu" ? "Csapatunk" : "Our Team"}</h2>
            <p className="section-subtitle">
              {locale === "hu" ? "Csapatbemutató hamarosan." : "Team introduction coming soon."}
            </p>
            <div className={styles.teamGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.teamCard}>
                  <div className={styles.avatar} />
                  <div className={styles.teamInfo}>
                    <div className={styles.namePlaceholder} />
                    <div className={styles.rolePlaceholder} />
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
