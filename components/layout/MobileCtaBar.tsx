"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ShieldCheck, Phone } from "lucide-react";

/**
 * Sticky bottom CTA bar – visible only on mobile (≤1023px via CSS).
 * Promotes the primary lead generator: Free IT Assessment.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const locale = useLocale();

  const assessmentHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres`;

  // Hide the bar when already on the contact/assessment form page
  const isContact = pathname.includes("kapcsolat") || pathname.includes("contact");

  if (isContact) return null;

  return (
    <div className="mobileCtaBar">
      <Link href={assessmentHref} className="ctaPrimary">
        <ShieldCheck size={16} />
        {locale === "hu" ? "Ingyenes Felmérés" : "Free Assessment"}
      </Link>
      <a href="tel:+36702735532" className="ctaSecondary">
        <Phone size={16} />
        {locale === "hu" ? "Hívás" : "Call"}
      </a>
    </div>
  );
}
