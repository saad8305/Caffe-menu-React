import React from 'react';
import StatusBadge from './StatusBadge';

export default function OrderItem({ order, onUpdateStatus }) {
  const { id, items, total, tableNumber, timestamp, status = 'در انتظار' } = order;
  const handleStatusChange=(newStatus)=>
    {
    onUpdateStatus(id, newStatus);
  };
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
      borderLeft: status === 'در انتظار' 
        ? '4px solid #ff9800' 
        : status === 'آماده' 
          ? '4px solid #4caf50' 
          : '4px solid #2196f3'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div>
          <strong>شماره سفارش:</strong> {id}<br />
          <strong>میز:</strong> {tableNumber}
        </div>
        <div style={{ textAlign: 'right', color: '#666', fontSize: '0.9rem' }}>
          {new Date(timestamp).toLocaleDateString('fa-IR')}<br />
          {new Date(timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>آیتم‌ها:</strong>
        {items.map(item => (
          <div key={item.id} style={{ 
            padding: '6px 0', 
            paddingLeft: '10px',
            borderLeft: '2px solid #eee'
          }}>
            {item.name} × {item.quantity} — {(item.price * item.quantity).toLocaleString()} تومان
          </div>
        ))}
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '10px',
        borderTop: '1px dashed #eee'
      }}>
        <div>
          <strong>جمع کل:</strong> {total.toLocaleString()} تومان
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <StatusBadge status={status} />
          <div style={{ display: 'flex', gap: '6px' }}>
            {status === 'در انتظار' && (
              <button
                onClick={() => handleStatusChange('آماده')}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                آماده
              </button>
            )}
            {status === 'آماده' && (
              <button
                onClick={() => handleStatusChange('تحویل داده شد')}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                تحویل
              </button>
            )}
            {status === 'در انتظار' && (
              <button
                onClick={() => handleStatusChange('لغو شد')}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                لغو
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}