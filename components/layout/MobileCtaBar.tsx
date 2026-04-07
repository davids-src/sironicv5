"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Zap, Phone } from "lucide-react";

/**
 * Sticky bottom CTA bar – visible only on mobile (≤1023px via CSS).
 * Hidden on the smartForm page itself (no need to promote what you're already on).
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const locale = useLocale();

  const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;
  const contactHref = `/${locale}/${locale === "hu" ? "kapcsolat" : "contact"}`;

  // Hide the bar when already on the smart form page
  const isSmartForm =
    pathname.includes("intelligens-urlap") ||
    pathname.includes("intelligent-form");

  if (isSmartForm) return null;

  return (
    <div className="mobileCtaBar">
      <Link href={smartFormHref} className="ctaPrimary">
        <Zap size={16} />
        {locale === "hu" ? "Díjkalkuláció" : "Get a Quote"}
      </Link>
      <Link href={contactHref} className="ctaSecondary">
        <Phone size={16} />
        {locale === "hu" ? "Kapcsolat" : "Contact"}
      </Link>
    </div>
  );
}
