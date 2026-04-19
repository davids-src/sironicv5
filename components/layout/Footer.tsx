import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink, Zap, Mail, Phone, MapPin, Hash } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  const serviceLinks = [
    { label: nav("services"), href: `/${locale}/szolgaltatasok` },
    { label: nav("partners"), href: `/${locale}/partnereink` },
    { label: nav("references"), href: `/${locale}/referenciak` },
  ];
  const companyLinks = [
    { label: nav("about"), href: `/${locale}/rolunk` },
    { label: nav("contact"), href: `/${locale}/kapcsolat` },
    { label: nav("smartForm"), href: `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}` },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <Link href={`/${locale}`} className={styles.logo}>SIRONIC</Link>
          <p className={styles.tagline}>{t("tagline")}</p>
          <a
            href="https://siroved.hu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sirovedLink}
          >
            <span>{t("sirovedLabel")}</span>
            <strong>SIRO-VÉD</strong>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t("services")}</h3>
          <ul className={styles.linkList}>
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company nav */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t("company")}</h3>
          <ul className={styles.linkList}>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Smart Form CTA */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{nav("smartForm")}</h3>
          <p className={styles.ctaText}>
            {locale === "hu"
              ? "Kapjon hozzávetőleges árbecslést online – még ma."
              : "Get an approximate price estimate online – today."}
          </p>
          <Link
            href={`/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`}
            className={styles.footerCta}
          >
            <Zap size={15} />
            {nav("smartForm")}
          </Link>
        </div>

        {/* Company / Legal info */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{locale === "hu" ? "Céginformáció" : "Company Info"}</h3>
          <ul className={styles.infoList}>
            <li>
              <span className={styles.infoLabel}>Skoda Dávid András</span>
              <span className={styles.infoValue}>{locale === "hu" ? "Egyéni Vállalkozó" : "Sole Trader"}</span>
            </li>
            <li className={styles.infoRow}>
              <MapPin size={13} className={styles.infoIcon} />
              <span className={styles.infoValue}>8000 Székesfehérvár,<br />Lövölde utca 24 4/15</span>
            </li>
            <li className={styles.infoRow}>
              <Hash size={13} className={styles.infoIcon} />
              <span className={styles.infoValue}>45755754-2-27</span>
            </li>
            <li className={styles.infoRow}>
              <Mail size={13} className={styles.infoIcon} />
              <a href="mailto:hello@sironic.hu" className={styles.infoLink}>hello@sironic.hu</a>
            </li>
            <li className={styles.infoRow}>
              <Phone size={13} className={styles.infoIcon} />
              <a href="tel:+36702735532" className={styles.infoLink}>+36 70 273 5532</a>
            </li>
          </ul>
        </div>

      </div>

      <div className={`container ${styles.bottom}`}>
        <span className={styles.copyright}>{t("copyright")}</span>
        <div className={styles.legalLinks}>
          <span className={styles.legal}>{t("legal")}:</span>
          <a href="/SIRONIC_Adatkezelesi_Tajekoztato.pdf" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>{t("privacyPolicy")}</a>
          <Link href={`/${locale}/impresszum`} className={styles.legalLink}>{t("imprint")}</Link>
        </div>
      </div>
    </footer>
  );
}
