import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import SolutionPageLayout from "@/components/ui/SolutionPageLayout";
import OfficeFloorplanDiagram from "@/components/graphics/OfficeFloorplanDiagram";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.ujIrodaIt" });

  const slug = locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok/uj-iroda-it",
        hu: "https://sironic.eu/hu/megoldasok/uj-iroda-it",
        en: "https://sironic.eu/en/solutions/new-office-it",
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

export default async function NewOfficeItPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.ujIrodaIt" });
  const tHub = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=uj-iroda-it`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const relatedCards = [
    {
      title: locale === "hu" ? "Új Telephely IT Alapjai" : "New Site IT Foundations",
      text: locale === "hu" ? "Telephelyközi VPN, redundáns WAN és üzleti hálózat építés." : "Site-to-site VPN, redundant WAN, and business networking.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-telephely-it" : "solutions/new-site-it"}`,
    },
    {
      title: locale === "hu" ? "Hálózatbővítés" : "Network Expansion",
      text: locale === "hu" ? "Meglévő irodai hálózat bővítése új végpontokkal és AP-kkal." : "Expand existing office network with new drops and APs.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
    },
    {
      title: locale === "hu" ? "Irodaköltözés" : "Office Relocation",
      text: locale === "hu" ? "Zökkenőmentes IT költöztetés minimális állásidővel." : "Seamless IT relocation with minimal downtime.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/irodakoltozes" : "solutions/office-relocation"}`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}`,
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
        { "@type": "ListItem", position: 3, name: t("badge"), item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="uj-iroda-json-ld"
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
        diagramComponent={<OfficeFloorplanDiagram />}
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
