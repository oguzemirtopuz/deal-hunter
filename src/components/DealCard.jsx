import { ExternalLink } from 'lucide-react';
import './DealCard.css';

const DealCard = ({ deal }) => {
  const isEpic = deal.storeID === '25' || deal.storeID === '28';
  const storeName = isEpic ? 'Epic Games' : 'Steam';
  const storeColor = isEpic ? '#ffffff' : '#1b2838'; // Note: steam uses blueish, epic uses white/black
  
  // Format price
  const salePrice = parseFloat(deal.salePrice).toFixed(2);
  const normalPrice = parseFloat(deal.normalPrice).toFixed(2);
  const savings = Math.round(parseFloat(deal.savings));

  const dealUrl = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;

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
          <div className="prices">
            <span className="normal-price">${normalPrice}</span>
            <span className="sale-price">${salePrice}</span>
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
