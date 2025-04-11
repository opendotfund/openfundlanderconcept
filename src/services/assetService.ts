
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

// Cache validity time (1 minutes for prices, 15 minutes for historical data)
const PRICE_CACHE_TTL = 1 * 60 * 1000;
const HISTORICAL_CACHE_TTL = 15 * 60 * 1000;

// CoinGecko API URLs
const COIN_GECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const COIN_GECKO_PRICE_URL = `${COIN_GECKO_API_BASE}/simple/price`;
const COIN_GECKO_MARKET_CHART_URL = `${COIN_GECKO_API_BASE}/coins`;

// Alpha Vantage API for stocks
const ALPHA_VANTAGE_API_KEY = 'demo'; // Replace with your own key in production
const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query';

// Commodities API (using Alpha Vantage for demonstration)
const COMMODITIES_API_BASE = 'https://www.alphavantage.co/query';

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
      
      // Use different API endpoints based on asset type
      if (['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'DOGE', 'SHIB', 'LINK'].includes(symbol)) {
        // Crypto assets - using CoinGecko API
        const response = await axios.get(COIN_GECKO_PRICE_URL, {
          params: {
            ids: lowerAsset,
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_vol: true,
            include_24hr_change: true,
            include_last_updated_at: true
          }
        });
        
        if (response.data && response.data[lowerAsset]) {
          const coinData = response.data[lowerAsset];
          const result: AssetPrice = {
            price: coinData.usd || 0,
            change24h: coinData.usd_24h_change || 0,
            volume24h: coinData.usd_24h_vol || 0,
            marketCap: coinData.usd_market_cap || 0,
            supply: 'N/A' // CoinGecko doesn't provide this in the simple price endpoint
          };
          
          // Cache the result
          priceCache[cacheKey] = {
            data: result,
            timestamp: Date.now()
          };
          
          return result;
        }
        
        throw new Error('Invalid response from CoinGecko API');
      } else if (['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA'].includes(symbol)) {
        // Stocks - using Alpha Vantage API
        const response = await axios.get(ALPHA_VANTAGE_BASE, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: ALPHA_VANTAGE_API_KEY
          }
        });
        
        if (response.data && response.data['Global Quote']) {
          const quote = response.data['Global Quote'];
          const price = parseFloat(quote['05. price']) || 0;
          const previousClose = parseFloat(quote['08. previous close']) || price;
          const change = previousClose ? ((price - previousClose) / previousClose) * 100 : 0;
          
          const result: AssetPrice = {
            price: price,
            change24h: change,
            volume24h: parseFloat(quote['06. volume']) || 0,
            marketCap: 0, // Alpha Vantage doesn't provide market cap in this endpoint
            supply: 'N/A'
          };
          
          // Cache the result
          priceCache[cacheKey] = {
            data: result,
            timestamp: Date.now()
          };
          
          return result;
        }
        
        throw new Error('Invalid response from Alpha Vantage API');
      } else {
        // Commodities - using Alpha Vantage for demonstration
        const response = await axios.get(COMMODITIES_API_BASE, {
          params: {
            function: 'COMMODITY_DAILY',
            symbol: symbol,
            apikey: ALPHA_VANTAGE_API_KEY
          }
        });
        
        if (response.data && response.data['data']) {
          const timeSeries = response.data['data'];
          const lastDay = Object.keys(timeSeries)[0];
          const previousDay = Object.keys(timeSeries)[1];
          
          if (lastDay && timeSeries[lastDay]) {
            const price = parseFloat(timeSeries[lastDay]['4. close']) || 0;
            const previousPrice = previousDay ? parseFloat(timeSeries[previousDay]['4. close']) || price : price;
            const change = previousPrice ? ((price - previousPrice) / previousPrice) * 100 : 0;
            
            const result: AssetPrice = {
              price: price,
              change24h: change,
              volume24h: parseFloat(timeSeries[lastDay]['6. volume']) || 0,
              marketCap: 0, // Not applicable for commodities
              supply: 'N/A' // Not applicable for commodities
            };
            
            // Cache the result
            priceCache[cacheKey] = {
              data: result,
              timestamp: Date.now()
            };
            
            return result;
          }
        }
        
        throw new Error('Invalid response from commodities API');
      }
    }
    
    // Fallback to mock data when API fails or asset not supported
    console.warn(`Using mock data for ${asset}`);
    return getMockAssetPrice(lowerAsset);
    
  } catch (error) {
    console.error(`Error fetching price for ${asset}:`, error);
    
    // Fallback to generated data on error
    return getMockAssetPrice(lowerAsset);
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
    const symbol = assetSymbols[lowerAsset];
    if (!symbol) {
      throw new Error(`No symbol mapping for asset ${lowerAsset}`);
    }
    
    if (['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'MATIC', 'DOGE', 'SHIB', 'LINK'].includes(symbol)) {
      // Convert timeframe to days for CoinGecko
      let days = 1;
      switch (timeframe) {
        case '1h': days = 1; break;
        case '24h': days = 1; break;
        case '7d': days = 7; break;
        case '30d': days = 30; break;
        case '90d': days = 90; break;
        case '12m': days = 365; break;
        default: days = 7;
      }
      
      // Determine interval based on timeframe
      const interval = timeframe === '1h' ? 'hourly' : 'daily';
      
      const response = await axios.get(`${COIN_GECKO_MARKET_CHART_URL}/${lowerAsset}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: interval
        }
      });
      
      if (response.data && response.data.prices) {
        const prices: PriceDataPoint[] = response.data.prices.map((item: [number, number]) => ({
          timestamp: item[0],
          price: item[1],
          volume: 0 // CoinGecko doesn't provide volume in the same array
        }));
        
        // Add volume data if available
        if (response.data.total_volumes && response.data.total_volumes.length === prices.length) {
          response.data.total_volumes.forEach((item: [number, number], index: number) => {
            if (prices[index] && item[0] === prices[index].timestamp) {
              prices[index].volume = item[1];
            }
          });
        }
        
        const result: AssetHistoricalData = {
          prices,
          asset: lowerAsset,
          timeframe
        };
        
        // Cache the result
        historicalDataCache[cacheKey] = {
          data: result,
          timestamp: Date.now()
        };
        
        return result;
      }
      
      throw new Error('Invalid response from CoinGecko API');
    } else if (['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA'].includes(symbol)) {
      // Determine function based on timeframe
      let function_name = 'TIME_SERIES_INTRADAY';
      let interval = '60min';
      
      switch (timeframe) {
        case '1h': 
          function_name = 'TIME_SERIES_INTRADAY';
          interval = '5min';
          break;
        case '24h':
          function_name = 'TIME_SERIES_INTRADAY';
          interval = '60min';
          break;
        case '7d':
        case '30d':
          function_name = 'TIME_SERIES_DAILY';
          interval = '';
          break;
        case '90d':
        case '12m':
          function_name = 'TIME_SERIES_WEEKLY';
          interval = '';
          break;
      }
      
      const params: Record<string, string> = {
        function: function_name,
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      };
      
      if (interval) {
        params.interval = interval;
      }
      
      if (function_name === 'TIME_SERIES_INTRADAY') {
        params.outputsize = 'full';
      }
      
      const response = await axios.get(ALPHA_VANTAGE_BASE, { params });
      
      if (response.data) {
        let timeSeriesKey = '';
        
        if (function_name === 'TIME_SERIES_INTRADAY') {
          timeSeriesKey = `Time Series (${interval})`;
        } else if (function_name === 'TIME_SERIES_DAILY') {
          timeSeriesKey = 'Time Series (Daily)';
        } else if (function_name === 'TIME_SERIES_WEEKLY') {
          timeSeriesKey = 'Weekly Time Series';
        }
        
        const timeSeries = response.data[timeSeriesKey];
        
        if (timeSeries) {
          const prices: PriceDataPoint[] = [];
          const dates = Object.keys(timeSeries).sort();
          
          // Limit number of points based on timeframe
          let numberOfPoints = dates.length;
          if (timeframe === '1h') numberOfPoints = Math.min(12, dates.length);
          if (timeframe === '24h') numberOfPoints = Math.min(24, dates.length);
          if (timeframe === '7d') numberOfPoints = Math.min(7, dates.length);
          if (timeframe === '30d') numberOfPoints = Math.min(30, dates.length);
          
          const selectedDates = dates.slice(0, numberOfPoints).reverse();
          
          selectedDates.forEach(date => {
            const dataPoint = timeSeries[date];
            prices.push({
              timestamp: new Date(date).getTime(),
              price: parseFloat(dataPoint['4. close']),
              volume: parseFloat(dataPoint['5. volume'])
            });
          });
          
          const result: AssetHistoricalData = {
            prices,
            asset: lowerAsset,
            timeframe
          };
          
          // Cache the result
          historicalDataCache[cacheKey] = {
            data: result,
            timestamp: Date.now()
          };
          
          return result;
        }
      }
      
      throw new Error('Invalid response from Alpha Vantage API');
    } else {
      // Commodities - fallback to mock data for now
      throw new Error('Real API for commodities not implemented');
    }
  } catch (error) {
    console.error(`Error fetching historical data for ${asset} (${timeframe}):`, error);
    return getMockHistoricalData(lowerAsset, timeframe);
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

// MOCK DATA GENERATORS (only used when APIs fail or rate limits are hit)

/**
 * Generate mock asset price data (fallback when APIs fail)
 */
const getMockAssetPrice = (asset: string): AssetPrice => {
  const basePrice = getBasePriceForAsset(asset);
  return {
    price: basePrice,
    change24h: (Math.random() * 6) - 3, // -3% to +3%
    volume24h: basePrice * 500000 * (Math.random() + 0.5),
    marketCap: asset.includes('bitcoin') ? basePrice * 21000000 : 
              asset.includes('ethereum') ? basePrice * 120000000 :
              basePrice * 1000000000,
    supply: asset.includes('bitcoin') ? '21,000,000' : 
           asset.includes('ethereum') ? '~120,000,000' : 'N/A'
  };
};

/**
 * Generate mock historical data (fallback when APIs fail)
 */
const getMockHistoricalData = (asset: string, timeframe: string): AssetHistoricalData => {
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
