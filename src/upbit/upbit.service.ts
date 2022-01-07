import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { API_BASE_URI, API_LIST } from './upbit.constant';

@Injectable()
export class UpbitService extends CentralExchangeBase {
  api: Axios;

  constructor() {
    super();

    this.api = axios.create({
      baseURL: API_BASE_URI,
    });
  }

  async fetchMarket(): Promise<{ base: string; quote: string }[]> {
    const response = await this.api.get(API_LIST.FETCH_MARKET);
    return response?.data.map(({ market }: { market: string }) => {
      const [quote, base] = market.split('-');
      return { base: base.toUpperCase(), quote: quote.toUpperCase() };
    });
  }
}
