// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuCategory from './components/MenuCategory';
import Cart from './components/Cart';
import MapSection from './components/MapSection';
import OrderHistory from './components/OrderHistory';
import AdminStats from './components/AdminStats';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import AdminPanel from './admin/AdminPanel'; // ✅ پنل ادمین
import { useCart } from './contexts/CartContext';
import { useLanguage } from './contexts/LanguageContext';
import { FaBars, FaMugHot, FaCookie, FaUtensils, FaSearch, FaShoppingCart } from 'react-icons/fa';

// داده‌های منو
const menuData = [
  {
    id: 'drinks',
    title: "نوشیدنی‌ها",
    en: "Drinks",
    icon: <FaMugHot />,
    items: [
      { id: 1, name: "اسپرسو دابل", en: "Double Espresso", desc: "دو شات قوی اسپرسو", price: 45000, image: "https://via.placeholder.com/300x200/e8d0c0/5d4037?text=اسپرسو" },
      { id: 2, name: "کاپوچینو کلاسیک", en: "Classic Cappuccino", desc: "شیر بخارپز شده با کف غنی", price: 55000, image: "https://via.placeholder.com/300x200/e8d0c0/5d4037?text=کاپوچینو" },
      { id: 3, name: "چای سبز", en: "Green Tea", desc: "با عطر گل‌های بهاری", price: 35000, image: "https://via.placeholder.com/300x200/e8d0c0/5d4037?text=چای+سبز" },
    ],
  },
  {
    id: 'desserts',
    title: "دسرها",
    en: "Desserts",
    icon: <FaCookie />,
    items: [
      { id: 4, name: "چیزکیک نیویورکی", en: "New York Cheesecake", desc: "خامه‌ای و خوشمزه", price: 65000, image: "https://via.placeholder.com/300x200/f5e0d0/8d6e63?text=چیزکیک" },
      { id: 5, name: "براونی گرم", en: "Warm Brownie", desc: "همراه با آیسکرم وانیل", price: 60000, image: "https://via.placeholder.com/300x200/f5e0d0/8d6e63?text=براونی" },
    ],
  },
  {
    id: 'foods',
    title: "غذاها",
    en: "Foods",
    icon: <FaUtensils />,
    items: [
      { id: 6, name: "ساندویچ مرغ گریل", en: "Grilled Chicken Sandwich", desc: "با سس خاص کافه", price: 95000, image: "https://via.placeholder.com/300x200/e0d0c0/5d4037?text=ساندویچ" },
      { id: 7, name: "پاستا کرمی", en: "Creamy Pasta", desc: "با قارچ و پنیر پارمزان", price: 85000, image: "https://via.placeholder.com/300x200/e0d0c0/5d4037?text=پاستا" },
    ],
  },
];

const allItems = menuData.flatMap(cat => 
  cat.items.map(item => ({ ...item, category: cat.id, categoryTitle: cat.title, categoryEn: cat.en }))
);

// کامپوننت اصلی منوی کاربر
function CafeApp() {
  const { t, lang } = useLanguage();
  const cart = useCart();
  const { items: cartItems } = cart;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // کلید مخفی برای پنل آمار (Shift + A)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setIsMenuOpen(false);
    setIsAnimating(false);
  };

  const handleAddToCart = (item) => {
    cart.addToCart(item);
    // نمایش اعلان در MenuItem.jsx
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const handleClick = (e) => {
      if (isCartOpen && !e.target.closest('.cart-modal') && !e.target.closest('.cart-icon-btn')) {
        setIsCartOpen(false);
      }
      if (showHistory && !e.target.closest('.cart-modal') && !e.target.closest('.history-btn')) {
        setShowHistory(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isCartOpen, showHistory]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const filteredItems = allItems.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      (lang === 'en' && item.en.toLowerCase().includes(term))
    );
  });

  const groupedFiltered = {};
  filteredItems.forEach(item => {
    if (!groupedFiltered[item.category]) {
      groupedFiltered[item.category] = [];
    }
    groupedFiltered[item.category].push(item);
  });

  const shouldShowSearchResults = searchTerm.trim() !== '';
  const categoriesToShow = shouldShowSearchResults
    ? Object.keys(groupedFiltered).map(catId => {
        const cat = menuData.find(c => c.id === catId);
        return { ...cat, items: groupedFiltered[catId] };
      })
    : selectedCategory === 'all'
      ? menuData
      : [menuData.find(cat => cat.id === selectedCategory)].filter(Boolean);

  return (
    <div style={{ position: 'relative', paddingBottom: '30px', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        position: 'sticky',
        top: '10px',
        zIndex: 10,
      }}>
        <h1 style={{ color: 'var(--text-color)', fontSize: '1.5rem', margin: 0 }}>
          {t('menu')}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="history-btn"
            onClick={() => setShowHistory(true)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '1.2rem' }}
          >
            📜
          </button>
          <button
            className="cart-icon-btn"
            onClick={toggleCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.6rem',
              cursor: 'pointer',
              color: 'var(--primary)',
              position: 'relative',
            }}
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
              }}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.8rem',
              cursor: 'pointer',
              color: 'var(--primary)',
              padding: 0,
            }}
            aria-label={t('menu')}
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Search */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
        <div style={{ position: 'relative', width: '90%', maxWidth: '500px' }}>
          <div style={{
            position: 'absolute',
            left: lang === 'fa' ? '12px' : 'auto',
            right: lang === 'fa' ? 'auto' : '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--primary)',
            pointerEvents: 'none',
          }}>
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: lang === 'fa' ? '12px 12px 12px 40px' : '12px 40px 12px 12px',
              borderRadius: '30px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              backgroundColor: 'var(--card-bg)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              direction: lang === 'fa' ? 'rtl' : 'ltr',
              fontFamily: '"Vazirmatn", sans-serif',
              color: 'var(--text-color)',
            }}
          />
        </div>
      </div>

      {/* Category Dropdown */}
      {isMenuOpen && (
        <div
          className={`category-dropdown ${isAnimating ? 'animate-in' : ''}`}
          onAnimationEnd={() => {
            if (isMenuOpen) setIsAnimating(false);
          }}
          style={{
            top: '100px',
            right: lang === 'fa' ? '20px' : 'auto',
            left: lang === 'fa' ? 'auto' : '20px',
          }}
        >
          <button
            onClick={() => handleCategorySelect('all')}
            className="dropdown-item"
          >
            📋 {t('all')}
          </button>
          {menuData.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="dropdown-item"
            >
              {cat.icon} {lang === 'fa' ? cat.title : cat.en}
            </button>
          ))}
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <Cart onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}

      {/* Order History Modal */}
      {showHistory && (
        <div className="cart-modal-overlay">
          <div className="cart-modal" style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--text-color)' }}>سابقه سفارشات</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', color: 'var(--text-color)' }}>
                &times;
              </button>
            </div>
            <OrderHistory />
          </div>
        </div>
      )}

      {/* Menu Content */}
      {categoriesToShow.length > 0 ? (
        categoriesToShow.map(cat => (
          <MenuCategory
            key={cat.id}
            title={lang === 'fa' ? cat.title : cat.en}
            icon={cat.icon}
            items={cat.items.map(item => ({
              ...item,
              name: lang === 'fa' ? item.name : item.en,
            }))}
            onAddToCart={handleAddToCart}
          />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          color: 'var(--text-color)',
          padding: '30px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          ❌ {lang === 'fa' ? 'موردی یافت نشد!' : 'No items found!'}
        </div>
      )}

      {/* Map Section */}
      <MapSection />

      {/* Admin Stats (مخفی با Shift + A) */}
      {showAdmin && <AdminStats />}
    </div>
  );
}

// کامپوننت اصلی با مسیریابی
export default function App() {
  return (
    <Router>
      <Routes>
        {/* منوی کاربر */}
        <Route 
          path="/" 
          element={
            <>
              <CafeApp />
              {/* ToastContainer برای react-hot-toast — اگر نیاز داشتی */}
            </>
          } 
        />
        
        {/* پنل ادمین */}
        <Route 
          path="/admin" 
          element={<AdminPanel />} 
        />
        
        {/* ریدایرکت به منو اگر مسیر اشتباه بود */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}