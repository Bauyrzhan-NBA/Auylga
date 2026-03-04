import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../hooks/useLanguage';

const navLinks = [
  { label_kz: 'Әлеуметтік бағдарламалар', label_ru: 'Социальные программы', url: '/socialnye-programmy' },
  { label_kz: 'Гранттар', label_ru: 'Гранты', url: '/granty' },
  { label_kz: 'Баспанамен қамтамасыз ету', label_ru: 'Обеспечение жильём', url: '/zhilyo' },
  { label_kz: 'Кәсіпкерлікті дамыту', label_ru: 'Развитие предпринимательства', url: '/predprinimatelstvo' },
  { label_kz: 'Ауылдарға қажет мамандар', label_ru: 'Востребованные специалисты в сёлах', url: '/specialisty-v-selah' },
  { label_kz: 'Шақыратын ауылдар', label_ru: 'Приглашающие сёла', url: '/priglashayushchie-sela' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentLanguage, languages, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLabel = (link: (typeof navLinks)[0]) => currentLanguage.code === 'kz' ? link.label_kz : link.label_ru;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' : 'bg-white border-b border-gray-100'
      }`}
    >
      {/* Верхняя полоса */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white text-xs py-2.5 sm:py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2">
          <span className="opacity-95 truncate min-w-0 font-medium tracking-wide">
            {t('Мемлекеттік қолдау порталы', 'Портал государственной поддержки')}
          </span>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <GlobeAltIcon className="h-3.5 w-3.5 opacity-80 flex-shrink-0" aria-hidden />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`min-w-[2rem] min-h-[2rem] sm:min-w-0 sm:min-h-0 font-semibold transition-all rounded-md px-1.5 py-0.5 ${
                  currentLanguage.code === lang.code
                    ? 'bg-white/20 text-white'
                    : 'opacity-75 hover:opacity-100 hover:bg-white/10'
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 min-h-[4rem] sm:h-[4.25rem]">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 min-w-0 group">
              <img
                src="/Auylga_icon.png"
                alt="Auylga.kz"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl flex-shrink-0 ring-2 ring-primary-100 group-hover:ring-primary-200 transition-shadow"
              />
              <span className="text-primary-700 font-extrabold text-lg sm:text-xl leading-none truncate tracking-tight">
                Auylga<span className="text-primary-500">.kz</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1 min-w-0 max-w-4xl mx-2">
              {navLinks.map((link) => {
                const active = location.pathname === link.url;
                const label = navLabel(link);
                return (
                  <Link
                    key={link.url}
                    to={link.url}
                    title={label}
                    className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap overflow-hidden text-ellipsis max-w-[11rem] ${
                      active
                        ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/contacts"
                className="hidden sm:inline-flex items-center px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-soft hover:shadow-card transition-all"
              >
                {t('Байланыс', 'Связаться')}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 min-w-[2.75rem] min-h-[2.75rem] rounded-xl text-gray-500 hover:bg-gray-100 active:bg-gray-200 touch-manipulation flex items-center justify-center transition-colors"
                aria-label={mobileOpen ? t('Мәзірді жабу', 'Закрыть меню') : t('Мәзір', 'Меню')}
              >
                {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={`block px-3 py-3.5 rounded-xl text-sm font-semibold transition-colors touch-manipulation min-h-[2.75rem] flex items-center ${
                    location.pathname === link.url
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-white active:bg-gray-100'
                  }`}
                >
                  {navLabel(link)}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 flex gap-3 px-3 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                    className={`text-sm font-semibold rounded-lg px-3 py-1.5 transition-colors ${
                      currentLanguage.code === lang.code ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
