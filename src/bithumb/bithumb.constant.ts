//https://apidocs.bithumb.com/docs/ticker
const HTTP_BASE_URI = 'https://api.bithumb.com/public';
const WSS_BASE_URI = 'wss://pubwss.bithumb.com/pub/ws';

export const HTTP_API = {
  FETCH_MARKET: `${HTTP_BASE_URI}/ticker/all`,
};

export const WSS_API = {
  STREAM_PRICE: `${WSS_BASE_URI}`,
};
