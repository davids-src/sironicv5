import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import HeroSlider from "@/components/ui/HeroSlider";
import ServiceSection from "@/components/sections/ServiceSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBlock from "@/components/ui/CtaBlock";
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

  const smartFormHref = `/${locale}/${locale === "hu" ? "intelligens-urlap" : "intelligent-form"}`;
  const servicesHref = `/${locale}/szolgaltatasok`;

  const slides = [
    {
      badge: t("slide1.badge"),
      title: t("slide1.title"),
      subtitle: t("slide1.subtitle"),
      cta1: { label: t("slide1.cta1"), href: smartFormHref },
      cta2: { label: t("slide1.cta2"), href: servicesHref },
    },
    {
      badge: t("slide2.badge"),
      title: t("slide2.title"),
      subtitle: t("slide2.subtitle"),
      cta1: { label: t("slide2.cta1"), href: servicesHref },
      cta2: { label: t("slide2.cta2"), href: "https://siroved.hu", external: true },
    },
    {
      badge: t("slide3.badge"),
      title: t("slide3.title"),
      subtitle: t("slide3.subtitle"),
      cta1: { label: t("slide3.cta1"), href: smartFormHref },
      cta2: { label: t("slide3.cta2"), href: smartFormHref },
    },
  ];

  const faqItems = (tf.raw("items") as Array<{ q: string; a: string }>);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SIRONIC",
    url: "https://sironic.eu",
    logo: "https://sironic.eu/logo.png",
    description: locale === "hu"
      ? "Modern IT-megoldások, egyedi fejlesztés, hálózatépítés és NIS2-támogatás vállalkozások számára."
      : "Modern IT solutions, custom development, network infrastructure and NIS2 support for businesses.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HU",
    },
    sameAs: ["https://siroved.hu"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Slider */}
      <HeroSlider slides={slides} />

      {/* 2. IT Operations */}
      <ServiceSection
        id="it-uzemeltetés"
        badge={ts("itOps.badge")}
        title={ts("itOps.title")}
        subtitle={ts("itOps.subtitle")}
        description={ts("itOps.description")}
        points={ts.raw("itOps.points") as string[]}
        cta1={{ label: ts("itOps.cta1"), href: smartFormHref }}
        cta2={{ label: ts("itOps.cta2"), href: `/${locale}/szolgaltatasok#it-uzemeltetés` }}
        icon="server"
        alt
      />

      {/* 3. Network */}
      <ServiceSection
        id="halozatepites"
        badge={ts("network.badge")}
        title={ts("network.title")}
        subtitle={ts("network.subtitle")}
        description={ts("network.description")}
        points={ts.raw("network.points") as string[]}
        cta2={{ label: ts("network.cta"), href: `/${locale}/szolgaltatasok#halozatepites` }}
        icon="network"
      />

      {/* 4. NIS2 */}
      <ServiceSection
        id="nis2"
        badge={ts("nis2.badge")}
        title={ts("nis2.title")}
        subtitle={ts("nis2.subtitle")}
        description={ts("nis2.description")}
        points={ts.raw("nis2.points") as string[]}
        cta2={{ label: ts("nis2.cta"), href: `/${locale}/szolgaltatasok#nis2` }}
        icon="shield"
        alt
      />

      {/* 5. Web Development */}
      <ServiceSection
        id="fejlesztes"
        badge={ts("webDev.badge")}
        title={ts("webDev.title")}
        subtitle={ts("webDev.subtitle")}
        description={ts("webDev.description")}
        points={ts.raw("webDev.points") as string[]}
        cta2={{ label: ts("webDev.cta"), href: `/${locale}/referenciak` }}
        icon="code"
      />

      {/* 6. Security Technology */}
      <ServiceSection
        id="biztonságtechnika"
        badge={ts("security.badge")}
        title={ts("security.title")}
        subtitle={ts("security.subtitle")}
        description={ts("security.description")}
        cta1={{ label: ts("security.cta"), href: "https://siroved.hu", external: true }}
        icon="camera"
        alt
      />

      {/* 7. Mid-page CTA */}
      <CtaBlock
        title={locale === "hu" ? "Tudja meg, mennyibe kerül az üzemeltetés" : "Find out what operations will cost"}
        subtitle={locale === "hu"
          ? "Töltse ki intelligens igényfelmérőnket – és már most kap hozzávetőleges árat online."
          : "Fill in our smart needs assessment and get an approximate price online right now."}
        cta1={{ label: locale === "hu" ? "Intelligens igényfelmérés" : "Smart Needs Assessment", href: smartFormHref }}
        cta2={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: `/${locale}/kapcsolat` }}
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
