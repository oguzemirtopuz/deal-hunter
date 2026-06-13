import DealCard from './DealCard';
import { Loader2 } from 'lucide-react';
import './DealsList.css';

const DealsList = ({ deals, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>İndirimler aranıyor...</p>
      </div>
    );
  }

  if (!deals || deals.length === 0) {
    return (
      <div className="empty-state">
        <p>Arama kriterlerinize uygun indirim bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="deals-grid">
      {deals.map((deal) => (
        <DealCard key={deal.dealID} deal={deal} />
      ))}
    </div>
  );
};

export default DealsList;
