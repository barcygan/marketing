import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://kcygan.eu';

// Mapping overrides for priority and changefreq
const OVERRIDES = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/en/': { priority: '1.0', changefreq: 'weekly' },
  '/challenge/': { priority: '0.8', changefreq: 'weekly' },
};

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', 'public', 'reports', 'assets', '.git'].includes(file)) {
        continue;
      }
      getHtmlFiles(filePath, files);
    } else if (file.endsWith('.html')) {
      files.push(filePath);
    }
  }
  return files;
}

function getUrlFromPath(urlPath) {
  if (urlPath === 'index.html') {
    return '/';
  } else if (urlPath.endsWith('/index.html')) {
    return '/' + urlPath.slice(0, -10);
  } else if (urlPath.endsWith('.html')) {
    return '/' + urlPath.slice(0, -5);
  } else {
    return '/' + urlPath;
  }
}

function generateSitemap() {
  console.log('Generating sitemap.xml...');
  const htmlFiles = getHtmlFiles(PROJECT_ROOT);
  const pages = [];

  // Parse each html file and build page metadata
  for (const filePath of htmlFiles) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const urlPath = relativePath.replace(/\\/g, '/');
    const url = getUrlFromPath(urlPath);
    const stat = fs.statSync(filePath);
    const lastmod = stat.mtime.toISOString().split('T')[0];

    const override = OVERRIDES[url];
    const priority = override ? override.priority : '0.9';
    const changefreq = override ? override.changefreq : 'monthly';

    pages.push({
      url,
      lastmod,
      priority,
      changefreq,
    });
  }

  // Generate the XML string
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const page of pages) {
    xml += '    <url>\n';
    xml += `        <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `        <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `        <priority>${page.priority}</priority>\n`;

    // Handle alternate links
    const alternates = [];
    if (page.url.startsWith('/en/')) {
      const polishUrl = page.url.substring(3); // remove '/en' prefix (leaving leading slash)
      const hasPolish = pages.some(p => p.url === polishUrl);
      if (hasPolish) {
        alternates.push({ lang: 'pl', url: polishUrl });
        alternates.push({ lang: 'en', url: page.url });
        alternates.push({ lang: 'x-default', url: polishUrl });
      }
    } else {
      const englishUrl = page.url === '/' ? '/en/' : `/en${page.url}`;
      const hasEnglish = pages.some(p => p.url === englishUrl);
      if (hasEnglish) {
        alternates.push({ lang: 'pl', url: page.url });
        alternates.push({ lang: 'en', url: englishUrl });
        alternates.push({ lang: 'x-default', url: page.url });
      } else {
        // Polish-only page
        alternates.push({ lang: 'pl', url: page.url });
        alternates.push({ lang: 'x-default', url: page.url });
      }
    }

    for (const alt of alternates) {
      xml += `        <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${BASE_URL}${alt.url}" />\n`;
    }

    xml += '    </url>\n';
  }

  xml += '</urlset>\n';

  const outputPath = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Sitemap successfully updated at ${outputPath}`);
}

generateSitemap();
