"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Sun, Moon, Menu, X, ExternalLink, Zap } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const otherLocale = locale === "hu" ? "en" : "hu";
  // Swap the locale prefix in the pathname
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/szolgaltatasok`, label: t("services"), huPath: "/szolgaltatasok", enPath: "/services" },
    { href: `/${locale}/partnereink`, label: t("partners"), huPath: "/partnereink", enPath: "/partners" },
    { href: `/${locale}/referenciak`, label: t("references"), huPath: "/referenciak", enPath: "/references" },
    { href: `/${locale}/rolunk`, label: t("about"), huPath: "/rolunk", enPath: "/about" },
    { href: `/${locale}/kapcsolat`, label: t("contact"), huPath: "/kapcsolat", enPath: "/contact" },
  ];

  const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Ugrás a tartalomhoz
      </a>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo} aria-label="SIRONIC – Főoldal">
            <span className={styles.logoText}>SIRONIC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Főnavigáció">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Smart Form CTA – highlighted */}
            <Link href={smartFormHref} className={`${styles.smartFormBtn}`}>
              <Zap size={15} />
              {t("smartForm")}
            </Link>

            {/* Language Toggle */}
            <Link
              href={otherLocalePath}
              className={styles.langToggle}
              aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={styles.iconBtn}
              aria-label={theme === "dark" ? "Világos mód" : "Sötét mód"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Hamburger */}
            <button
              className={`${styles.iconBtn} hide-desktop`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className={styles.mobileDrawer} role="dialog" aria-label="Mobilnavigáció">
            <nav className={styles.mobileNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={smartFormHref} className={styles.mobileSmartFormBtn}>
                <Zap size={16} />
                {t("smartForm")}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
