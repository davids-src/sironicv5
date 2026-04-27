import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', '[locale]');
const BASE = 'https://sironic.eu';

// Standard marketing routes priority mapping
const priorityMap = {
  "/": 1.0,
  "/szolgaltatasok": 0.9,
  "/szolgaltatasok/rendszeruzemeltetes": 0.85,
  "/szolgaltatasok/halozatepites": 0.85,
  "/szolgaltatasok/nis2-tamogatas": 0.85,
  "/szolgaltatasok/webfejlesztes": 0.85,
  "/intelligens-urlap": 0.9,
  "/kapcsolat": 0.8,
  "/referenciak": 0.7,
  "/partnereink": 0.6,
  "/rolunk": 0.6,
};

// Localized path mapping (mirrors i18n/routing.ts)
const urlMapping = {
  "/": { hu: "", en: "" },
  "/szolgaltatasok": { hu: "/szolgaltatasok", en: "/services" },
  "/partnereink": { hu: "/partnereink", en: "/partners" },
  "/referenciak": { hu: "/referenciak", en: "/references" },
  "/rolunk": { hu: "/rolunk", en: "/about" },
  "/intelligens-urlap": { hu: "/intelligens-urlap", en: "/intelligent-form" },
  "/kapcsolat": { hu: "/kapcsolat", en: "/contact" },
};

function getLocalizedPath(routePath, locale) {
  if (routePath === '') return '';
  if (urlMapping[routePath]) return urlMapping[routePath][locale];
  for (const [key, translations] of Object.entries(urlMapping)) {
    if (key !== '/' && routePath.startsWith(key + '/')) {
      return translations[locale] + routePath.slice(key.length);
    }
  }
  return routePath;
}

function getRoutes(dir, routePrefix = '') {
  let routes = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read director: ${dir}`);
    return [];
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Ignore api or dynamic components mappings
      if (entry.name === 'api' || entry.name.startsWith('[')) continue;
      
      const newPath = path.join(dir, entry.name);
      routes = routes.concat(getRoutes(newPath, `${routePrefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      const p = routePrefix === '' ? '' : routePrefix;
      // Assign priority based on mapping, or default to 0.5
      const priorityKey = p === '' ? '/' : p;
      let priority = priorityMap[priorityKey] || 0.5;
      
      routes.push({
        path: p,
        priority: priority
      });
    }
  }
  return routes;
}

const routes = getRoutes(basePath);

// Ensure uniqueness and root is present
const uniquePaths = Array.from(new Set(routes.map(r => r.path)));
const uniqueRoutes = uniquePaths.map(path => {
    return routes.find(r => r.path === path);
  }).sort((a, b) => b.priority - a.priority);

// 1. Write routes.json
fs.writeFileSync(
  path.join(process.cwd(), 'app', 'routes.json'),
  JSON.stringify(uniqueRoutes, null, 2)
);
console.log(`✅ Generated ${uniqueRoutes.length} route(s) for Sitemap in routes.json.`);

// 2. Generate static public/sitemap.xml (bypasses Next.js middleware headers)
const locales = ['hu', 'en'];
const now = new Date().toISOString();

const urlEntries = [];
for (const route of uniqueRoutes) {
  for (const locale of locales) {
    const localizedPath = getLocalizedPath(route.path, locale);
    const loc = `${BASE}/${locale}${localizedPath}`;
    const huPath = getLocalizedPath(route.path, 'hu');
    const enPath = getLocalizedPath(route.path, 'en');

    urlEntries.push(`  <url>
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
${urlEntries.join('\n')}
</urlset>`;

fs.writeFileSync(
  path.join(process.cwd(), 'public', 'sitemap.xml'),
  xml,
  'utf8'
);
console.log(`✅ Generated static public/sitemap.xml with ${urlEntries.length} URL entries.`);
