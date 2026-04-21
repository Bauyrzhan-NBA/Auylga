/**
 * Генерирует для каждой новости статический index.html с Open Graph / Twitter Card meta.
 * WhatsApp, Telegram и др. получают готовый HTML с превью без выполнения JS.
 * Запуск после build: node scripts/generate-news-html.js
 */
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const projectRoot = path.join(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const indexPath = path.join(buildDir, 'index.html');
const dataPath = path.join(buildDir, 'news-data.json');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://auylga.kz';
const SITE_NAME = 'Auylga.kz';
const DEFAULT_IMAGE = `${SITE_URL}/photos/smilefamilykz.jpg`;
const NEWS_API_URL = process.env.OG_NEWS_API_URL || `${SITE_URL}/api/news`;

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

function normalizeNewsItem(item) {
  return {
    id: item.id,
    title: item.title || item.title_kz || '',
    excerpt: item.excerpt || item.excerpt_kz || '',
    image: item.image || '',
  };
}

async function fetchNewsFromApi() {
  const limit = 100;
  const response = await axios.get(NEWS_API_URL, {
    params: { page: 1, limit },
    timeout: 20000,
  });
  const firstPageNews = response?.data?.news || [];
  const pages = response?.data?.pagination?.pages || 1;
  const aggregated = [...firstPageNews];

  if (pages > 1) {
    const requests = [];
    for (let page = 2; page <= pages; page += 1) {
      requests.push(
        axios.get(NEWS_API_URL, {
          params: { page, limit },
          timeout: 20000,
        })
      );
    }
    const responses = await Promise.all(requests);
    responses.forEach((res) => {
      const pageNews = res?.data?.news || [];
      aggregated.push(...pageNews);
    });
  }

  return aggregated.map(normalizeNewsItem).filter((n) => n.id && n.title);
}

async function loadNewsList() {
  try {
    const apiNews = await fetchNewsFromApi();
    if (apiNews.length > 0) {
      console.log(`Loaded ${apiNews.length} news items from API: ${NEWS_API_URL}`);
      return apiNews;
    }
  } catch (error) {
    console.warn(
      `Failed to load news from API (${NEWS_API_URL}). Falling back to build/news-data.json.`
    );
    if (error?.message) {
      console.warn(error.message);
    }
  }

  if (!fs.existsSync(dataPath)) {
    console.error(
      'build/news-data.json not found and API is unavailable. Cannot generate news preview pages.'
    );
    process.exit(1);
  }

  const localNews = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    .map(normalizeNewsItem)
    .filter((n) => n.id && n.title);
  console.log(`Loaded ${localNews.length} news items from build/news-data.json`);
  return localNews;
}

if (!fs.existsSync(indexPath)) {
  console.error('build/index.html not found. Run npm run build first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');
(async () => {
  const newsList = await loadNewsList();

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
})().catch((error) => {
  console.error('Failed to generate news preview pages');
  console.error(error);
  process.exit(1);
});
