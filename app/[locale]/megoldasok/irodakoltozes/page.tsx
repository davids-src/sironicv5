import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import SolutionPageLayout from "@/components/ui/SolutionPageLayout";
import RelocationTimelineDiagram from "@/components/graphics/RelocationTimelineDiagram";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.irodakoltozes" });

  const slug = locale === "hu" ? "megoldasok/irodakoltozes" : "solutions/office-relocation";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok/irodakoltozes",
        hu: "https://sironic.eu/hu/megoldasok/irodakoltozes",
        en: "https://sironic.eu/en/solutions/office-relocation",
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

export default async function OfficeRelocationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.irodakoltozes" });
  const tHub = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=irodakoltozes`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const relatedCards = [
    {
      title: locale === "hu" ? "Új Iroda IT Kiépítés" : "New Office IT Infrastructure",
      text: locale === "hu" ? "Strukturált hálózat és rack kiépítés az új helyszínen." : "Structured cabling and rack setup at the new site.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}`,
    },
    {
      title: locale === "hu" ? "IT Modernizáció" : "IT Modernization",
      text: locale === "hu" ? "Költözéssel egybekötött hardver és szerver korszerűsítés." : "Modernize hardware and servers alongside relocation.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}`,
    },
    {
      title: locale === "hu" ? "Ingyenes Állapotfelmérés" : "Free Assessment",
      text: locale === "hu" ? "Új iroda IT hálózati adottságainak díjmentes auditja." : "Free assessment of new office network readiness.",
      href: freeAssessmentHref,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/irodakoltozes" : "solutions/office-relocation"}`,
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
        { "@type": "ListItem", position: 3, name: t("badge"), item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/irodakoltozes" : "solutions/office-relocation"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="irodakoltozes-json-ld"
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
        diagramComponent={<RelocationTimelineDiagram />}
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
