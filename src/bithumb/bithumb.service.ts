import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API_LIST, HTTP_BASE_URI } from './bithumb.constant';

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
    const [responseKRW, responseBTC] = await Promise.all([
      this.api.get(`${HTTP_API_LIST.FETCH_MARKET}_KRW`),
      this.api.get(`${HTTP_API_LIST.FETCH_MARKET}_BTC`),
    ]);

    const parseResponseKRW = responseKRW?.data.data;
    const parseResponseBTC = responseBTC.data.data;

    delete parseResponseKRW.date;
    delete parseResponseBTC.date;

    const markets = [];

    Object.keys(parseResponseKRW).forEach((base: string) => {
      markets.push({ base: base.toUpperCase(), quote: 'KRW' });
    });
    Object.keys(parseResponseBTC).forEach((base: string) => {
      markets.push({ base: base.toUpperCase(), quote: 'BTC' });
    });
    return markets;
  }
}
