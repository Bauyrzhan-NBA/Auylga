import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { demoNews } from '../utils/demoData';
import {
  setNewsMetaTags,
  clearNewsMetaTags,
  getAbsoluteImageUrl,
  getMetaDescription,
} from '../utils/metaTags';

/** Если у новости нет изображения: замените на /default-news.jpg, если добавите файл в public */
const DEFAULT_NEWS_IMAGE = '/photos/smilefamilykz.jpg';
const SITE_DEFAULT_TITLE = 'Auylga.kz — Мемлекеттік қолдау порталы';

const NEWS_PER_PAGE = 10;

function formatNewsDate(isoDate: string | undefined, locale: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale === 'kz' ? 'kk-KZ' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const News: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [singleNews, setSingleNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    setLoading(true);
    if (id) {
      const item = demoNews.find((n) => n.id === Number(id)) ?? null;
      setSingleNews(item);
      setNews([]);
    } else {
      const start = (currentPage - 1) * NEWS_PER_PAGE;
      setNews(demoNews.slice(start, start + NEWS_PER_PAGE));
      setTotalPages(Math.ceil(demoNews.length / NEWS_PER_PAGE) || 1);
      setSingleNews(null);
    }
    setLoading(false);
  }, [id, currentPage]);

  // Open Graph, Twitter Card и canonical для превью ссылок в мессенджерах
  useEffect(() => {
    if (id && singleNews) {
      const title =
        currentLanguage.code === 'ru' && singleNews.title_ru
          ? singleNews.title_ru
          : singleNews.title;
      const description = getMetaDescription(
        currentLanguage.code === 'ru' && singleNews.excerpt_ru
          ? singleNews.excerpt_ru
          : singleNews.excerpt,
        singleNews.title
      );
      const imagePath = singleNews.image || DEFAULT_NEWS_IMAGE;
      const imageUrl = getAbsoluteImageUrl(imagePath);
      const pageUrl =
        typeof window !== 'undefined'
          ? window.location.href
          : `${process.env.REACT_APP_SITE_URL || ''}/news/${id}`;

      setNewsMetaTags({ title, description, imageUrl, pageUrl });
      document.title = `${title} — ${SITE_DEFAULT_TITLE}`;

      return () => {
        clearNewsMetaTags();
        document.title = SITE_DEFAULT_TITLE;
      };
    }
  }, [id, singleNews, currentLanguage.code]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (id && singleNews) {
    const displayTitle = currentLanguage.code === 'ru' && singleNews.title_ru ? singleNews.title_ru : singleNews.title;
    const displayContent = currentLanguage.code === 'ru' && singleNews.content_ru ? singleNews.content_ru : (singleNews.content || '');
    const photos = singleNews.gallery && singleNews.gallery.length > 0 ? singleNews.gallery : (singleNews.image ? [singleNews.image] : []);
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Link to="/news" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold mb-6 transition-colors">
            ← {t('Жаңалықтар тізімі', 'К списку новостей')}
          </Link>
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
            {/* Галерея фото — скролл страницы вниз */}
            {photos.length > 0 && (
              <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50">
                {photos.map((src, index) => (
                  <img
                    key={index}
                    src={encodeURI(src)}
                    alt={`${displayTitle} — ${index + 1}`}
                    className="w-full object-cover object-center rounded-lg"
                    style={{ maxHeight: '75vh', minHeight: 260 }}
                    loading="lazy"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = '/photos/smilefamilykz.jpg';
                      }
                    }}
                  />
                ))}
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="text-sm text-gray-500 mb-3">
                {formatNewsDate(singleNews.published_at, currentLanguage.code)}
                {singleNews.category && (
                  <span className="ml-3 bg-primary-100 text-primary-700 px-2.5 py-1 rounded-lg font-semibold">
                    {singleNews.category}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                {displayTitle}
              </h1>
              <div
                className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        {t('Жаңалықтар', 'Новости')}
      </h1>

      {news.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-soft">
          <p className="text-gray-500 text-lg">
            {t('Жаңалықтар табылмады', 'Новостей не найдено')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {news.map((item) => {
              const itemTitle = currentLanguage.code === 'ru' && item.title_ru ? item.title_ru : item.title;
              const itemExcerpt = currentLanguage.code === 'ru' && item.excerpt_ru ? item.excerpt_ru : item.excerpt;
              return (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-card-hover transition-all border border-gray-100 flex flex-col"
              >
                <div className="relative h-52 sm:h-56 bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image ? encodeURI(item.image) : '/photos/smilefamilykz.jpg'}
                    alt={itemTitle}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = '/photos/smilefamilykz.jpg';
                      }
                    }}
                  />
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatNewsDate(item.published_at, currentLanguage.code)}
                    {item.category && (
                      <span className="ml-2 bg-primary-100 text-primary-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-700 transition-colors">
                    {itemTitle}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {itemExcerpt}
                  </p>
                  <span className="text-primary-600 hover:text-primary-700 font-semibold mt-auto transition-colors">
                    {t('Толығырақ', 'Читать далее')} →
                  </span>
                </div>
              </Link>
            );})}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2.5 rounded-xl font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;
