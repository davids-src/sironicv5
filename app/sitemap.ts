import { MetadataRoute } from "next";
import routesData from "./routes.json";

const BASE = "https://sironic.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["hu", "en"];
  
  // Cast the imported JSON data to the corresponding type
  const routes: { path: string; priority: number }[] = routesData as any;

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
