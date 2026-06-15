import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({
  searchTerm, setSearchTerm,
  maxPrice, setMaxPrice,
  activeStores, setActiveStores,
  sortBy, setSortBy,
  minMetacritic, setMinMetacritic,
  minDealRating, setMinDealRating
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="filter-bar glass-panel animate-fade-in">
      {/* Top row: search + mobile filter toggle */}
      <div className="filter-top-row">
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

        {/* Mobile: filter toggle button */}
        <button
          className="filter-toggle-btn"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-label="Filtreleri aç/kapat"
        >
          {filtersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
          <span>{filtersOpen ? 'Kapat' : 'Filtrele'}</span>
        </button>
      </div>

      {/* Filters — always visible on desktop, toggled on mobile */}
      <div className={`filters-wrapper ${filtersOpen ? 'filters-open' : ''}`}>
        {/* Store checkboxes */}
        <div className="filter-item store-filters">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={activeStores.steam}
              onChange={(e) => setActiveStores(prev => ({ ...prev, steam: e.target.checked }))}
            />
            <span className="checkmark"></span>
            Steam
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={activeStores.epic}
              onChange={(e) => setActiveStores(prev => ({ ...prev, epic: e.target.checked }))}
            />
            <span className="checkmark"></span>
            Epic Games
          </label>
        </div>

        {/* Max Price */}
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

        {/* Min Metacritic */}
        <div className="filter-item price-filter">
          <label>Min Kalite: {minMetacritic === 0 ? 'Hepsi' : `${minMetacritic}+`}</label>
          <input
            type="range"
            min="0"
            max="95"
            step="5"
            value={minMetacritic}
            onChange={(e) => setMinMetacritic(Number(e.target.value))}
            className="price-slider metacritic-slider"
          />
        </div>

        {/* Min Deal Rating */}
        <div className="filter-item price-filter">
          <label>Fırsat Skoru: {minDealRating === 0 ? 'Hepsi' : `${minDealRating}+`}</label>
          <input
            type="range"
            min="0"
            max="9.5"
            step="0.5"
            value={minDealRating}
            onChange={(e) => setMinDealRating(Number(e.target.value))}
            className="price-slider deal-rating-slider"
          />
        </div>

        {/* Sort */}
        <div className="filter-item sort-filter">
          <label>Sıralama</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
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
