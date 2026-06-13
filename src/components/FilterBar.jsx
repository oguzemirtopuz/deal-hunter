import { Search, SlidersHorizontal } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ searchTerm, setSearchTerm, isAAA, setIsAAA, maxPrice, setMaxPrice }) => {
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
