import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import axios from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API, WSS_API } from './upbit.constant';

@Injectable()
export class UpbitService extends CentralExchangeBase {
  constructor() {
    super();
  }

  async fetchMarket(): Promise<{ base: string; quote: string }[]> {
    const response = await axios.get(HTTP_API.FETCH_MARKET);
    return response?.data.map(({ market }: { market: string }) => {
      const [quote, base] = market.split('-');
      return { base: base.toUpperCase(), quote: quote.toUpperCase() };
    });
  }

  getPriceStreamer(sendMsg?: string): { open; close; stream } {
    const ws = new WebSocket(`${WSS_API.STREAM_PRICE}`);

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
