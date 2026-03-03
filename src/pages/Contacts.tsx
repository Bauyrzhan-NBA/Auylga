import React, { useState, useEffect } from 'react';
import { Specialist } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import api from '../services/api';

const Contacts: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    fetchSpecialists();
  }, [currentLanguage]);

  const fetchSpecialists = async () => {
    try {
      const response = await api.get('/contacts', {
        params: { language: currentLanguage.code }
      });
      setSpecialists(response.data);
    } catch (error) {
      console.error('Failed to fetch specialists:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialist.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('Мамандармен байланыс', 'Контакты специалистов')}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t(
            'Мемлекеттік бағдарламалар бойынша кез келген сұрақтарға жауап алу үшін біздің мамандармен хабарласыңыз',
            'Свяжитесь с нашими специалистами для получения ответов на любые вопросы по государственным программам'
          )}
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder={t('Маманды іздеу...', 'Поиск специалиста...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {filteredSpecialists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t('Мамандар табылмады', 'Специалисты не найдены')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialists.map((specialist) => (
            <div key={specialist.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {specialist.photo ? (
                    <img
                      src={specialist.photo}
                      alt={specialist.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-xl font-semibold">
                        {specialist.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{specialist.name}</h3>
                    {specialist.specialization && (
                      <p className="text-sm text-gray-600">{specialist.specialization}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${specialist.phone}`} className="hover:text-primary-600">
                      {specialist.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${specialist.email}`} className="hover:text-primary-600">
                      {specialist.email}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <a
                    href={`tel:${specialist.phone}`}
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded text-center hover:bg-primary-700 transition-colors"
                  >
                    {t('Қоңырау', 'Позвонить')}
                  </a>
                  <a
                    href={`mailto:${specialist.email}`}
                    className="flex-1 border border-primary-600 text-primary-600 px-4 py-2 rounded text-center hover:bg-primary-50 transition-colors"
                  >
                    {t('Хат', 'Написать')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Form Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t('Жалпы сұрақтар', 'Общие вопросы')}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {t(
            'Жеке маманды таңдағыңыз келмесе, жалпы сұрақтармен бізге хабарласыңыз',
            'Если у вас нет конкретного специалиста, свяжитесь с нами по общим вопросам'
          )}
        </p>
        <div className="text-center">
          <a
            href="mailto:info@auylga.kz"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
          >
            info@auylga.kz
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
