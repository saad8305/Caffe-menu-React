import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import ReceiptModal from './ReceiptModal';

export default function Cart({ onClose }) {
  const { items, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleOrder=async()=>{
    if (items.length === 0)
      {
      toast.error(t('emptyCart'));
      return;
    }
    const input = prompt(
      lang === 'fa'
        ? 'لطفاً شماره میز خود را وارد کنید:'
        : 'Please enter your table number:'
    );
    if (input === null) return;
    const trimmed = input.trim();
    if (!trimmed || isNaN(trimmed)) {
      toast.error(
        lang === 'fa'
          ? '⚠️ لطفاً یک شماره میز معتبر وارد کنید.'
          : '⚠️ Please enter a valid table number.'
      );
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try
    {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(({ quantity, ...rest })=>({ ...rest, quantity })),
          total,
          tableNumber: trimmed,
        }),
      });
      if (response.ok) {
        const orderData = await response.json();
        toast.success(
          lang === 'fa'
            ? `✅ سفارش شما برای میز ${trimmed} ثبت شد!`
            : `✅ Order confirmed for table ${trimmed}!`,
          { duration: 4000 }
        );
        clearCart();
        setCurrentOrder({
          ...orderData,
          items: items,
          total: total,
          tableNumber: trimmed,
        });
        setShowReceipt(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(
          errorData.error ||
          (lang === 'fa' ? 'خطا در ثبت سفارش' : 'Error placing order')
        );
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.error(
        lang === 'fa'
          ? 'خطا در اتصال به سرور'
          : 'Failed to connect to server'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <h2 style={{ color: 'var(--text-color)' }}>{t('cart')}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.4rem',
              cursor: 'pointer',
              color: 'var(--text-color)',
            }}
          >
            <FaTimes />
          </button>
        </div>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>{t('emptyCart')}</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-color)',
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginInlineEnd: '12px' }}
                />
                <div style={{ flex: 1, color: 'var(--text-color)' }}>
                  <div>{item.name}</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {item.quantity} × {item.price.toLocaleString()} {lang === 'fa' ? 'تومان' : 'T'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const { removeFromCart } = useCart();
                    removeFromCart(item.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e91e63',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div style={{
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '2px solid var(--primary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'var(--text-color)',
            }}>
              <strong style={{ fontSize: '1.2rem' }}>
                {lang === 'fa' ? 'جمع کل:' : 'Total:'} {total.toLocaleString()} {lang === 'fa' ? 'تومان' : 'T'}
              </strong>
              <button
                onClick={handleOrder}
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#9e9e9e' : 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'در حال ارسال...' : t('orderNow')}
              </button>
            </div>
          </>
        )}
      </div>
      {showReceipt && (
        <ReceiptModal 
          order={currentOrder} 
          onClose={() => setShowReceipt(false)} 
        />
      )}
    </>
  );
}