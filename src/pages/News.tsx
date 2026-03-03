import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import api from '../services/api';
import { demoNews } from '../utils/demoData';

const News: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [singleNews, setSingleNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    if (id) {
      fetchSingleNews(id);
    } else {
      fetchNewsList(currentPage);
    }
  }, [id, currentPage]);

  const fetchNewsList = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get('/news', {
        params: { 
          page, 
          limit: 10, 
          language: 'kz' 
        }
      });
      setNews(response.data.news);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleNews = async (newsId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/news/${newsId}`, {
        params: { language: currentLanguage.code }
      });
      setSingleNews(response.data);
    } catch {
      const fallback = demoNews.find((n) => n.id === Number(newsId)) ?? null;
      setSingleNews(fallback);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/news" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-6">
            ← {t('Жаңалықтар тізімі', 'К списку новостей')}
          </Link>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Галерея фото — скролл страницы вниз */}
            {photos.length > 0 && (
              <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-100">
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
                {new Date(singleNews.published_at).toLocaleDateString(currentLanguage.code === 'kz' ? 'kk-KZ' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                {singleNews.category && (
                  <span className="ml-3 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                    {singleNews.category}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {displayTitle}
              </h1>
              <div
                className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        {t('Жаңалықтар', 'Новости')}
      </h1>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t('Жаңалықтар табылмады', 'Новостей не найдено')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-52 sm:h-56 bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image ? encodeURI(item.image) : '/photos/smilefamilykz.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = '/photos/smilefamilykz.jpg';
                      }
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(item.published_at).toLocaleDateString()}
                    {item.category && (
                      <span className="ml-2 bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 font-semibold mt-auto">
                    {t('Толығырақ', 'Читать далее')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
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
