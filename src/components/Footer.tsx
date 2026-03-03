import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const year = new Date().getFullYear();

  const programs = [
    { kz: 'Әлеуметтік бағдарламалар', ru: 'Социальные программы', url: '/socialnye-programmy' },
    { kz: 'Гранттар', ru: 'Гранты', url: '/granty' },
    { kz: 'Баспанамен қамтамасыз ету', ru: 'Обеспечение жильём', url: '/zhilyo' },
    { kz: 'Кәсіпкерлікті дамыту', ru: 'Развитие предпринимательства', url: '/predprinimatelstvo' },
    { kz: 'Ауылдарға қажет мамандар', ru: 'Востребованные специалисты в сёлах', url: '/specialisty-v-selah' },
    { kz: 'Шақыратын ауылдар', ru: 'Приглашающие сёла', url: '/priglashayushchie-sela' },
  ];

  const quickLinks = [
    { kz: 'Жаңалықтар', ru: 'Новости', url: '/news' },
    { kz: 'Байланыс', ru: 'Контакты', url: '/contacts' },
  ];

  return (
    <footer className="bg-gray-900 text-white pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/Auylga_icon.png" alt="Auylga.kz" className="w-10 h-10 object-contain rounded-lg flex-shrink-0" />
              <span className="text-xl font-bold">
                <span className="text-blue-400">Auylga</span>.kz
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {t(
                'Мемлекеттік қолдау бағдарламалары туралы ақпарат беретін ресми портал',
                'Официальный портал о государственных программах поддержки жителей сёл'
              )}
            </p>
            <div className="flex gap-3">
              <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors text-sm touch-manipulation">
                ✈️
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors text-sm touch-manipulation">
                📸
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-lg bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors text-sm touch-manipulation">
                👍
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">
              {t('Бағдарламалар', 'Программы')}
            </h4>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p.url}>
                  <Link to={p.url} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {currentLanguage.code === 'kz' ? p.kz : p.ru}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">
              {t('Жылдам сілтемелер', 'Быстрые ссылки')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.url}>
                  <Link to={l.url} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {currentLanguage.code === 'kz' ? l.kz : l.ru}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://business.enbek.kz" target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors">
                  Enbek.kz ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">
              {t('Байланыс', 'Контакты')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">📞</span>
                <div>
                  <p className="text-white text-sm font-medium">+7 (727) 123-45-67</p>
                  <p className="text-gray-500 text-xs">{t('Дүйсенбі — Жұма, 9:00–18:00', 'Пн — Пт, 9:00–18:00')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">✉️</span>
                <a href="mailto:info@auylga.kz" className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
                  info@auylga.kz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">📍</span>
                <p className="text-gray-400 text-sm">
                  {t('Алматы қ., Назарбаев даңғылы 123', 'г. Алматы, пр. Назарбаева 123')}
                </p>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm order-2 sm:order-1">
            © {year} Auylga.kz. {t('Барлық құқықтар қорғалған', 'Все права защищены')}
          </p>
          <div className="flex gap-4 text-sm text-gray-500 order-3 sm:order-2">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              {t('Құпиялылық саясаты', 'Политика конфиденциальности')}
            </Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              {t('Пайдалану шарттары', 'Условия использования')}
            </Link>
          </div>
          <a
            href="https://abai-it.kz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center order-1 sm:order-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg p-3 transition-colors"
            title="ABAI IT Valley"
          >
            <img src="/aitvicon.jpeg" alt="ABAI IT Valley" className="h-14 sm:h-16 w-auto max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
