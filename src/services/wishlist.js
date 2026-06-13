/**
 * Fetch Steam wishlist by Steam64 ID or vanity URL
 * Returns array of { steamAppID, name, priority } objects
 */
export const fetchSteamWishlist = async (steamInput) => {
  // Detect if it's a Steam64 ID (pure number ~17 digits) or vanity URL
  const isNumericId = /^\d{15,18}$/.test(steamInput.trim());
  
  const path = isNumericId
    ? `profiles/${steamInput.trim()}`
    : `id/${steamInput.trim()}`;

  const res = await fetch(`/steam-wishlist/${path}/wishlistdata/?p=0`);
  
  if (!res.ok) {
    throw new Error(`Steam profili bulunamadı veya istek listesi gizli. (${res.status})`);
  }

  const data = await res.json();

  if (!data || Object.keys(data).length === 0) {
    throw new Error('İstek listesi boş veya gizli ayarlanmış.');
  }

  // Convert to sorted array by priority
  return Object.entries(data)
    .map(([appid, info]) => ({
      steamAppID: appid,
      name: info.name,
      priority: info.priority || 999,
      capsule: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
    }))
    .sort((a, b) => a.priority - b.priority);
};

/**
 * For each wishlist item, check CheapShark if it's currently on sale
 * Returns deals array matching the wishlist
 */
export const fetchWishlistDeals = async (wishlistItems) => {
  const BASE_URL = 'https://www.cheapshark.com/api/1.0';

  // Batch: max 20 items at a time to avoid hammering API
  const batch = wishlistItems.slice(0, 40);

  const results = await Promise.allSettled(
    batch.map(async (item) => {
      const res = await fetch(
        `${BASE_URL}/deals?storeID=1&steamAppID=${item.steamAppID}&onSale=1&pageSize=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        return { ...data[0], _wishlistName: item.name, _capsule: item.capsule };
      }
      return null;
    })
  );

  return results
    .filter((r) => r.status === 'fulfilled' && r.value !== null)
    .map((r) => r.value);
};
