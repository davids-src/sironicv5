import { getTranslations } from "next-intl/server";
import HeroSlider from "@/components/ui/HeroSlider";
import FreeAssessmentSection from "@/components/sections/FreeAssessmentSection";
import ServiceSection from "@/components/sections/ServiceSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBlock from "@/components/ui/CtaBlock";
import PricingHighlight from "@/components/sections/PricingHighlight";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `https://sironic.eu/${locale}`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const ts = await getTranslations({ locale, namespace: "services" });
  const tf = await getTranslations({ locale, namespace: "faq" });
  const tp = await getTranslations({ locale, namespace: "pricingHighlight" });

  const freeAssessmentHref = `/${locale}/kapcsolat?forras=ingyenes-felmeres`;
  const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;
  const servicesHref = `/${locale}/szolgaltatasok`;

  const slides = [
    {
      badge: t("slide1.badge"),
      title: t("slide1.title"),
      subtitle: t("slide1.subtitle"),
      cta1: {
        label: locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free IT Assessment",
        href: freeAssessmentHref,
      },
      cta2: { label: t("slide1.cta2"), href: servicesHref },
    },
    {
      badge: t("slide2.badge"),
      title: t("slide2.title"),
      subtitle: t("slide2.subtitle"),
      cta1: {
        label: locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free IT Assessment",
        href: freeAssessmentHref,
      },
      cta2: { label: t("slide2.cta2"), href: servicesHref },
    },
  ];

  const faqItems = tf.raw("items") as Array<{ q: string; a: string }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SIRONIC – IT Üzemeltetés és Hálózatépítés",
    url: "https://sironic.eu",
    logo: "https://sironic.eu/logo.png",
    description:
      locale === "hu"
        ? "Ingyenes informatikai és biztonsági állapotfelmérés, IT üzemeltetés, hálózatépítés és NIS2 támogatás KKV-knak Székesfehérváron, Fejér megyében és országosan."
        : "Free IT system assessment, IT operations, network building and NIS2 support for SMBs in Székesfehérvár, Fejér County and nationwide.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lövölde utca 24 4/15",
      addressLocality: "Székesfehérvár",
      addressRegion: "Fejér megye",
      postalCode: "8000",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.1883",
      longitude: "18.4133",
    },
    telephone: "+36-70-273-5532",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Szolgáltatások & Felmérés",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ingyenes Informatikai Állapotfelmérés",
            description: "Eszközpark, szoftverek, hálózati és informatikai biztonsági rések és NIS2-kockázatok ingyenes feltérképezése.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Slider */}
      <HeroSlider slides={slides} />

      {/* 2. Primary Offer: Free Assessment Section (Full Variant) */}
      <FreeAssessmentSection locale={locale} variant="full" />

      {/* 3. Secondary Tool: Pricing Highlight – Intelligent Calculator */}
      <PricingHighlight
        locale={locale}
        badge={tp("badge")}
        headline={tp("headline")}
        subheadline={tp("subheadline")}
        stepsTitle={tp("stepsTitle")}
        steps={tp.raw("steps") as { step: number; text: string }[]}
        ctaPrimaryLabel={tp("ctaPrimary")}
        ctaPrimaryHref={smartFormHref}
        trustNote={tp("trustNote")}
      />

      {/* 4. IT Operations Service */}
      <ServiceSection
        id="it-uzemeltetes"
        badge={ts("itOps.badge")}
        title={ts("itOps.title")}
        subtitle={ts("itOps.subtitle")}
        description={ts("itOps.description")}
        points={ts.raw("itOps.points") as string[]}
        cta1={{ label: locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free Assessment", href: freeAssessmentHref }}
        cta2={{ label: ts("itOps.cta2"), href: `/${locale}/szolgaltatasok#it-uzemeltetes` }}
        icon="server"
        alt
      />

      {/* 5. Network Building Service */}
      <ServiceSection
        id="halozatepites"
        badge={ts("network.badge")}
        title={ts("network.title")}
        subtitle={ts("network.subtitle")}
        description={ts("network.description")}
        points={ts.raw("network.points") as string[]}
        cta1={{ label: locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free Assessment", href: freeAssessmentHref }}
        cta2={{ label: ts("network.cta"), href: `/${locale}/szolgaltatasok#halozatepites` }}
        icon="network"
      />

      {/* 6. NIS2 Compliance */}
      <ServiceSection
        id="nis2"
        badge={ts("nis2.badge")}
        title={ts("nis2.title")}
        subtitle={ts("nis2.subtitle")}
        description={ts("nis2.description")}
        points={ts.raw("nis2.points") as string[]}
        cta1={{ label: locale === "hu" ? "NIS2 Állapotfelmérés" : "NIS2 Assessment", href: freeAssessmentHref }}
        cta2={{ label: ts("nis2.cta"), href: `/${locale}/szolgaltatasok#nis2` }}
        icon="shield"
        alt
      />

      {/* NIS2 Specific Assessment Banner */}
      <FreeAssessmentSection locale={locale} variant="nis2" />

      {/* 7. Mid-page CTA */}
      <CtaBlock
        title={locale === "hu" ? "Kérje díjmentes informatikai felmérésünket" : "Request a free IT system assessment"}
        subtitle={
          locale === "hu"
            ? "Tudja meg pontosan, milyen biztonsági és működési kockázatok rejlenek meglévő rendszerében – kötelezettségek nélkül."
            : "Discover exact security and operational risks hidden in your existing systems – risk-free."
        }
        cta1={{ label: locale === "hu" ? "Ingyenes Felmérés Kérése" : "Get Free Assessment", href: freeAssessmentHref }}
        cta2={{ label: locale === "hu" ? "Intelligens Kalkulátor" : "Price Calculator", href: smartFormHref }}
      />

      {/* 8. FAQ */}
      <FaqSection
        title={tf("title")}
        subtitle={tf("subtitle")}
        items={faqItems}
      />
    </>
  );
}
