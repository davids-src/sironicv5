import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', '[locale]');

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

fs.writeFileSync(
  path.join(process.cwd(), 'app', 'routes.json'),
  JSON.stringify(uniqueRoutes, null, 2)
);

console.log(`✅ Generated ${uniqueRoutes.length} route(s) for Sitemap in routes.json.`);
