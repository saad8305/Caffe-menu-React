import React from 'react';

export default function StatusBadge({ status }) {
  const getColor = () => {
    switch (status) {
      case 'در انتظار': return '#ff9800';
      case 'آماده': return '#4caf50';
      case 'تحویل داده شد': return '#2196f3';
      case 'لغو شد': return '#f44336';
      default: return '#9e9e9e';
    }
  };
  return (
    <span style={{
      padding: '4px 10px',
      backgroundColor: getColor() + '20',
      color: getColor(),
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      border: `1px solid ${getColor()}40`
    }}>
      {status}
    </span>
  );
}