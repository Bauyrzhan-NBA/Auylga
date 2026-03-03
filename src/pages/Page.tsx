import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Page as PageData } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import api from '../services/api';

const PageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (slug) {
      fetchPage(slug);
    }
  }, [slug]);

  const fetchPage = async (pageSlug: string) => {
    try {
      const response = await api.get(`/pages/${pageSlug}`, {
        params: { language: 'kz' }
      });
      setPage(response.data);
      
      // Update document title
      if (response.data.meta_title) {
        document.title = response.data.meta_title;
      }
    } catch (error) {
      console.error('Failed to fetch page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('Бет табылмады', 'Страница не найдена')}
          </h1>
          <p className="text-gray-600">
            {t(
              'Сіз іздеген бет табылмады немесе жойылған болуы мүмкін',
              'Страница, которую вы ищете, не найдена или была удалена'
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {page.title}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageView;
