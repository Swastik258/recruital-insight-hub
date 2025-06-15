
export const generateSitemap = () => {
  const baseUrl = 'https://week-hr.com';
  const pages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/login', priority: '0.8', changefreq: 'monthly' },
    { url: '/signup', priority: '0.9', changefreq: 'monthly' },
    { url: '/dashboard', priority: '0.9', changefreq: 'weekly' },
    { url: '/payment', priority: '0.7', changefreq: 'monthly' },
    { url: '/settings', priority: '0.6', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

Sitemap: https://week-hr.com/sitemap.xml

# Block AI crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`;
};
