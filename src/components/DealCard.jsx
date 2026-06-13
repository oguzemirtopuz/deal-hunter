import { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import './DealCard.css';

const DealCard = ({ deal }) => {
  const [trPrice, setTrPrice] = useState(null);
  const [loadingTr, setLoadingTr] = useState(false);

  const isEpic = deal.storeID === '25';
  const storeName = isEpic ? 'Epic Games' : 'Steam';
  
  const salePrice = parseFloat(deal.salePrice).toFixed(2);
  const normalPrice = parseFloat(deal.normalPrice).toFixed(2);
  const savings = Math.round(parseFloat(deal.savings));
  const dealUrl = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;

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
        setTrPrice("Bulunamadı");
      }
    } catch (err) {
      console.error("Fiyat çekilemedi:", err);
      setTrPrice("Hata");
    } finally {
      setLoadingTr(false);
    }
  };

  return (
    <div className="deal-card glass-panel animate-fade-in">
      <div className="card-image-wrapper">
        <img src={deal.thumb} alt={deal.title} className="card-image" loading="lazy" />
        <div className="discount-badge">-{savings}%</div>
      </div>
      
      <div className="card-content">
        <h3 className="game-title" title={deal.title}>{deal.title}</h3>
        
        <div className="store-badge" style={{ borderColor: isEpic ? '#333' : '#1b2838' }}>
          {storeName}
        </div>
        
        <div className="price-container">
          <div className="prices-wrapper">
            <div className="prices">
              <span className="normal-price">${normalPrice}</span>
              {trPrice && trPrice !== "Bulunamadı" && trPrice !== "Hata" ? (
                <span className="sale-price" style={{color: 'var(--accent-green)'}}>{trPrice}</span>
              ) : (
                <span className="sale-price">${salePrice}</span>
              )}
            </div>
            {storeName === 'Steam' && deal.steamAppID && !trPrice && (
              <button onClick={fetchTRPrice} disabled={loadingTr} className="tr-price-button">
                {loadingTr ? <RefreshCw size={14} className="spinner" /> : "🇹🇷 TR Fiyatı"}
              </button>
            )}
            {trPrice === "Bulunamadı" || trPrice === "Hata" ? (
              <span className="tr-price-error">TR Fiyatı Alınamadı</span>
            ) : null}
          </div>
          
          <a href={dealUrl} target="_blank" rel="noopener noreferrer" className="buy-button">
            Fırsata Git
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
