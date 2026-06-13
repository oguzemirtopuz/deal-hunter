const BASE_URL = 'https://www.cheapshark.com/api/1.0';

/**
 * Fetch deals from CheapShark API
 * Steam storeID = 1, Epic Games storeID = 25
 */
export const fetchDeals = async ({ title = '', upperPrice = 50, storeID = '1,25', sortBy = 'Savings' }) => {
  try {
    let apiSortBy = sortBy;
    let desc = '1'; // Default descending

    if (sortBy === 'PriceAsc') {
      apiSortBy = 'Price';
      desc = '0';
    } else if (sortBy === 'PriceDesc') {
      apiSortBy = 'Price';
      desc = '1';
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
