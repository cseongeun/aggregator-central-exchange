import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import {
  HTTP_API_LIST,
  HTTP_BASE_URI,
  WSS_API_LIST,
  WSS_BASE_URI,
} from './bithumb.constant';

@Injectable()
export class BithumbService extends CentralExchangeBase {
  api: Axios;

  constructor() {
    super();

    this.api = axios.create({
      baseURL: HTTP_BASE_URI,
    });
  }

  async fetchMarket(): Promise<any> {
    const [krwRes, btcRes] = await Promise.all([
      this.api.get(`${HTTP_API_LIST.FETCH_MARKET}_KRW`),
      this.api.get(`${HTTP_API_LIST.FETCH_MARKET}_BTC`),
    ]);

    const parseKRWRes = krwRes?.data.data;
    const parseBTCRes = btcRes.data.data;

    delete parseKRWRes.date;
    delete parseBTCRes.date;

    const markets = [];

    Object.keys(parseKRWRes).forEach((base: string) => {
      markets.push({ base: base.toUpperCase(), quote: 'KRW' });
    });
    Object.keys(parseBTCRes).forEach((base: string) => {
      markets.push({ base: base.toUpperCase(), quote: 'BTC' });
    });
    return markets;
  }

  getPriceStreamer(msg?: string): { open: any; close: any; stream: any } {
    const ws = new WebSocket(`${WSS_BASE_URI}${WSS_API_LIST.STREAM_PRICE}`);

    const open = (callback) =>
      ws.on('open', () => {
        ws.send(msg);
        callback();
      });

    const close = (callback) =>
      ws.on('close', () => {
        callback();
      });

    const stream = (callback) =>
      /**
       *  {
       *    type: 'ticker',
       *    content: {
       *      tickType: 'MID',
       *      date: '20220108',
       *      time: '154156',
       *      openPrice: '3974000',
       *      closePrice: '3948000',               // 종가 (현 시세)
       *      lowPrice: '3841000',
       *      highPrice: '4000000',
       *      value: '83622588836.248580499184862',
       *      volume: '21192.980579807581013665',
       *      sellVolume: '5288.138504266115157038',
       *      buyVolume: '15904.840675541465856627',
       *      prevClosePrice: '3973000',
       *      chgRate: '-0.63',
       *      chgAmt: '-25000',
       *      volumePower: '300.76',
       *      symbol: 'ETH_KRW'                    // 심볼
       *    }
       *  }
       **/
      ws.on('message', (data: any) => {
        callback(data);
      });
    return { open, close, stream };
  }
}
