import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API_LIST, HTTP_BASE_URI } from './coinbase.constant';

@Injectable()
export class CoinbaseService extends CentralExchangeBase {
  getPriceStreamer(msg?: string): { open: any; close: any; stream: any } {
    throw new Error('Method not implemented.');
  }
  api: Axios;

  constructor() {
    super();

    this.api = axios.create({
      baseURL: HTTP_BASE_URI,
    });
  }

  async fetchMarket(): Promise<any> {
    const currencyRes = await this.api.get(HTTP_API_LIST.FETCH_BASE_CURRENCY);
    const parseCurrencyRes = currencyRes.data.data;

    const markets = [];
    for await (const { id } of parseCurrencyRes) {
      const response = await this.api.get(HTTP_API_LIST.FETCH_MARKET, {
        params: { currency: id },
      });
      console.log(response.data);
    }
  }
}
