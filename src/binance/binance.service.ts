import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import {
  HTTP_API_LIST,
  HTTP_BASE_URI,
  WSS_API_LIST,
  WSS_BASE_URI,
} from '../binance/binance.constant';

@Injectable()
export class BinanceService extends CentralExchangeBase {
  api: Axios;

  constructor() {
    super();

    this.api = axios.create({
      baseURL: HTTP_BASE_URI,
    });
  }

  async fetchMarket(): Promise<any> {
    const response = await this.api.get(HTTP_API_LIST.FETCH_MARKET);
    return response?.data.symbols.map(
      ({
        baseAsset,
        quoteAsset,
      }: {
        baseAsset: string;
        quoteAsset: string;
      }) => {
        return {
          base: baseAsset.toUpperCase(),
          quote: quoteAsset.toUpperCase(),
        };
      },
    );
  }

  getPriceStreamer(msg?: string): { open: any; close: any; stream: any } {
    const ws = new WebSocket(`${WSS_BASE_URI}${WSS_API_LIST.STREAM_PRICE}`);

    const open = (callback) =>
      ws.on('open', () => {
        callback();
      });

    const close = (callback) =>
      ws.on('close', () => {
        callback();
      });

    const stream = (callback) =>
      /**
       *   {
       *     e: '24hrTicker',
       *     E: 1641622951650,
       *     s: 'RVNBTC',            // symbol
       *     p: '-0.00000018',
       *     P: '-6.429',
       *     w: '0.00000270',
       *     x: '0.00000280',
       *     c: '0.00000262',
       *     Q: '1054.00000000',
       *     b: '0.00000262',        // best bid
       *     B: '344255.00000000',   // best bid amount
       *     a: '0.00000263',        // best ask (현 시세?)
       *     A: '223125.00000000',   // best ask amount
       *     o: '0.00000280',
       *     h: '0.00000283',
       *     l: '0.00000258',
       *     v: '83514959.00000000',
       *     q: '225.43945674',
       *     O: 1641536551649,
       *     C: 1641622951649,
       *     F: 21327872,
       *     L: 21344392,
       *     n: 16521
       *   },
       **/
      ws.on('message', (data: any) => {
        callback(data);
      });
    return { open, close, stream };
  }
}
