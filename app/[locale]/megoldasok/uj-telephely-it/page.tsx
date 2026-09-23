import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import SolutionPageLayout from "@/components/ui/SolutionPageLayout";
import WanSiteDiagram from "@/components/graphics/WanSiteDiagram";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.ujTelephelyIt" });

  const slug = locale === "hu" ? "megoldasok/uj-telephely-it" : "solutions/new-site-it";
  const canonical = `https://sironic.eu/${locale}/${slug}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://sironic.eu/hu/megoldasok/uj-telephely-it",
        hu: "https://sironic.eu/hu/megoldasok/uj-telephely-it",
        en: "https://sironic.eu/en/solutions/new-site-it",
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

export default async function NewSiteItPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionPages.ujTelephelyIt" });
  const tHub = await getTranslations({ locale, namespace: "solutionsHub" });

  const contactHref = `/${locale}/kapcsolat?forras=uj-telephely-it`;
  const freeAssessmentHref = `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`;

  const relatedCards = [
    {
      title: locale === "hu" ? "Új Iroda IT Kiépítés" : "New Office IT Infrastructure",
      text: locale === "hu" ? "Rack, Wi-Fi, strukturált kábelezés az első munkanapra." : "Rack, Wi-Fi, structured cabling ready for day one.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/uj-iroda-it" : "solutions/new-office-it"}`,
    },
    {
      title: locale === "hu" ? "Hálózatbővítés" : "Network Expansion",
      text: locale === "hu" ? "Telephelyi hálózat bővítése új részlegek számára." : "Expand site network for new departments.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
    },
    {
      title: locale === "hu" ? "IT Modernizáció" : "IT Modernization",
      text: locale === "hu" ? "Elavult szerverek és infrastruktúra tervszerű cseréje." : "Modernize legacy servers and network infrastructure.",
      href: `/${locale}/${locale === "hu" ? "megoldasok/it-modernizacio" : "solutions/it-modernization"}`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("h1"),
      description: t("metaDescription"),
      url: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/uj-telephely-it" : "solutions/new-site-it"}`,
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
        { "@type": "ListItem", position: 3, name: t("badge"), item: `https://sironic.eu/${locale}/${locale === "hu" ? "megoldasok/uj-telephely-it" : "solutions/new-site-it"}` },
      ],
    },
  ];

  return (
    <>
      <Script
        id="uj-telephely-json-ld"
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
        diagramComponent={<WanSiteDiagram />}
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
