import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.4rem',
        cursor: 'pointer',
        color: theme === 'dark' ? '#FFD700' : '#5d4037',
      }}
      aria-label={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}