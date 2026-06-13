import { Tag } from 'lucide-react';
import InfoPanel from './InfoPanel';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <div className="logo-area">
          <Tag className="logo-icon" size={28} />
          <h1 className="logo-text">İndirim<span className="accent">Yakalayıcı</span></h1>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link active">Fırsatlar</a>
          <InfoPanel />
        </nav>
      </div>
    </header>
  );
};

export default Header;
