import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function OrderHistory() {
  const { orders } = useCart();
  const { t, lang } = useLanguage();
  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
        {t('noOrders')}
      </div>
    );
  }
  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>{t('orderHistory')}</h3>
      {orders.map(order => (
        <div key={order.id} style={{
          padding: '16px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          marginBottom: '15px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <div>شماره سفارش: {order.id}</div>
          <div>میز: {order.tableNumber}</div>
          <div>جمع: {order.total.toLocaleString()} تومان</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            {new Date(order.timestamp).toLocaleDateString('fa-IR')}
          </div>
        </div>
      ))}
    </div>
  );
}