import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function AdminStats() {
  const { orders } = useCart();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const today = new Date();
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.timestamp);
    return orderDate.toDateString() === today.toDateString();
  });
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e8f5e9', 
      borderRadius: '12px',
      marginTop: '30px',
      border: '2px dashed #4caf50'
    }}>
      <h3>📊 آمار مدیریت (Shift + A برای بستن)</h3>
      <p>تعداد کل سفارشات: <strong>{orders.length}</strong></p>
      <p>سفارشات امروز: <strong>{todayOrders.length}</strong></p>
      <p>درآمد کل: <strong>{totalRevenue.toLocaleString()} تومان</strong></p>
    </div>
  );
}