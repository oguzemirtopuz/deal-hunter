const BASE_URL = 'https://www.cheapshark.com/api/1.0';

/**
 * Fetch deals from CheapShark API
 * Steam storeID = 1, Epic Games storeID = 25
 */
export const fetchDeals = async ({ title = '', upperPrice = 50, storeID = '1,25', sortBy = 'Savings', minMetacritic = 0 }) => {
  try {
    let apiSortBy = sortBy;
    let desc = '0';

    if (sortBy === 'Savings') {
      apiSortBy = 'Savings';
      desc = '0'; // 0 = highest discount first
    } else if (sortBy === 'PriceAsc') {
      apiSortBy = 'Price';
      desc = '0'; // 0 = lowest price first
    } else if (sortBy === 'PriceDesc') {
      apiSortBy = 'Price';
      desc = '1'; // 1 = highest price first
    } else if (sortBy === 'Metacritic') {
      apiSortBy = 'Metacritic';
      desc = '1'; // 1 = highest score first
    }

    // Build query parameters
    const params = new URLSearchParams({
      storeID: storeID,
      sortBy: apiSortBy,
      desc: desc,
      onSale: '1',
      pageSize: '60'
    });

    if (title) params.append('title', title);
    if (upperPrice && upperPrice < 50) params.append('upperPrice', upperPrice.toString());
    if (minMetacritic && minMetacritic > 0) params.append('metacritic', minMetacritic.toString());

    const response = await fetch(`${BASE_URL}/deals?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch deals:", error);
    throw error;
  }
};
