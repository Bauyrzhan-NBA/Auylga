/**
 * Генерирует для каждой новости статический index.html с Open Graph / Twitter Card meta.
 * WhatsApp, Telegram и др. получают готовый HTML с превью без выполнения JS.
 * Запуск после build: node scripts/generate-news-html.js
 */
const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const indexPath = path.join(buildDir, 'index.html');
const dataPath = path.join(buildDir, 'news-data.json');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://auylga.kz';
const SITE_NAME = 'Auylga.kz';
const DEFAULT_IMAGE = `${SITE_URL}/photos/smilefamilykz.jpg`;

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function metaDescription(text, maxLen = 160) {
  const clean = (text || '').replace(/<[^>]*>/g, '').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 3) + '...';
}

function absoluteImage(img) {
  if (!img) return DEFAULT_IMAGE;
  if (img.startsWith('http')) return img;
  return img.startsWith('/') ? SITE_URL + img : SITE_URL + '/' + img;
}

if (!fs.existsSync(indexPath)) {
  console.error('build/index.html not found. Run npm run build first.');
  process.exit(1);
}
if (!fs.existsSync(dataPath)) {
  console.error('build/news-data.json not found. Run npm run export-news first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const newsList = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

newsList.forEach((item) => {
  // Для превью в WhatsApp/Telegram всегда используем казахский заголовок и описание
  const title = item.title;
  const description = metaDescription(item.excerpt, 160);
  const imageUrl = absoluteImage(item.image);
  const pageUrl = `${SITE_URL}/news/${item.id}`;

  const metaBlock = `
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${escapeHtml(imageUrl)}">
    <meta property="og:url" content="${escapeHtml(pageUrl)}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
    <link rel="canonical" href="${escapeHtml(pageUrl)}">
  `.trim();

  let html = indexHtml;
  const titleTag = /<title>.*?<\/title>/i;
  html = html.replace(titleTag, `<title>${escapeHtml(title)} — ${SITE_NAME}</title>`);
  html = html.replace('</head>', metaBlock + '\n  </head>');

  const outDir = path.join(buildDir, 'news', String(item.id));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
});

console.log('Generated', newsList.length, 'news preview pages in build/news/:id/index.html');
