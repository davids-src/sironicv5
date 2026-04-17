import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactFormClient from "./ContactFormClient";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { MapPin, Phone, Mail } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("contactTitle"), description: t("contactDescription") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const messages = {
    formTitle: t("formTitle"),
    name: t("name"), email: t("emailField"), phone: t("phoneField"),
    message: t("message"), submit: t("submit"), success: t("success"),
    namePlaceholder: t("namePlaceholder"), emailPlaceholder: t("emailPlaceholder"),
    phonePlaceholder: t("phonePlaceholder"), messagePlaceholder: t("messagePlaceholder"),
  };

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Kapcsolatfelvétel" : "Get in Touch"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className={styles.grid}>
            {/* Info panel */}
            <SectionReveal className={styles.info}>
              <div className="card" style={{ height: "100%" }}>
                <span className="accent-line" />
                <h2 className="heading-2" style={{ marginBottom: "2rem" }}>
                  {locale === "hu" ? "Elérhetőségeink" : "Our Details"}
                </h2>
                <ul className={styles.infoList}>
                  <li>
                    <div className="icon-box"><MapPin size={20} /></div>
                    <div>
                      <strong>{t("address")}</strong>
                      <p>8000 Székesfehérvár, Lövölde utca 24 4/15</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon-box"><Mail size={20} /></div>
                    <div>
                      <strong>{t("email")}</strong>
                      <a href="mailto:hello@sironic.hu" className={styles.infoLink}>hello@sironic.hu</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon-box"><Phone size={20} /></div>
                    <div>
                      <strong>{t("phone")}</strong>
                      <a href="tel:+36702735532" className={styles.infoLink}>+36 70 273 5532</a>
                    </div>
                  </li>
                </ul>

                {/* Map placeholder */}
                <div className={styles.mapPlaceholder}>
                  <span>🗺️</span>
                  <p>{locale === "hu" ? "Térkép hamarosan" : "Map coming soon"}</p>
                </div>
              </div>
            </SectionReveal>

            {/* Form panel */}
            <SectionReveal delay={0.1}>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2" style={{ marginBottom: "1.5rem" }}>{messages.formTitle}</h2>
                <ContactFormClient messages={messages} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
