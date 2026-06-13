import { Search, SlidersHorizontal } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ searchTerm, setSearchTerm, maxPrice, setMaxPrice, activeStores, setActiveStores }) => {
  return (
    <div className="filter-bar glass-panel animate-fade-in">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Oyun ara..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filters-wrapper">
        <div className="filter-item store-filters" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
            <input 
              type="checkbox" 
              checked={activeStores.steam}
              onChange={(e) => setActiveStores(prev => ({...prev, steam: e.target.checked}))}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-green)' }}
            />
            Steam
          </label>
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
            <input 
              type="checkbox" 
              checked={activeStores.epic}
              onChange={(e) => setActiveStores(prev => ({...prev, epic: e.target.checked}))}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-green)' }}
            />
            Epic Games
          </label>
        </div>
        <div className="filter-item price-filter">
          <label>Maks Fiyat: ${maxPrice === 50 ? '50+' : maxPrice}</label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="price-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
