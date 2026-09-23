import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import SolutionPageLayout from "@/components/ui/SolutionPageLayout";
import ModernizationAuditGraphic from "@/components/graphics/ModernizationAuditGraphic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.itModernizacio" });

  const slug = locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok/it-modernizacio",
        hu: "https://sironic.eu/hu/megoldasok/it-modernizacio",
        en: "https://sironic.eu/en/solutions/it-modernization",
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

export default async function ItModernizationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.itModernizacio" });
  const tHub = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=it-modernizacio`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const relatedCards = [
    {
      title: locale === "hu" ? "Hálózatbővítés" : "Network Expansion",
      text: locale === "hu" ? "Kapacitásbővítés és hálózati szűk keresztmetszetek felszámolása." : "Capacity expansion and network bottleneck removal.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
    },
    {
      title: locale === "hu" ? "NIS2 Megfelelőségi Támogatás" : "NIS2 Compliance Support",
      text: locale === "hu" ? "Informatikai biztonsági követelményeknek való felkészítés." : "Prepare IT security infrastructure for NIS2 standards.",
      href: `/${locale}/szolgaltatasok/nis2-tamogatas`,
    },
    {
      title: locale === "hu" ? "IT Üzemeltetés" : "IT Operations",
      text: locale === "hu" ? "Modernizált rendszer proaktív havi felügyelete és karbantartása." : "Proactive SLA maintenance for modernized systems.",
      href: `/${locale}/szolgaltatasok/rendszeruzemeltetes`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}`,
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
        { "@type": "ListItem", position: 3, name: t("badge"), item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="it-modernizacio-json-ld"
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
        diagramComponent={<ModernizationAuditGraphic />}
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
