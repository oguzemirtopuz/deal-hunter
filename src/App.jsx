import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import DealsList from './components/DealsList'
import { fetchDeals } from './services/api'

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(50);
  const [activeStores, setActiveStores] = useState({ steam: true, epic: true });
  const [sortBy, setSortBy] = useState('Savings');
  const [minMetacritic, setMinMetacritic] = useState(0);
  const [minDealRating, setMinDealRating] = useState(0);

  useEffect(() => {
    const loadDeals = async () => {
      let storeIds = [];
      if (activeStores.steam) storeIds.push('1');
      if (activeStores.epic) storeIds.push('25');
      
      const storeQuery = storeIds.join(',');

      if (!storeQuery) {
        setDeals([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await fetchDeals({ 
          title: searchTerm, 
          upperPrice: maxPrice,
          storeID: storeQuery,
          sortBy: sortBy,
          minMetacritic: minMetacritic
        });
        setDeals(data);
      } catch (err) {
        setError('İndirimler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadDeals();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, maxPrice, activeStores, sortBy, minMetacritic]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content container">
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          activeStores={activeStores}
          setActiveStores={setActiveStores}
          sortBy={sortBy}
          setSortBy={setSortBy}
          minMetacritic={minMetacritic}
          setMinMetacritic={setMinMetacritic}
          minDealRating={minDealRating}
          setMinDealRating={setMinDealRating}
        />
        <div className="regional-pricing-note" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.5' }}>
          * Fiyatlar ABD (Global) fiyatlarıdır. Bölgesel fiyatlandırma sebebiyle linklere tıkladığınızda;<br/>
          Steam'de <b>MENA-USD</b>, Epic Games'te ise <b>Türk Lirası (TRY)</b> olarak çok daha farklı (genelde daha düşük) fiyatlar görebilirsiniz.
        </div>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <DealsList deals={deals.filter(d => !minDealRating || parseFloat(d.dealRating) >= minDealRating)} loading={loading} />
        )}
      </main>
    </div>
  )
}

export default App
