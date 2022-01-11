import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API } from './coinone.constant';

@Injectable()
export class CoinoneService extends CentralExchangeBase {
  constructor() {
    super();
  }

  async fetchMarket(): Promise<{ base: string; quote: string }[]> {
    const response = await axios.get(HTTP_API.FETCH_MARKET, {
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

  getPriceStreamer(msg?: string): { open: any; close: any; stream: any } {
    throw new Error('Method not implemented.');
  }
}
