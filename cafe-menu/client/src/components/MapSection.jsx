import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MapSection() {
  const { t, lang } = useLanguage();
  const cafeAddress = "Location adress here!";
  const googleMapsUrl ="Location URL here!";
  const handleNavigate = () => {
    window.open(googleMapsUrl, '_blank');
  };
  return (
    <div style={{
      marginTop: '40px',
      padding: '20px',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '16px',
      boxShadow: 'var(--shadow)',
      textAlign: lang === 'fa' ? 'right' : 'left',
    }}>
      <h3 style={{ color: 'var(--text-color)', marginBottom: '12px' }}>
        {t('cafeAddress')}
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
        {cafeAddress}
      </p>
      <button
        onClick={handleNavigate}
        style={{
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0 auto',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        {t('navigate')}
      </button>
    </div>
  );
}