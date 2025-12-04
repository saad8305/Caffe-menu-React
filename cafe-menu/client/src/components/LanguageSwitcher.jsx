import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={() => setLang('fa')}
        style={{
          background: lang === 'fa' ? '#8d6e63' : '#e0e0e0',
          color: lang === 'fa' ? 'white' : '#333',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        FA
      </button>
      <button
        onClick={() => setLang('en')}
        style={{
          background: lang === 'en' ? '#8d6e63' : '#e0e0e0',
          color: lang === 'en' ? 'white' : '#333',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        EN
      </button>
    </div>
  );
}