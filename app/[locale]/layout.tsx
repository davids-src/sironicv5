import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import CookieConsent from "@/components/layout/CookieConsent";
import GoogleAnalyticsTracker from "@/components/layout/GoogleAnalyticsTracker";
import StructuredData from "@/components/layout/StructuredData";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("homeTitle"),
      template: `%s | SIRONIC`,
    },
    description: t("homeDescription"),
    openGraph: {
      siteName: t("siteName"),
      locale: locale === "hu" ? "hu_HU" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://sironic.eu/${locale}`,
      languages: {
        "hu": `https://sironic.eu/hu`,
        "en": `https://sironic.eu/en`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <main id="main-content" style={{ flex: 1, paddingTop: "72px" }}>
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
          <CookieConsent />
          <GoogleAnalyticsTracker gaId="G-PLACEHOLDER" />
          <StructuredData />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
