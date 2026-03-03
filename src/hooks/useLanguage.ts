import { useState, useEffect } from 'react';
import { Language } from '../types';

const languages: Language[] = [
  { code: 'kz', name: 'Kazakh', nativeName: 'Қазақша' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0] as 'kz' | 'ru';
    const defaultLang = saved && languages.find(lang => lang.code === saved) 
      ? languages.find(lang => lang.code === saved)! 
      : languages.find(lang => lang.code === browserLang) || languages[0];
    
    return defaultLang;
  });

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    
    // Update URL if needed
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/kz/') || currentPath.startsWith('/ru/')) {
      const newPath = currentPath.replace(/^\/(kz|ru)\//, `/${language.code}/`);
      window.history.replaceState({}, '', newPath);
    }
  };

  const t = (kzText: string, ruText: string) => {
    return currentLanguage.code === 'kz' ? kzText : ruText;
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  return {
    currentLanguage,
    languages,
    changeLanguage,
    t,
  };
};
