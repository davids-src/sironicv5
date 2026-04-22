import { MetadataRoute } from "next";
import routesData from "./routes.json";

const BASE = "https://sironic.eu";

const urlMapping = {
  "/": { hu: "", en: "" },
  "/szolgaltatasok": { hu: "/szolgaltatasok", en: "/services" },
  "/partnereink": { hu: "/partnereink", en: "/partners" },
  "/referenciak": { hu: "/referenciak", en: "/references" },
  "/rolunk": { hu: "/rolunk", en: "/about" },
  "/intelligens-urlap": { hu: "/intelligens-urlap", en: "/intelligent-form" },
  "/kapcsolat": { hu: "/kapcsolat", en: "/contact" },
};

function getLocalizedPath(path: string, locale: "hu" | "en") {
  if (path === "") return "";
  
  if (urlMapping[path as keyof typeof urlMapping]) {
    return urlMapping[path as keyof typeof urlMapping][locale];
  }
  
  for (const [key, translations] of Object.entries(urlMapping)) {
    if (key !== "/" && path.startsWith(key + "/")) {
      const rest = path.slice(key.length);
      return translations[locale] + rest;
    }
  }
  
  return path;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["hu", "en"] as const;
  
  const routes: { path: string; priority: number }[] = routesData as any;

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const localizedPath = getLocalizedPath(route.path, locale);
      const url = `${BASE}/${locale}${localizedPath}`;
      
      const languages: Record<string, string> = {
        "x-default": `${BASE}/hu${getLocalizedPath(route.path, "hu")}`,
      };
      
      for (const l of locales) {
        languages[l] = `${BASE}/${l}${getLocalizedPath(route.path, l)}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
