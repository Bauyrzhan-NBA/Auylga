import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Language } from '../types';

const LANG_STORAGE_KEY = 'language';

const LANGUAGES: Language[] = [
  { code: 'kz', name: 'Kazakh', nativeName: 'Қазақша' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === 'kz' || saved === 'ru') {
    const found = LANGUAGES.find((l) => l.code === saved);
    if (found) return found;
  }
  return LANGUAGES[0];
}

interface LanguageContextValue {
  currentLanguage: Language;
  languages: Language[];
  changeLanguage: (language: Language) => void;
  t: (kzText: string, ruText: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem(LANG_STORAGE_KEY, language.code);
  }, []);

  const t = useCallback(
    (kzText: string, ruText: string) => (currentLanguage.code === 'kz' ? kzText : ruText),
    [currentLanguage.code]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      currentLanguage,
      languages: LANGUAGES,
      changeLanguage,
      t,
    }),
    [currentLanguage, changeLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageProvider');
  return ctx;
}
