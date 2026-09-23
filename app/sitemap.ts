import { MetadataRoute } from "next";

const BASE = "https://sironic.eu";
const locales = ["hu", "en"] as const;

/**
 * Static content last modified date anchor — ensuring sitemap lastModified
 * is based on actual content update date rather than dynamic runtime build Date().
 */
const DEFAULT_CONTENT_UPDATED_AT = new Date("2026-09-20T00:00:00.000Z");

interface RouteConfig {
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
  contentUpdatedAt?: Date;
}

const routes: Array<RouteConfig> = [
  // Főoldal
  { hu: "/", en: "/", priority: 1.0, changefreq: "weekly", contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z") },

  // Megoldások Hub & Subpages
  {
    hu: "/megoldasok",
    en: "/solutions",
    priority: 0.9,
    changefreq: "weekly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    hu: "/megoldasok/uj-iroda-it",
    en: "/solutions/new-office-it",
    priority: 0.88,
    changefreq: "monthly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    hu: "/megoldasok/uj-telephely-it",
    en: "/solutions/new-site-it",
    priority: 0.88,
    changefreq: "monthly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    hu: "/megoldasok/halozatbovites",
    en: "/solutions/network-expansion",
    priority: 0.88,
    changefreq: "monthly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    hu: "/megoldasok/irodakoltozes",
    en: "/solutions/office-relocation",
    priority: 0.88,
    changefreq: "monthly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    hu: "/megoldasok/it-modernizacio",
    en: "/solutions/it-modernization",
    priority: 0.88,
    changefreq: "monthly",
    contentUpdatedAt: new Date("2026-09-23T00:00:00.000Z"),
  },

  // Fő aloldalak
  {
    hu: "/szolgaltatasok",
    en: "/services",
    priority: 0.9,
    changefreq: "weekly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/intelligens-urlap",
    en: "/intelligent-form",
    priority: 0.9,
    changefreq: "monthly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/ingyenes-felmeres",
    en: "/free-assessment",
    priority: 0.95,
    changefreq: "weekly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/blog",
    en: "/blog",
    priority: 0.8,
    changefreq: "weekly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  { hu: "/kapcsolat", en: "/contact", priority: 0.8, changefreq: "monthly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },
  { hu: "/referenciak", en: "/references", priority: 0.7, changefreq: "monthly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },
  { hu: "/partneri-egyuttmukodes", en: "/partnership", priority: 0.8, changefreq: "monthly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },
  { hu: "/partnereink", en: "/partners", priority: 0.6, changefreq: "monthly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },
  { hu: "/rolunk", en: "/about", priority: 0.6, changefreq: "monthly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },

  // Szolgáltatás aloldalak
  {
    hu: "/szolgaltatasok/rendszeruzemeltetes",
    en: "/services/rendszeruzemeltetes",
    priority: 0.85,
    changefreq: "monthly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/szolgaltatasok/halozatepites",
    en: "/services/halozatepites",
    priority: 0.85,
    changefreq: "monthly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/szolgaltatasok/nis2-tamogatas",
    en: "/services/nis2-tamogatas",
    priority: 0.85,
    changefreq: "monthly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
  {
    hu: "/szolgaltatasok/webfejlesztes",
    en: "/services/webfejlesztes",
    priority: 0.85,
    changefreq: "monthly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },

  // Jogi oldalak
  { hu: "/aszf", en: "/terms", priority: 0.5, changefreq: "yearly", contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT },
  {
    hu: "/adatkezeles",
    en: "/privacy",
    priority: 0.5,
    changefreq: "yearly",
    contentUpdatedAt: DEFAULT_CONTENT_UPDATED_AT,
  },
];

/**
 * Next.js automatikusan kiszolgálja ezt /sitemap.xml útvonalon.
 * Minden URL-hez hreflang alternate linkeket generálunk (hu, en, x-default).
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
        lastModified: route.contentUpdatedAt || DEFAULT_CONTENT_UPDATED_AT,
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
