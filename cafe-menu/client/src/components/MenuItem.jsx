import React from 'react';
import { FaChair } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

export default function MenuItem({ name, desc, price, image, onAddToCart, itemData }) {
  const { t, lang } = useLanguage();
  const reserveItem = () => {
    const tableNumber = prompt(
      lang === 'fa'
        ? `شما قصد رزرو "${name}" را دارید.\nلطفاً شماره میز خود را وارد کنید:`
        : `You want to reserve "${name}".\nEnter your table number:`
    );
    if (tableNumber && !isNaN(tableNumber.trim())) {
      toast.success(
        lang === 'fa'
          ? `✅ درخواست شما برای میز شماره ${tableNumber.trim()} با موفقیت ثبت شد!`
          : `✅ Your request for table ${tableNumber.trim()} has been confirmed!`
      );
    } else if (tableNumber !== null) {
      toast.error(lang === 'fa' ? '⚠️ لطفاً یک شماره میز معتبر وارد کنید.' : '⚠️ Please enter a valid table number.');
    }
  };
  const handleAddToCart = () => {
    if (onAddToCart && itemData) {
      onAddToCart(itemData);
      toast.success(t('addedToCart'), {
        position: lang === 'fa' ? 'top-right' : 'top-left',
      });
    }
  };
  return (
    <div className="menu-item-card">
      <div className="menu-item-image-container">
        <img 
          src={image || "https://via.placeholder.com/300x200/f5f0e9/8d6e63?text=No+Image"} 
          alt={name}
          className="menu-item-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200/f5f0e9/8d6e63?text=عکس+نا+موجود";
          }}
        />
      </div>
      <div className="menu-item-content">
        <h3 className="item-name">{name}</h3>
        <p className="item-desc">{desc}</p>
        <div className="item-footer">
          <span className="item-price">{price.toLocaleString()} {lang === 'fa' ? 'تومان' : 'T'}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="reserve-btn" onClick={reserveItem}>
              <FaChair /> {t('reserveTable')}
            </button>
            <button 
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}