import { useState } from 'react';
import { Tag, Menu, X } from 'lucide-react';
import InfoPanel from './InfoPanel';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <div className="logo-area">
          <Tag className="logo-icon" size={28} />
          <h1 className="logo-text">İndirim<span className="accent">Yakalayıcı</span></h1>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav">
          <a href="#" className="nav-link active">Fırsatlar</a>
          <InfoPanel />
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <div className="container mobile-nav-content">
            <a href="#" className="nav-link active mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Fırsatlar
            </a>
            <div className="mobile-nav-info">
              <InfoPanel />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
