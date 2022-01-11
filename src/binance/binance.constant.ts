//https://binance-docs.github.io/apidocs/spot/en/#sub-account-endpoints
const HTTP_BASE_URI = 'https://api.binance.com';
const WSS_BASE_URI = 'wss://stream.binance.com:9443';

export const HTTP_API = {
  FETCH_MARKET: `${HTTP_BASE_URI}/api/v3/exchangeInfo`,
};

export const WSS_API = {
  STREAM_PRICE: `${WSS_BASE_URI}/ws/!ticker@arr`,
};
