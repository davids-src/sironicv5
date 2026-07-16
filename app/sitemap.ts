import { MetadataRoute } from "next";

const BASE = "https://sironic.eu";
const locales = ["hu", "en"] as const;

/**
 * Minden oldalhoz megadjuk:
 *  - hu:  a magyar URL slug
 *  - en:  az angol URL slug
 *  - priority: keresőoptimalizálási prioritás (0.0–1.0)
 *  - changefreq: módosítási gyakoriság (news, weekly, monthly, yearly)
 */
const routes: Array<{
  hu: string;
  en: string;
  priority: number;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}> = [
  // Főoldal
  { hu: "/", en: "/", priority: 1.0, changefreq: "weekly" },

  // Fő aloldalak
  {
    hu: "/szolgaltatasok",
    en: "/services",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    hu: "/intelligens-urlap",
    en: "/intelligent-form",
    priority: 0.9,
    changefreq: "monthly",
  },
  { hu: "/kapcsolat", en: "/contact", priority: 0.8, changefreq: "monthly" },
  { hu: "/referenciak", en: "/references", priority: 0.7, changefreq: "monthly" },
  { hu: "/partnereink", en: "/partners", priority: 0.6, changefreq: "monthly" },
  { hu: "/rolunk", en: "/about", priority: 0.6, changefreq: "monthly" },

  // Szolgáltatás aloldalak
  {
    hu: "/szolgaltatasok/rendszeruzemeltetes",
    en: "/services/rendszeruzemeltetes",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    hu: "/szolgaltatasok/halozatepites",
    en: "/services/halozatepites",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    hu: "/szolgaltatasok/nis2-tamogatas",
    en: "/services/nis2-tamogatas",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    hu: "/szolgaltatasok/webfejlesztes",
    en: "/services/webfejlesztes",
    priority: 0.85,
    changefreq: "monthly",
  },

  // Jogi oldalak
  { hu: "/aszf", en: "/terms", priority: 0.5, changefreq: "yearly" },
  {
    hu: "/adatkezeles",
    en: "/privacy",
    priority: 0.5,
    changefreq: "yearly",
  },
];

/**
 * Next.js automatikusan kiszolgálja ezt /sitemap.xml útvonalon.
 * Minden URL-hez hreflang alternate linkeket generálunk (hu, en, x-default).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const slug = locale === "hu" ? route.hu : route.en;

      // Főoldal kivételként: /hu/ helyett /hu legyen
      const normalizedSlug = slug === "/" ? "" : slug;
      const loc = `${BASE}/${locale}${normalizedSlug}`;

      const huLoc = `${BASE}/hu${route.hu === "/" ? "" : route.hu}`;
      const enLoc = `${BASE}/en${route.en === "/" ? "" : route.en}`;

      entries.push({
        url: loc,
        lastModified: now,
        changeFrequency: route.changefreq,
        priority: route.priority,
        alternates: {
          languages: {
            "x-default": huLoc,
            hu: huLoc,
            en: enLoc,
          },
        },
      });
    }
  }

  return entries;
}
