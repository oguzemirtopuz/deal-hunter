import { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import PriceAlertModal from './PriceAlertModal';
import './DealCard.css';

/* Converts dealRating number to color */
const getRatingColor = (rating) => {
  const r = parseFloat(rating);
  if (r >= 8) return '#10b981'; // green
  if (r >= 5) return '#f59e0b'; // yellow
  return '#ef4444'; // red
};

/* Converts Steam review text to Turkish */
const translateReview = (text) => {
  const map = {
    'Overwhelmingly Positive': '😍 Ezici Şekilde Olumlu',
    'Very Positive': '👍 Çok Olumlu',
    'Mostly Positive': '🙂 Çoğunlukla Olumlu',
    'Mixed': '😐 Karışık',
    'Mostly Negative': '👎 Çoğunlukla Olumsuz',
    'Very Negative': '😞 Çok Olumsuz',
    'Overwhelmingly Negative': '💀 Ezici Şekilde Olumsuz',
    'Positive': '👍 Olumlu',
    'Negative': '👎 Olumsuz',
  };
  return map[text] || text;
};

const DealCard = ({ deal }) => {
  const [trPrice, setTrPrice] = useState(null);
  const [loadingTr, setLoadingTr] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSet, setAlertSet] = useState(() => {
    try {
      const savedAlerts = JSON.parse(localStorage.getItem('dealHunterAlerts') || '[]');
      return savedAlerts.includes(deal.gameID);
    } catch {
      return false;
    }
  });
  const [expanded, setExpanded] = useState(false);
  const [priceHistory, setPriceHistory] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [steamReview, setSteamReview] = useState(null);
  const cardRef = useRef(null);

  const isEpic = deal.storeID === '25';
  const storeName = isEpic ? 'Epic Games' : 'Steam';
  const salePrice = parseFloat(deal.salePrice).toFixed(2);
  const normalPrice = parseFloat(deal.normalPrice).toFixed(2);
  const savings = Math.round(parseFloat(deal.savings));
  const dealUrl = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
  const dealRating = deal.dealRating ? parseFloat(deal.dealRating).toFixed(1) : null;

  // Fetch Steam review via Intersection Observer (lazy)
  useEffect(() => {
    if (!deal.steamAppID || isEpic) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          fetchSteamReview();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchSteamReview = async () => {
    try {
      const res = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${deal.gameID}`);
      const data = await res.json();
      if (data && data.info) {
        setSteamReview({
          text: data.info.steamRatingText,
          percent: data.info.steamRatingPercent,
        });
      }
    } catch {}
  };

  const fetchTRPrice = async () => {
    if (!deal.steamAppID) return;
    setLoadingTr(true);
    try {
      const url = `/steam-api/appdetails?appids=${deal.steamAppID}&cc=tr&filters=price_overview`;
      const response = await fetch(url);
      const data = await response.json();
      const appData = data[deal.steamAppID];
      if (appData && appData.success && appData.data && appData.data.price_overview) {
        setTrPrice(appData.data.price_overview.final_formatted.replace(' USD', ''));
      } else {
        setTrPrice('Bulunamadı');
      }
    } catch {
      setTrPrice('Hata');
    } finally {
      setLoadingTr(false);
    }
  };

  const fetchPriceHistory = async () => {
    if (priceHistory || loadingHistory) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${deal.gameID}`);
      const data = await res.json();
      if (data && data.cheapestPriceEver) {
        const date = new Date(data.cheapestPriceEver.date * 1000).toLocaleDateString('tr-TR', {
          day: 'numeric', month: 'long', year: 'numeric'
        });
        setPriceHistory({ price: data.cheapestPriceEver.price, date });
      }
    } catch {} finally {
      setLoadingHistory(false);
    }
  };

  const handleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (newExpanded) fetchPriceHistory();
  };

  return (
    <>
      <div className="deal-card glass-panel animate-fade-in" ref={cardRef}>
        <div className="card-image-wrapper">
          <img src={deal.thumb} alt={deal.title} className="card-image" loading="lazy" />
          <div className="discount-badge">-{savings}%</div>
          {dealRating && (
            <div
              className="deal-rating-badge"
              style={{ background: getRatingColor(dealRating) }}
              title="Fırsat Skoru (10 üzerinden)"
            >
              🔥 {dealRating}
            </div>
          )}
        </div>

        <div className="card-content">
          <h3 className="game-title" title={deal.title}>{deal.title}</h3>

          <div className="card-meta">
            <div className={`store-badge ${isEpic ? 'epic' : 'steam'}`}>{storeName}</div>
            {steamReview && steamReview.text && (
              <div className="steam-review-badge" title={`Steam Oyuncu Yorumları: %${steamReview.percent} olumlu`}>
                {translateReview(steamReview.text)}
              </div>
            )}
          </div>

          <div className="price-container">
            <div className="prices-wrapper">
              <div className="prices">
                <span className="normal-price">${normalPrice}</span>
                {trPrice && trPrice !== 'Bulunamadı' && trPrice !== 'Hata' ? (
                  <span className="sale-price" style={{ color: 'var(--accent-green)' }}>{trPrice}</span>
                ) : (
                  <span className="sale-price">${salePrice}</span>
                )}
              </div>

              {storeName === 'Steam' && deal.steamAppID && !trPrice && (
                <button onClick={fetchTRPrice} disabled={loadingTr} className="tr-price-button">
                  {loadingTr ? <RefreshCw size={14} className="spinner" /> : '🇹🇷 TR Fiyatı'}
                </button>
              )}

              {storeName === 'Epic Games' && (
                <div className="epic-warning">⚠️ Mağazada TL'ye dönüşür</div>
              )}

              {(trPrice === 'Bulunamadı' || trPrice === 'Hata') && (
                <span className="tr-price-error">TR Fiyatı Alınamadı</span>
              )}
            </div>

            <div className="card-actions">
              <a href={dealUrl} target="_blank" rel="noopener noreferrer" className="buy-button">
                Fırsata Git <ExternalLink size={16} />
              </a>
              <button
                className={`alert-button ${alertSet ? 'alert-set' : ''}`}
                onClick={() => setShowAlert(true)}
                title="Fiyat alarmı kur"
              >
                <Bell size={16} fill={alertSet ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Expandable price history */}
          <button className="expand-toggle" onClick={handleExpand}>
            {expanded ? <><ChevronUp size={14} /> Gizle</> : <><ChevronDown size={14} /> Fiyat Geçmişi</>}
          </button>

          {expanded && (
            <div className="price-history">
              {loadingHistory ? (
                <p className="history-loading">Yükleniyor...</p>
              ) : priceHistory ? (
                <>
                  <p className="history-label">📊 Tarihin En Düşük Fiyatı</p>
                  <p className="history-value">
                    {priceHistory.price ? `$${priceHistory.price}` : 'Ücretsiz'}
                  </p>
                  <p className="history-date">{priceHistory.date}</p>
                </>
              ) : (
                <p className="history-loading">Geçmiş fiyat bilgisi bulunamadı.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showAlert && (
        <PriceAlertModal 
          deal={deal} 
          onClose={() => setShowAlert(false)} 
          onSuccess={() => {
            setAlertSet(true);
            try {
              const savedAlerts = JSON.parse(localStorage.getItem('dealHunterAlerts') || '[]');
              if (!savedAlerts.includes(deal.gameID)) {
                savedAlerts.push(deal.gameID);
                localStorage.setItem('dealHunterAlerts', JSON.stringify(savedAlerts));
              }
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </>
  );
};

export default DealCard;
