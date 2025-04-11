
import axios from 'axios';

// Type definitions
export interface AssetPrice {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  supply: string;
}

export interface PriceDataPoint {
  timestamp: number;
  price: number;
  volume?: number;
}

export interface AssetHistoricalData {
  prices: PriceDataPoint[];
  asset: string;
  timeframe: string;
}

// Asset symbol mappings for API calls
const assetSymbols: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  cardano: 'ADA',
  polkadot: 'DOT',
  avalanche: 'AVAX',
  polygon: 'MATIC',
  dogecoin: 'DOGE',
  'shiba inu': 'SHIB',
  chainlink: 'LINK',
  apple: 'AAPL',
  tesla: 'TSLA',
  microsoft: 'MSFT',
  amazon: 'AMZN',
  nvidia: 'NVDA',
  gold: 'XAU',
  silver: 'XAG',
  'crude oil': 'OIL',
  'natural gas': 'NG',
  copper: 'HG',
};

// Convert timeframe to API format
const timeframeToAPIParam = (timeframe: string): string => {
  switch (timeframe) {
    case '1h': return '1h';
    case '24h': return '1d';
    case '7d': return '7d';
    case '30d': return '30d';
    case '90d': return '90d';
    case '12m': return '365d';
    default: return '7d';
  }
};

// Cache for asset prices to reduce API calls
const priceCache: Record<string, { data: AssetPrice; timestamp: number }> = {};
const historicalDataCache: Record<string, { data: AssetHistoricalData; timestamp: number }> = {};

// Cache validity time (5 minutes for prices, 30 minutes for historical data)
const PRICE_CACHE_TTL = 5 * 60 * 1000;
const HISTORICAL_CACHE_TTL = 30 * 60 * 1000;

// Mock data for assets not available via APIs
const mockPriceData: Record<string, AssetPrice> = {
  // Add mock data for assets not covered by the API
};

const mockHistoricalData = (asset: string, timeframe: string): AssetHistoricalData => {
  const now = Date.now();
  const dataPoints: PriceDataPoint[] = [];
  const priceBase = getBasePriceForAsset(asset);
  
  // Determine number of points and interval based on timeframe
  let numberOfPoints = 24;
  let interval = 60 * 60 * 1000; // 1 hour in ms
  
  switch (timeframe) {
    case '1h':
      numberOfPoints = 60;
      interval = 60 * 1000; // 1 minute
      break;
    case '24h':
      numberOfPoints = 24;
      interval = 60 * 60 * 1000; // 1 hour
      break;
    case '7d':
      numberOfPoints = 7 * 24;
      interval = 60 * 60 * 1000; // 1 hour
      break;
    case '30d':
      numberOfPoints = 30;
      interval = 24 * 60 * 60 * 1000; // 1 day
      break;
    case '90d':
      numberOfPoints = 90;
      interval = 24 * 60 * 60 * 1000; // 1 day
      break;
    case '12m':
      numberOfPoints = 365;
      interval = 24 * 60 * 60 * 1000; // 1 day
      break;
  }
  
  // Generate realistic but mock price movements
  let currentPrice = priceBase;
  for (let i = numberOfPoints - 1; i >= 0; i--) {
    const timestamp = now - (i * interval);
    const volatility = getVolatilityForAsset(asset);
    const trend = getTrendForAsset(asset);
    
    // Apply trend and random movement
    const movement = (Math.random() - 0.5 + trend) * volatility * currentPrice;
    currentPrice = Math.max(0.01, currentPrice + movement);
    
    dataPoints.push({
      timestamp,
      price: currentPrice,
      volume: Math.floor(currentPrice * (1000 + Math.random() * 10000))
    });
  }
  
  return {
    prices: dataPoints,
    asset,
    timeframe
  };
};

// Helper functions for mock data generation
const getBasePriceForAsset = (asset: string): number => {
  const prices: Record<string, number> = {
    bitcoin: 67250,
    ethereum: 3245,
    solana: 147,
    cardano: 0.58,
    polkadot: 7.45,
    avalanche: 35.2,
    polygon: 0.85,
    dogecoin: 0.15,
    'shiba inu': 0.000025,
    chainlink: 14.2,
    apple: 182.4,
    tesla: 178.32,
    microsoft: 415,
    amazon: 187,
    nvidia: 920,
    gold: 2380,
    silver: 29.5,
    'crude oil': 76.8,
    'natural gas': 2.15,
    copper: 4.35,
  };
  
  return prices[asset] || 100;
};

const getVolatilityForAsset = (asset: string): number => {
  // Return volatility as a percentage of price
  if (asset === 'bitcoin' || asset === 'ethereum' || asset === 'solana') return 0.02; // 2%
  if (asset === 'dogecoin' || asset === 'shiba inu') return 0.04; // 4%
  if (asset.includes('oil') || asset.includes('gas')) return 0.025; // 2.5%
  if (asset === 'gold' || asset === 'silver') return 0.01; // 1%
  return 0.015; // 1.5% default
};

const getTrendForAsset = (asset: string): number => {
  // Slight bias for trend, positive or negative
  if (asset === 'bitcoin' || asset === 'ethereum' || asset === 'nvidia') return 0.002; // Slight positive bias
  if (asset === 'tesla') return -0.001; // Slight negative bias
  return 0; // No bias
};

/**
 * Fetch current price data for an asset
 */
export const getAssetPrice = async (asset: string): Promise<AssetPrice> => {
  const lowerAsset = asset.toLowerCase();
  
  // Check cache first
  const cacheKey = `price-${lowerAsset}`;
  const cachedData = priceCache[cacheKey];
  if (cachedData && (Date.now() - cachedData.timestamp) < PRICE_CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    if (assetSymbols[lowerAsset]) {
      const symbol = assetSymbols[lowerAsset];
      let response;
      
      // Use different API endpoints based on asset type
      if (['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'DOGE', 'SHIB', 'LINK'].includes(symbol)) {
        // Crypto assets - using CoinGecko API format (actual API call would go here)
        response = await Promise.resolve({
          data: {
            [lowerAsset]: {
              usd: getBasePriceForAsset(lowerAsset),
              usd_24h_change: (Math.random() * 10) - 5, // -5% to +5%
              usd_24h_vol: getBasePriceForAsset(lowerAsset) * 1000000 * (Math.random() + 0.5),
              usd_market_cap: getBasePriceForAsset(lowerAsset) * 100000000 * (Math.random() + 0.5),
            }
          }
        });
        
        const result: AssetPrice = {
          price: response.data[lowerAsset].usd,
          change24h: response.data[lowerAsset].usd_24h_change,
          volume24h: response.data[lowerAsset].usd_24h_vol,
          marketCap: response.data[lowerAsset].usd_market_cap,
          supply: 'N/A'
        };
        
        // Cache the result
        priceCache[cacheKey] = {
          data: result,
          timestamp: Date.now()
        };
        
        return result;
      } else {
        // Stocks and commodities - using a different API format
        // This would be a different API call for stocks/commodities
        const mockPrice = getBasePriceForAsset(lowerAsset);
        const result: AssetPrice = {
          price: mockPrice,
          change24h: (Math.random() * 6) - 3, // -3% to +3%
          volume24h: mockPrice * 500000 * (Math.random() + 0.5),
          marketCap: lowerAsset.includes('apple') || lowerAsset.includes('microsoft') ? 
                    mockPrice * 10000000000 : mockPrice * 1000000000,
          supply: lowerAsset.includes('gold') ? '200K tonnes' : 'N/A'
        };
        
        // Cache the result
        priceCache[cacheKey] = {
          data: result,
          timestamp: Date.now()
        };
        
        return result;
      }
    } else if (mockPriceData[lowerAsset]) {
      // Return mock data for assets not covered by API
      return mockPriceData[lowerAsset];
    }
    
    // Fallback to generated mock data
    const mockPrice = getBasePriceForAsset(lowerAsset) || 100;
    const result: AssetPrice = {
      price: mockPrice,
      change24h: (Math.random() * 6) - 3, // -3% to +3%
      volume24h: mockPrice * 500000 * (Math.random() + 0.5),
      marketCap: mockPrice * 1000000000,
      supply: 'N/A'
    };
    
    // Cache the result
    priceCache[cacheKey] = {
      data: result,
      timestamp: Date.now()
    };
    
    return result;
  } catch (error) {
    console.error(`Error fetching price for ${asset}:`, error);
    
    // Fallback to generated data on error
    return {
      price: getBasePriceForAsset(lowerAsset) || 100,
      change24h: 0,
      volume24h: 0,
      marketCap: 0,
      supply: 'N/A'
    };
  }
};

/**
 * Fetch historical price data for an asset
 */
export const getAssetHistoricalData = async (asset: string, timeframe: string): Promise<AssetHistoricalData> => {
  const lowerAsset = asset.toLowerCase();
  
  // Check cache first
  const cacheKey = `history-${lowerAsset}-${timeframe}`;
  const cachedData = historicalDataCache[cacheKey];
  if (cachedData && (Date.now() - cachedData.timestamp) < HISTORICAL_CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    if (assetSymbols[lowerAsset]) {
      // In a real implementation, we would make API calls here
      // For now, we'll use mock data that simulates real API responses
      const mockData = mockHistoricalData(lowerAsset, timeframe);
      
      // Cache the result
      historicalDataCache[cacheKey] = {
        data: mockData,
        timestamp: Date.now()
      };
      
      return mockData;
    }
    
    // Fallback to mock data
    const mockData = mockHistoricalData(lowerAsset, timeframe);
    
    // Cache the result
    historicalDataCache[cacheKey] = {
      data: mockData,
      timestamp: Date.now()
    };
    
    return mockData;
  } catch (error) {
    console.error(`Error fetching historical data for ${asset} (${timeframe}):`, error);
    return mockHistoricalData(lowerAsset, timeframe);
  }
};

/**
 * Format a price with proper decimals based on value
 */
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else if (price >= 1) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  } else if (price >= 0.01) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    });
  } else {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 8
    });
  }
};

/**
 * Format a number as currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a large number with appropriate suffix (K, M, B, T)
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

/**
 * Creates a unique subscription ID for real-time updates
 */
let subscriptionCounter = 0;
export const subscribeToAssetUpdates = (
  asset: string,
  callback: (price: AssetPrice) => void
): string => {
  const subscriptionId = `${asset}-${subscriptionCounter++}`;
  
  // Initialize an interval that simulates real-time updates
  const intervalId = setInterval(async () => {
    try {
      const priceData = await getAssetPrice(asset);
      callback(priceData);
    } catch (error) {
      console.error(`Error in price update for ${asset}:`, error);
    }
  }, 15000); // Update every 15 seconds
  
  // Store the interval ID for cleanup
  subscriptions[subscriptionId] = intervalId;
  
  return subscriptionId;
};

// Store active subscriptions for cleanup
const subscriptions: Record<string, number> = {};

/**
 * Unsubscribe from real-time updates
 */
export const unsubscribeFromAssetUpdates = (subscriptionId: string): void => {
  if (subscriptions[subscriptionId]) {
    clearInterval(subscriptions[subscriptionId]);
    delete subscriptions[subscriptionId];
  }
};
