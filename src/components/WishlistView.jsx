import { useState } from 'react';
import { X, Heart, Search, Loader, ExternalLink, AlertCircle, Info } from 'lucide-react';
import { fetchSteamWishlist, fetchWishlistDeals } from '../services/wishlist';
import './WishlistView.css';

const WishlistView = ({ onClose }) => {
  const [steamInput, setSteamInput] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'loading' | 'results' | 'error'
  const [deals, setDeals] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!steamInput.trim()) return;
    setStep('loading');
    try {
      const wishlist = await fetchSteamWishlist(steamInput);
      setWishlistCount(wishlist.length);
      const activeDeals = await fetchWishlistDeals(wishlist);
      setDeals(activeDeals);
      setStep('results');
    } catch (err) {
      setErrorMsg(err.message || 'Bir hata oluştu.');
      setStep('error');
    }
  };

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title">
            <Heart size={22} className="wishlist-icon" />
            <h2>Steam İstek Listesi</h2>
          </div>
          <button className="wishlist-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Input Step */}
        {(step === 'input' || step === 'error') && (
          <div className="wishlist-input-area">
            <p className="wishlist-desc">
              Steam profil adını veya Steam64 ID'ni gir. İndirimde olan istek listesi oyunlarını gösterelim!
            </p>
            <form onSubmit={handleSearch} className="wishlist-form">
              <div className="wishlist-search-row">
                <input
                  type="text"
                  placeholder="Örn: oguzemirtopuz veya 765611980..."
                  value={steamInput}
                  onChange={(e) => setSteamInput(e.target.value)}
                  className="wishlist-input"
                  autoFocus
                />
                <button type="submit" className="wishlist-search-btn">
                  <Search size={18} />
                </button>
              </div>
            </form>

            {step === 'error' && (
              <div className="wishlist-error">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="wishlist-hint">
              <Info size={14} />
              <span>
                Steam istek listeni herkese açık (public) yapmayı unutma!
                <br />
                <strong>Steam → Profil → Gizlilik Ayarları → İstek Listesi: Herkese Açık</strong>
              </span>
            </div>
          </div>
        )}

        {/* Loading Step */}
        {step === 'loading' && (
          <div className="wishlist-loading">
            <Loader size={36} className="wishlist-spinner" />
            <p>İstek listesi taranıyor...</p>
            <span>İndirimdeki oyunlar kontrol ediliyor, lütfen bekle.</span>
          </div>
        )}

        {/* Results Step */}
        {step === 'results' && (
          <div className="wishlist-results">
            <div className="wishlist-summary">
              <span>
                <strong>{wishlistCount}</strong> oyundan <strong>{deals.length}</strong> tanesi şu an indirimde 🎉
              </span>
              <button className="wishlist-reset" onClick={() => { setStep('input'); setSteamInput(''); }}>
                Yeni Arama
              </button>
            </div>

            {deals.length === 0 ? (
              <div className="wishlist-empty">
                <span>😔</span>
                <p>İstek listendeki oyunların hiçbiri şu an indirimde değil.</p>
                <span className="wishlist-empty-sub">Yakında indirime girebilirler, tekrar kontrol et!</span>
              </div>
            ) : (
              <div className="wishlist-deals-list">
                {deals.map((deal, i) => {
                  const savings = Math.round(parseFloat(deal.savings));
                  const salePrice = parseFloat(deal.salePrice).toFixed(2);
                  const normalPrice = parseFloat(deal.normalPrice).toFixed(2);
                  const dealUrl = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
                  return (
                    <div key={i} className="wishlist-deal-row">
                      <img
                        src={deal._capsule || deal.thumb}
                        alt={deal._wishlistName || deal.title}
                        className="wishlist-deal-img"
                        onError={(e) => { e.target.src = deal.thumb; }}
                      />
                      <div className="wishlist-deal-info">
                        <p className="wishlist-deal-title">{deal._wishlistName || deal.title}</p>
                        <div className="wishlist-deal-prices">
                          <span className="wishlist-normal-price">${normalPrice}</span>
                          <span className="wishlist-sale-price">${salePrice}</span>
                          <span className="wishlist-savings-badge">-{savings}%</span>
                        </div>
                      </div>
                      <a
                        href={dealUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wishlist-go-btn"
                        title="Fırsata Git"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistView;
