/**
 * Экспорт списка новостей в JSON для генерации статических HTML с meta-тегами.
 * Запуск: node scripts/export-news-json.js (из корня frontend)
 * Требует: npm install ts-node --save-dev и наличие src/utils/demoData.ts
 */
const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
process.env.PUBLIC_URL = '';

require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'CommonJS' } });
const { demoNews } = require(path.join(projectRoot, 'src/utils/demoData.ts'));

const outPath = path.join(projectRoot, 'public', 'news-data.json');
const data = demoNews.map((n) => ({
  id: n.id,
  title: n.title,
  title_ru: n.title_ru,
  excerpt: n.excerpt,
  excerpt_ru: n.excerpt_ru,
  image: n.image || '',
}));
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Written', data.length, 'news items to public/news-data.json');
