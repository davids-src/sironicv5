import { MetadataRoute } from "next";

const BASE = "https://sironic.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["hu", "en"];

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/szolgaltatasok", priority: 0.9 },
    { path: "/szolgaltatasok/rendszeruzemeltetes", priority: 0.85 },
    { path: "/szolgaltatasok/halozatepites", priority: 0.85 },
    { path: "/szolgaltatasok/nis2-tamogatas", priority: 0.85 },
    { path: "/szolgaltatasok/webfejlesztes", priority: 0.85 },
    { path: "/intelligens-urlap", priority: 0.9 },
    { path: "/kapcsolat", priority: 0.8 },
    { path: "/referenciak", priority: 0.7 },
    { path: "/partnereink", priority: 0.6 },
    { path: "/rolunk", priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
