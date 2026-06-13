import { useState } from 'react';
import { X, Bell, Info } from 'lucide-react';
import './PriceAlertModal.css';

const PriceAlertModal = ({ deal, onClose }) => {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !targetPrice) return;
    setStatus('loading');
    try {
      const url = `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${encodeURIComponent(email)}&gameID=${deal.gameID}&price=${targetPrice}`;
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
          <h2>Fiyat Alarmı Kur</h2>
        </div>
        
        <p className="modal-game-title">{deal.title}</p>
        <p className="modal-current-price">Güncel fiyat: <strong>${parseFloat(deal.salePrice).toFixed(2)}</strong></p>

        {status === 'success' ? (
          <div className="modal-success">
            <span>✅</span>
            <p>Alarm kuruldu! Oyun hedef fiyata düştüğünde <strong>{email}</strong> adresine e-posta gönderilecek.</p>
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
            <div className="modal-field">
              <label>Hedef Fiyat ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Örn: 2.99"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                required
              />
            </div>
            <div className="modal-info">
              <Info size={14} />
              <span>CheapShark, oyun bu fiyata düştüğünde sana ücretsiz bildirim gönderecek.</span>
            </div>
            {status === 'error' && (
              <p className="modal-error">Bir hata oluştu. Lütfen tekrar dene.</p>
            )}
            <button type="submit" className="modal-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Kaydediliyor...' : '🔔 Alarm Kur'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PriceAlertModal;
