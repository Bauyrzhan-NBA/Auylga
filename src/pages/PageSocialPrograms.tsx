import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const PageSocialPrograms: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-8">
          ← {t('Басты бетке', 'На главную')}
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
          {t('Әлеуметтік бағдарламалар', 'Социальные программы')}
        </h1>
        <p className="text-gray-700 text-lg mb-12">
          {t(
            'Мамандар, қоныс аударушылар және жұмыспен қамту бағдарламаларына қатысатын азаматтарға мемлекеттік қолдау.',
            'Государственная поддержка для специалистов, переселенцев и граждан, участвующих в программах занятости и мобильности.'
          )}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/specialisty-v-selah"
            className="block p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-all"
          >
            <h2 className="text-lg font-bold text-blue-700 mb-3">{t('«Дипломмен ауылға» бағдарламасы', 'Программа «С дипломом — в село»')}</h2>
            <p className="text-gray-700 text-sm mb-4">
              {t('Мұғалімдер мен медицина мамандарына көтерме жәрдемақы, тұрғын үйге жеңілдетілген несие 8,65 млн тг дейін. otbasybank.kz арқылы өтініш.', 'Подъёмное пособие учителям и медработникам, льготный кредит на жильё до 8,65 млн тенге. Заявки через otbasybank.kz.')}
            </p>
            <span className="text-blue-600 font-semibold text-sm">{t('Толығырақ', 'Подробнее')} →</span>
          </Link>
          <Link
            to="/programmy-mobilnosti"
            className="block p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-all"
          >
            <h2 className="text-lg font-bold text-blue-700 mb-3">{t('Жұмыс күшінің мобильділігі мен жұмыспен қамту бағдарламалары', 'Программы мобильности и занятости')}</h2>
            <p className="text-gray-700 text-sm mb-4">
              {t('Жұмыс күшінің ұтқырлығын арттыру, жастар практикасы, қоғамдық жұмыстар, әлеуметтік жұмыс орны, «Күміс жас».', 'Повышение мобильности рабочей силы, молодёжная практика, общественные работы, социальное рабочее место, «Серебряный возраст».')}
            </p>
            <span className="text-blue-600 font-semibold text-sm">{t('Толығырақ', 'Подробнее')} →</span>
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
            ← {t('Басты бетке', 'На главную')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageSocialPrograms;
