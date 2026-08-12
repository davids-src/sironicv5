import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactFormClient from "./ContactFormClient";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ forras?: string; source?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("contactTitle"), description: t("contactDescription") };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale, namespace: "contact" });

  const initialInquiryType =
    resolvedSearchParams?.forras === "general" ||
    resolvedSearchParams?.source === "general"
      ? "general"
      : "free-assessment";

  const messages = {
    formTitle: t("formTitle"),
    name: t("name"),
    email: t("emailField"),
    phone: t("phoneField"),
    message: t("message"),
    submit: t("submit"),
    success: t("success"),
    namePlaceholder: t("namePlaceholder"),
    emailPlaceholder: t("emailPlaceholder"),
    phonePlaceholder: t("phonePlaceholder"),
    messagePlaceholder: t("messagePlaceholder"),
    inquiryTypeLabel: t("inquiryTypeLabel"),
    inquiryTypeAssessment: t("inquiryTypeAssessment"),
    inquiryTypeGeneral: t("inquiryTypeGeneral"),
    companySizeLabel: t("companySizeLabel"),
    companySizePlaceholder: t("companySizePlaceholder"),
    companySizeOptions: t.raw("companySizeOptions"),
    hasExternalITLabel: t("hasExternalITLabel"),
    hasExternalITPlaceholder: t("hasExternalITPlaceholder"),
    hasExternalITOptions: t.raw("hasExternalITOptions"),
    trustBadge: t("trustBadge"),
  };

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">
              <ShieldCheck size={14} style={{ marginRight: 6, display: "inline" }} />
              {locale === "hu" ? "Kapcsolatfelvétel & Állapotfelmérés" : "Contact & Free IT Assessment"}
            </span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 580 }}>{t("subtitle")}</p>
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
                      <strong>SIROTECH Kft.</strong>
                      <p>{locale === "hu" ? "Adószám: 33056151-2-07" : "Tax number: 33056151-2-07"}</p>
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

                {/* Trust guarantee card */}
                <div style={{
                  marginTop: "2rem",
                  background: "var(--surface)",
                  border: "1px solid var(--accent-40)",
                  borderRadius: "var(--r-card-sm)",
                  padding: "1.25rem",
                }}>
                  <h4 style={{ fontFamily: "var(--font-display)", color: "var(--ink)", fontSize: "1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <ShieldCheck size={18} color="var(--accent)" />
                    {locale === "hu" ? "Az ingyenes állapotfelmérésről" : "About the Free Assessment"}
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.5, margin: 0 }}>
                    {locale === "hu"
                      ? "A fél napos helyszíni felmérés díjmentes és kötelezettségmentes. Egy héten belül írásos összefoglalót, a feltárt kockázati pontok listáját és árazott javaslatot kap — a döntés ezután az Öné."
                      : "The half-day on-site assessment is free and without obligation. Within one week you receive a written summary, a list of identified risks and a priced proposal — the decision is then yours."}
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Form panel */}
            <SectionReveal delay={0.1}>
              <div className="card">
                <span className="accent-line" />
                <h2 className="heading-2" style={{ marginBottom: "1.5rem" }}>{messages.formTitle}</h2>
                <ContactFormClient messages={messages} initialInquiryType={initialInquiryType} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
