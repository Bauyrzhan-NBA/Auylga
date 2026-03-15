/**
 * Утилиты для динамической установки Open Graph и Twitter Card meta-тегов
 * на страницах новостей (превью ссылок в WhatsApp, Telegram, Facebook и др.).
 *
 * Важно: проект на CRA без SSR. Теги выставляются на клиенте при загрузке страницы.
 * Мессенджеры с поддержкой JS (Telegram, многие боты) подхватят превью.
 * Для 100% работы без JS нужен серверный рендер или пререндер маршрутов /news/:id.
 */

const META_MARKER = 'data-auylga-dynamic-meta';
/** Если у новости нет изображения — используется это (положите default-news.jpg в public или замените на /photos/smilefamilykz.jpg) */
const DEFAULT_IMAGE = '/default-news.jpg';
const FALLBACK_IMAGE = '/photos/smilefamilykz.jpg';
const SITE_NAME = 'Auylga.kz';

/** Базовый URL сайта для абсолютных og:image и canonical. В браузере — текущий origin; для пререндера задайте REACT_APP_SITE_URL в .env (напр. https://auylga.kz). */
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.REACT_APP_SITE_URL || '';
}

/**
 * Возвращает абсолютный URL для изображения (требование OG/Twitter).
 * Если путь пустой — используется fallback-изображение.
 */
export function getAbsoluteImageUrl(relativePath: string | undefined): string {
  const base = getBaseUrl();
  const path = relativePath || DEFAULT_IMAGE;
  if (path.startsWith('http')) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Краткое описание для meta (до ~160 символов, без HTML).
 */
export function getMetaDescription(excerpt: string | undefined, fallback: string): string {
  const text = (excerpt || fallback).replace(/<[^>]*>/g, '').trim();
  if (text.length <= 160) return text;
  return text.slice(0, 157) + '...';
}

function ensureMetaTag(
  attribute: 'property' | 'name',
  key: string,
  content: string,
  marker: string
): void {
  const selector = attribute === 'property' ? `meta[property="${key}"]` : `meta[name="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    if (attribute === 'property') el.setAttribute('property', key);
    else el.setAttribute('name', key);
    el.setAttribute(META_MARKER, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureCanonical(href: string, marker: string): void {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    el.setAttribute(META_MARKER, '');
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Устанавливает Open Graph, Twitter Card и canonical для страницы новости.
 */
export function setNewsMetaTags(params: {
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
}): void {
  const { title, description, imageUrl, pageUrl } = params;
  const base = getBaseUrl();
  const imageAbsolute = imageUrl.startsWith('http') ? imageUrl : `${base}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;

  ensureMetaTag('property', 'og:title', title, META_MARKER);
  ensureMetaTag('property', 'og:description', description, META_MARKER);
  ensureMetaTag('property', 'og:image', imageAbsolute, META_MARKER);
  ensureMetaTag('property', 'og:url', pageUrl, META_MARKER);
  ensureMetaTag('property', 'og:type', 'article', META_MARKER);
  ensureMetaTag('property', 'og:site_name', SITE_NAME, META_MARKER);

  ensureMetaTag('name', 'twitter:card', 'summary_large_image', META_MARKER);
  ensureMetaTag('name', 'twitter:title', title, META_MARKER);
  ensureMetaTag('name', 'twitter:description', description, META_MARKER);
  ensureMetaTag('name', 'twitter:image', imageAbsolute, META_MARKER);

  ensureCanonical(pageUrl, META_MARKER);
}

/**
 * Удаляет динамически добавленные meta-теги (при уходе со страницы новости).
 */
export function clearNewsMetaTags(): void {
  document.querySelectorAll(`meta[${META_MARKER}], link[${META_MARKER}]`).forEach((el) => el.remove());
}
