//https://binance-docs.github.io/apidocs/spot/en/#sub-account-endpoints
export const HTTP_BASE_URI = 'https://api.binance.com';
export const WSS_BASE_URI = 'wss://stream.binance.com:9443';

export const HTTP_API_LIST = {
  FETCH_MARKET: '/api/v3/exchangeInfo',
};

export const WSS_API_LIST = {
  STREAM_PRICE: '/ws/!ticker@arr',
};
