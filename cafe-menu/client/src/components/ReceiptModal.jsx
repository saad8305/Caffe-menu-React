import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function ReceiptModal({ order, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = `ORDER:${order.id}|TABLE:${order.tableNumber}|TOTAL:${order.total}`;
        const dataUrl = await QRCode.toDataURL(url);
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();
  }, [order]);

  const printReceipt = () => {
    window.print();
  };
  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal" style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text-color)' }}>رسید سفارش</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', color: 'var(--text-color)' }}>
            &times;
          </button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>شماره سفارش: {order.id}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            تاریخ: {new Date(order.timestamp).toLocaleDateString('fa-IR')}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            میز: {order.tableNumber}
          </div>
        </div>
        <div style={{ borderTop: '1px dashed var(--border-color)', padding: '10px 0' }}>
          {order.items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0' }}>
              <span>{item.name} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
            </div>
          ))}
        </div>
        <div style={{ 
          marginTop: '15px', 
          paddingTop: '10px', 
          borderTop: '2px solid var(--primary)',
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          جمع کل: <span>{order.total.toLocaleString()} تومان</span>
        </div>
        {qrDataUrl && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <img src={qrDataUrl} alt="QR Code" style={{ width: '120px', height: '120px' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              برای اسکن توسط پرسنل
            </div>
          </div>
        )}
        <button
          onClick={printReceipt}
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          چاپ رسید
        </button>
      </div>
    </div>
  );
}