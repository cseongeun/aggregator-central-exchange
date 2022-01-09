import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import {
  HTTP_API_LIST,
  HTTP_BASE_URI,
  WSS_API_LIST,
  WSS_BASE_URI,
} from './upbit.constant';

@Injectable()
export class UpbitService extends CentralExchangeBase {
  api: Axios;

  constructor() {
    super();

    this.api = axios.create();
  }

  async fetchMarket(): Promise<{ base: string; quote: string }[]> {
    const response = await this.api.get(HTTP_API_LIST.FETCH_MARKET);
    return response?.data.map(({ market }: { market: string }) => {
      const [quote, base] = market.split('-');
      return { base: base.toUpperCase(), quote: quote.toUpperCase() };
    });
  }

  getPriceStreamer(sendMsg?: string): { open; close; stream } {
    const ws = new WebSocket(`${WSS_BASE_URI}${WSS_API_LIST.STREAM_PRICE}`);

    const open = (callback) =>
      ws.on('open', () => {
        ws.send(sendMsg);
        callback();
      });

    const close = (callback) =>
      ws.on('close', () => {
        callback();
      });

    const stream = (callback) =>
      /**
       *  {
       *    "type": "trade",
       *    "code": "KRW-BTC",
       *    "timestamp": 1641575603425,
       *    "trade_date": "2022-01-07",
       *    "trade_time": "17:13:23",
       *    "trade_timestamp": 1641575603000,
       *    "trade_price": 51867000,
       *    "trade_volume": 0.00418801,
       *    "ask_bid": "ASK",
       *    "prev_closing_price": 53239000,
       *    "change": "FALL",
       *    "change_price": 1372000,
       *    "sequential_id": 1641575603000000,
       *    "stream_type": "REALTIME"
       *  }
       *
       **/
      ws.on('message', (data: Buffer) => {
        callback(data);
      });

    return { open, close, stream };
  }
}
