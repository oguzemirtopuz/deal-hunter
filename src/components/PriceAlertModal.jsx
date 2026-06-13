import { useState } from 'react';
import { X, Bell, Info } from 'lucide-react';
import './PriceAlertModal.css';

const PriceAlertModal = ({ deal, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'

  // Send alert at price 0.01 — CheapShark interprets this as "alert me when any deal exists"
  // or use current salePrice so they get alerted when it drops to current or below
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      // Using 0 triggers notification whenever the game has any active deal
      const url = `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${encodeURIComponent(email)}&gameID=${deal.gameID}&price=${deal.salePrice}`;
      const res = await fetch(url);
      const text = await res.text();
      if (text === 'true') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-header">
          <Bell size={24} className="modal-icon" />
          <h2>İndirim Bildirimi</h2>
        </div>
        
        <p className="modal-game-title">{deal.title}</p>
        <p className="modal-current-price">
          Şu anki indirimli fiyat: <strong>${parseFloat(deal.salePrice).toFixed(2)}</strong>
        </p>

        {status === 'success' ? (
          <div className="modal-success">
            <span>✅</span>
            <p>
              Bildirim kaydedildi! <strong>{email}</strong> adresine bu oyun indirime girdiğinde
              veya fiyatı düştüğünde otomatik e-posta gönderilecek.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-field">
              <label>E-posta Adresin</label>
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="modal-info">
              <Info size={14} />
              <span>
                Bu oyun indirime girdiğinde veya mevcut indirim daha da düştüğünde
                CheapShark sana ücretsiz e-posta bildirim gönderecek.
              </span>
            </div>

            {status === 'error' && (
              <p className="modal-error">Bir hata oluştu. Lütfen tekrar dene.</p>
            )}

            <button type="submit" className="modal-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Kaydediliyor...' : '🔔 Bildirim Kur'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PriceAlertModal;
