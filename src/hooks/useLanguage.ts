import { useEffect } from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';

export const useLanguage = () => {
  const value = useLanguageContext();

  useEffect(() => {
    document.documentElement.lang = value.currentLanguage.code;
  }, [value.currentLanguage.code]);

  return value;
};
