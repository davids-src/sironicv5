/**
 * generate-routes.mjs
 * Generates routes.json from the app/[locale] directory.
 * NOTE: The sitemap is now dynamically served via app/sitemap.ts (Next.js native).
 * Run automatically as part of `prebuild` and `predev` scripts.
 */
import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', '[locale]');

// Priority mapping for known routes
const priorityMap = {
  "/":                                        1.0,
  "/szolgaltatasok":                          0.9,
  "/intelligens-urlap":                       0.9,
  "/kapcsolat":                               0.8,
  "/szolgaltatasok/rendszeruzemeltetes":       0.85,
  "/szolgaltatasok/halozatepites":            0.85,
  "/szolgaltatasok/nis2-tamogatas":           0.85,
  "/szolgaltatasok/webfejlesztes":            0.85,
  "/referenciak":                             0.7,
  "/partnereink":                             0.6,
  "/rolunk":                                  0.6,
  "/adatkezeles":                             0.5,
  "/aszf":                                    0.5,
};

/**
 * Localized URL mapping — mirrors i18n/routing.ts pathnames exactly.
 * For routes not listed here, both locales use the same physical folder path.
 */
const urlMapping = {
  "/":                                        { hu: "",                                       en: "" },
  "/szolgaltatasok":                          { hu: "/szolgaltatasok",                        en: "/services" },
  "/partnereink":                             { hu: "/partnereink",                           en: "/partners" },
  "/referenciak":                             { hu: "/referenciak",                           en: "/references" },
  "/rolunk":                                  { hu: "/rolunk",                                en: "/about" },
  "/intelligens-urlap":                       { hu: "/intelligens-urlap",                     en: "/intelligent-form" },
  "/kapcsolat":                               { hu: "/kapcsolat",                             en: "/contact" },
  "/aszf":                                    { hu: "/aszf",                                  en: "/terms" },
  "/adatkezeles":                             { hu: "/adatkezeles",                           en: "/privacy" },
  // Service sub-pages — no EN slug translation in routing.ts, use HU slug for both
  "/szolgaltatasok/rendszeruzemeltetes":       { hu: "/szolgaltatasok/rendszeruzemeltetes",    en: "/szolgaltatasok/rendszeruzemeltetes" },
  "/szolgaltatasok/halozatepites":            { hu: "/szolgaltatasok/halozatepites",          en: "/szolgaltatasok/halozatepites" },
  "/szolgaltatasok/nis2-tamogatas":           { hu: "/szolgaltatasok/nis2-tamogatas",         en: "/szolgaltatasok/nis2-tamogatas" },
  "/szolgaltatasok/webfejlesztes":            { hu: "/szolgaltatasok/webfejlesztes",          en: "/szolgaltatasok/webfejlesztes" },
};

function getLocalizedPath(routePath, locale) {
  if (routePath === '') return '';
  if (urlMapping[routePath]) return urlMapping[routePath][locale];
  // Fallback: use the physical folder path for both locales
  return routePath;
}

function getRoutes(dir, routePrefix = '') {
  let routes = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read directory: ${dir}`);
    return [];
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Skip API routes and dynamic segment folders
      if (entry.name === 'api' || entry.name.startsWith('[')) continue;
      const newPath = path.join(dir, entry.name);
      routes = routes.concat(getRoutes(newPath, `${routePrefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      const p = routePrefix === '' ? '' : routePrefix;
      const priorityKey = p === '' ? '/' : p;
      const priority = priorityMap[priorityKey] ?? 0.5;
      routes.push({ path: p, priority });
    }
  }
  return routes;
}

// Collect and deduplicate routes, sorted by priority descending
const rawRoutes = getRoutes(basePath);
const seen = new Set();
const uniqueRoutes = rawRoutes
  .filter(r => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  })
  .sort((a, b) => b.priority - a.priority);

// ── Write routes.json ─────────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(process.cwd(), 'app', 'routes.json'),
  JSON.stringify(uniqueRoutes, null, 2),
  'utf8'
);
console.log(`✅ Generated ${uniqueRoutes.length} route(s) in routes.json.`);
console.log(`ℹ️  Sitemap is now served dynamically via app/sitemap.ts (Next.js native).`);
