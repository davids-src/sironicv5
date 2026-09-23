import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import SolutionPageLayout from "@/components/ui/SolutionPageLayout";
import NetworkExpansionTopology from "@/components/graphics/NetworkExpansionTopology";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.halozatbovites" });

  const slug = locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok/halozatbovites",
        hu: "https://sironic.eu/hu/megoldasok/halozatbovites",
        en: "https://sironic.eu/en/solutions/network-expansion",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      siteName: "SIRONIC",
      locale: locale === "hu" ? "hu_HU" : "en_US",
      type: "website",
    },
  };
}

export default async function NetworkExpansionPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.halozatbovites" });
  const tHub = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=halozatbovites`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const relatedCards = [
    {
      title: locale === "hu" ? "IT Modernizáció" : "IT Modernization",
      text: locale === "hu" ? "Szűk keresztmetszetek és elavult eszközök korszerűsítése." : "Modernize legacy systems and eliminate bottlenecks.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}`,
    },
    {
      title: locale === "hu" ? "Új Iroda IT Kiépítés" : "New Office IT Infrastructure",
      text: locale === "hu" ? "Komplett új hálózat építése és Microsoft 365 integráció." : "Complete new office cabling and M365 integration.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}`,
    },
    {
      title: locale === "hu" ? "Hálózatépítés Szolgáltatás" : "Network Building Service",
      text: locale === "hu" ? "Részletes hálózatépítési és szerelési mérnöki szolgáltatásaink." : "Detailed structured cabling and engineering services.",
      href: `/${locale}/szolgaltatasok/halozatepites`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t("h1"),
      provider: { "@type": "Organization", name: "SIRONIC", url: "https://sironic.eu" },
      description: t("metaDescription"),
      areaServed: "HU",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "hu" ? "Főoldal" : "Home", item: `https://sironic.eu/${locale}` },
        { "@type": "ListItem", position: 2, name: locale === "hu" ? "Megoldások" : "Solutions", item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok" : "solutions"}` },
        { "@type": "ListItem", position: 3, name: t("badge"), item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="halozatbovites-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SolutionPageLayout
        locale={locale}
        badge={t("badge")}
        h1={t("h1")}
        intro={t("intro")}
        primaryCtaLabel={tHub("primaryCta")}
        secondaryCtaLabel={tHub("secondaryCta")}
        primaryCtaHref={contactHref}
        secondaryCtaHref={freeAssessmentHref}
        diagramComponent={<NetworkExpansionTopology />}
        scopeTitle={t("scopeTitle")}
        scopeSubtitle={t("scopeSubtitle")}
        scopePoints={t.raw("scopePoints") as string[]}
        processTitle={t("processTitle")}
        processSubtitle={t("processSubtitle")}
        processSteps={t.raw("processSteps") as any[]}
        bridgeTitle={t("bridgeTitle")}
        bridgeText={t("bridgeText")}
        relatedCards={relatedCards}
      />
    </>
  );
}
