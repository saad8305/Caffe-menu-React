import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';

const API_BASE='http://localhost:3001/api/orders';
export default function AdminPanel()
{
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const fetchOrders=async()=>{
    try
    {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('خطا در دریافت سفارشات:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('خطا در به‌روزرسانی وضعیت:', err);
    }
  };
  if (loading)
    {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        در حال بارگذاری سفارشات...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e8f5e9',
        borderRadius: '12px'
      }}>
        <h2 style={{ color: '#2e7d32', margin: 0 }}>📊 پنل مدیریت کافه</h2>
        <div style={{ fontSize: '0.9rem', color: '#555' }}>
          تعداد سفارشات: <strong>{orders.length}</strong>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3>سفارشی وجود ندارد!</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.map(order => (
            <OrderItem
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}