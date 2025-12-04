import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../utils/translations';

const LanguageContext = createContext(null);
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'fa';
    }
    return 'fa';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    }
  }, [lang]);
  const t = (key) => translations[lang]?.[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};