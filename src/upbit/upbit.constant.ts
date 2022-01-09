//https://docs.upbit.com/reference/%EB%A7%88%EC%BC%93-%EC%BD%94%EB%93%9C-%EC%A1%B0%ED%9A%8C
export const HTTP_BASE_URI = 'https://api.upbit.com/v1';
export const WSS_BASE_URI = 'wss://api.upbit.com/websocket/v1';

export const HTTP_API_LIST = {
  FETCH_MARKET: `${HTTP_BASE_URI}/api/v3/ticker/price`,
  FETCH_NOTICE:
    'https://api-manager.upbit.com/api/v1/notices?page=1&per_page=20&thread_name=press',
};

export const WSS_API_LIST = {
  STREAM_PRICE: '',
};
