import { useState } from 'react';
import { Tag, Heart } from 'lucide-react';
import InfoPanel from './InfoPanel';
import WishlistView from './WishlistView';
import './Header.css';

const Header = () => {
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <div className="logo-area">
          <Tag className="logo-icon" size={28} />
          <h1 className="logo-text">İndirim<span className="accent">Yakalayıcı</span></h1>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link active">Fırsatlar</a>
          <button className="wishlist-trigger-btn" onClick={() => setShowWishlist(true)} title="Steam İstek Listeni Tara">
            <Heart size={18} />
            <span>İstek Listesi</span>
          </button>
          <InfoPanel />
        </nav>
      </div>
      {showWishlist && <WishlistView onClose={() => setShowWishlist(false)} />}
    </header>
  );
};

export default Header;
