import { Search, SlidersHorizontal } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ searchTerm, setSearchTerm, maxPrice, setMaxPrice, activeStores, setActiveStores, sortBy, setSortBy }) => {
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
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
            <input 
              type="checkbox" 
              checked={activeStores.steam}
              onChange={(e) => setActiveStores(prev => ({...prev, steam: e.target.checked}))}
            />
            <span className="checkmark"></span>
            Steam
          </label>
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
            <input 
              type="checkbox" 
              checked={activeStores.epic}
              onChange={(e) => setActiveStores(prev => ({...prev, epic: e.target.checked}))}
            />
            <span className="checkmark"></span>
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
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider"
          />
        </div>
        
        <div className="filter-item sort-filter" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sıralama</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ 
              background: 'var(--bg-main)', 
              color: 'var(--text-main)', 
              border: '1px solid var(--border)', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '6px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="Savings">En Yüksek İndirim</option>
            <option value="PriceAsc">En Düşük Fiyat</option>
            <option value="PriceDesc">En Yüksek Fiyat</option>
            <option value="Metacritic">Metacritic Puanı</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
