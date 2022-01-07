import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API_LIST, HTTP_BASE_URI } from './coinone.constant';

@Injectable()
export class CoinoneService extends CentralExchangeBase {
  api: Axios;

  constructor() {
    super();

    this.api = axios.create({
      baseURL: HTTP_BASE_URI,
    });
  }

  async fetchMarket(): Promise<{ base: string; quote: string }[]> {
    const response = await this.api.get(HTTP_API_LIST.FETCH_MARKET, {
      params: { currency: 'all' },
    });

    const parseResponse = response?.data;

    delete parseResponse.result;
    delete parseResponse.errorCode;
    delete parseResponse.timestamp;

    return Object.keys(parseResponse).map((base: string) => {
      return { base: base.toUpperCase(), quote: 'KRW' };
    });
  }
}
