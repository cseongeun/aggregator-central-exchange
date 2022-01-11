// https://developers.coinbase.com/api/v2?javascript#get-current-time
const HTTP_BASE_URI = 'https://api.coinbase.com/v2';
// export const WSS_BASE_URI = 'wss://pubwss.bithumb.com/pub/ws';

export const HTTP_API = {
  FETCH_BASE_CURRENCY: `${HTTP_BASE_URI}/currencies`,
  FETCH_MARKET: `${HTTP_BASE_URI}/exchange-rates`,
};

export const WSS_API = {};
