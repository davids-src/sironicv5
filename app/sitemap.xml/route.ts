import routesData from "../routes.json";

const BASE = "https://sironic.eu";

const urlMapping: Record<string, { hu: string; en: string }> = {
  "/": { hu: "", en: "" },
  "/szolgaltatasok": { hu: "/szolgaltatasok", en: "/services" },
  "/partnereink": { hu: "/partnereink", en: "/partners" },
  "/referenciak": { hu: "/referenciak", en: "/references" },
  "/rolunk": { hu: "/rolunk", en: "/about" },
  "/intelligens-urlap": { hu: "/intelligens-urlap", en: "/intelligent-form" },
  "/kapcsolat": { hu: "/kapcsolat", en: "/contact" },
};

function getLocalizedPath(path: string, locale: "hu" | "en"): string {
  if (path === "") return "";
  if (urlMapping[path]) return urlMapping[path][locale];
  for (const [key, translations] of Object.entries(urlMapping)) {
    if (key !== "/" && path.startsWith(key + "/")) {
      return translations[locale] + path.slice(key.length);
    }
  }
  return path;
}

export async function GET() {
  const locales = ["hu", "en"] as const;
  const routes = routesData as { path: string; priority: number }[];
  const now = new Date().toISOString();

  const urls: string[] = [];

  for (const route of routes) {
    for (const locale of locales) {
      const localizedPath = getLocalizedPath(route.path, locale);
      const loc = `${BASE}/${locale}${localizedPath}`;

      const huPath = getLocalizedPath(route.path, "hu");
      const enPath = getLocalizedPath(route.path, "en");

      urls.push(`  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/hu${huPath}"/>
    <xhtml:link rel="alternate" hreflang="hu" href="${BASE}/hu${huPath}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${enPath}"/>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
