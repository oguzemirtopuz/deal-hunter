import { useState, useEffect, useRef } from 'react';
import { HelpCircle, X, Zap, Search, SlidersHorizontal, Bell, Star, TrendingDown, Store, ChevronDown, ChevronUp } from 'lucide-react';
import './InfoPanel.css';

const features = [
  {
    icon: <Zap size={20} />,
    title: 'Canlı İndirim Verileri',
    color: '#10b981',
    desc: 'Tüm fiyatlar Steam ve Epic Games\'ten gerçek zamanlı olarak çekilir. Sayfa her açıldığında veriler otomatik güncellenir. Ayrıca her ziyarette en güncel fırsatları görürsün.'
  },
  {
    icon: <Search size={20} />,
    title: 'Oyun Arama',
    color: '#3b82f6',
    desc: 'Arama kutusuna oyun adını yazmaya başla. Sistem 0.5 saniye bekleyip otomatik arar, her tuş basışında API\'ye istek atmaz — bu sayede hem hızlı hem de akıllı çalışır.'
  },
  {
    icon: <Store size={20} />,
    title: 'Mağaza Filtresi (Steam / Epic)',
    color: '#8b5cf6',
    desc: 'Steam veya Epic Games kutucuklarını işaretleyerek sadece o mağazanın fırsatlarını gör. İkisini birden seçersen her iki mağazanın indirimleri listelenir. İkisini de kaldırırsan liste boşalır.'
  },
  {
    icon: <SlidersHorizontal size={20} />,
    title: 'Maksimum Fiyat Filtresi',
    color: '#f59e0b',
    desc: 'Kaydırıcıyla maksimum fiyat belirle. Örneğin "5 Dolar" seçersen, sadece 5 Dolar altındaki indirimli oyunlar listelenir. "50+" seçiliyse fiyat filtresi uygulanmaz.'
  },
  {
    icon: <TrendingDown size={20} />,
    title: 'Minimum Kalite Puanı (Metacritic)',
    color: '#ec4899',
    desc: 'Metacritic filtresi ile düşük puanlı (çöp) oyunları listeden ele. Kaydırıcıyı 0\'da bırakırsan filtre uygulanmaz. 80\'e çekersen yalnızca Metacritic puanı 80 ve üzeri başyapıtları görürsün.'
  },
  {
    icon: <Star size={20} />,
    title: 'Sıralama Seçenekleri',
    color: '#f97316',
    desc: 'Listeyi 4 farklı kritere göre sıralayabilirsin:\n• En Yüksek İndirim: %90, %80... şeklinde en çok indirim yapılan oyunlar üste.\n• En Düşük Fiyat: En ucuz oyunlar üste.\n• En Yüksek Fiyat: Bütçeli oyunlar üste.\n• Metacritic Puanı: En yüksek puanlı oyunlar üste.'
  },
  {
    icon: <Bell size={20} />,
    title: '🔔 Fiyat Alarmı',
    color: '#10b981',
    desc: 'Bir oyunun fiyatını takip etmek istiyorsan zil ikonuna tıkla. E-posta adresini ve hedef fiyatı gir. Oyun o fiyata düştüğünde CheapShark sana otomatik ücretsiz bir e-posta gönderir!'
  },
  {
    icon: <span style={{fontSize:'18px'}}>🔥</span>,
    title: 'Fırsat Skoru',
    color: '#ef4444',
    desc: 'Her kartın köşesindeki renkli puan rozeti CheapShark\'ın yapay zeka hesaplamasıdır. Oyunun geçmiş fiyatları, indirimi ve kalitesi baz alınarak 10 üzerinden verilir. 9+ = Kaçırılmaz fırsat, 7+ = İyi fırsat, 5 altı = Ortalama.'
  },
  {
    icon: <span style={{fontSize:'18px'}}>⭐</span>,
    title: 'Steam İnceleme Puanı',
    color: '#3b82f6',
    desc: 'Oyun kartı üzerindeki küçük yorum rozeti, Steam oyuncularının o oyunu ne kadar beğendiğini gösterir. "Very Positive" (Çok Olumlu) veya "Mixed" (Karışık) gibi değerleri, gerçek Steam kullanıcı yorumlarından hesaplanır.'
  },
  {
    icon: <span style={{fontSize:'18px'}}>📊</span>,
    title: 'Tarihin En Düşük Fiyatı',
    color: '#f59e0b',
    desc: 'Oyun kartına tıkladığında alt tarafta "Tarihin En Düşük Fiyatı" bölümü açılır. Örneğin "1.49$ — 15 Ocak 2022" yazar. Bu sayede "Beklesem daha ucuz olur mu?" sorusunun cevabını anında görürsün.'
  },
  {
    icon: <span style={{fontSize:'18px'}}>🇹🇷</span>,
    title: 'TR Fiyatı (Steam)',
    color: '#ef4444',
    desc: 'Steam oyunlarında "🇹🇷 TR Fiyatı" butonuna tıkladığında, oyunun Türkiye bölgesindeki (MENA-USD) gerçek fiyatını anında görebilirsin. Global USD fiyatından çoğunlukla çok daha ucuz olur!'
  },
  {
    icon: <span style={{fontSize:'18px'}}>⚠️</span>,
    title: 'Epic Games Fiyatlandırması',
    color: '#f59e0b',
    desc: 'Epic Games fiyatları sitede USD (global) olarak görünür. Mağazaya gittiğinde Epic Games, bulunduğun bölgeyi otomatik algılar ve fiyatı Türk Lirası\'na (TRY) dönüştürür — bu genelde USD\'den çok daha ucuzdur!'
  },
];

const InfoPanel = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="info-panel-wrapper" ref={panelRef}>
      <button className="info-trigger-btn" onClick={() => setOpen(!open)} title="Nasıl Kullanılır?">
        <HelpCircle size={20} />
        <span>Nasıl Kullanılır?</span>
      </button>

      {open && (
        <div className="info-panel glass-panel">
          <div className="info-panel-header">
            <h3>Deal Hunter Rehberi</h3>
            <button className="info-close-btn" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <p className="info-panel-subtitle">Tüm özellikleri keşfet ve en iyi fırsatları yakala 🎮</p>
          
          <div className="info-features-list">
            {features.map((f, i) => (
              <div key={i} className={`info-feature-item ${expanded === i ? 'expanded' : ''}`}>
                <button className="info-feature-header" onClick={() => setExpanded(expanded === i ? null : i)}>
                  <div className="info-feature-icon" style={{ color: f.color, background: `${f.color}18` }}>
                    {f.icon}
                  </div>
                  <span className="info-feature-title">{f.title}</span>
                  <div className="info-chevron">
                    {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                {expanded === i && (
                  <div className="info-feature-desc">
                    {f.desc.split('\n').map((line, j) => <p key={j}>{line}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
