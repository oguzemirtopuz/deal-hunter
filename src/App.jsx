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
  const [maxPrice, setMaxPrice] = useState(50); // max price 50 default

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDeals({ 
          title: searchTerm, 
          upperPrice: maxPrice,
          storeID: '1,25,28'
        });
        setDeals(data);
      } catch (err) {
        setError('İndirimler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      loadDeals();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, maxPrice]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content container">
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <div className="regional-pricing-note" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', textAlign: 'center', lineHeight: '1.5' }}>
          * Fiyatlar ABD (Global) fiyatlarıdır. Bölgesel fiyatlandırma sebebiyle linklere tıkladığınızda;<br/>
          Steam'de <b>MENA-USD</b>, Epic Games'te ise <b>Türk Lirası (TRY)</b> olarak çok daha farklı (genelde daha düşük) fiyatlar görebilirsiniz.
        </div>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <DealsList deals={deals} loading={loading} />
        )}
      </main>
    </div>
  )
}

export default App
