import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API } from './coinbase.constant';

@Injectable()
export class CoinbaseService extends CentralExchangeBase {
  constructor() {
    super();
  }

  async fetchMarket(): Promise<any> {
    const currencyRes = await axios.get(HTTP_API.FETCH_BASE_CURRENCY);
    const parseCurrencyRes = currencyRes.data.data;

    const markets = [];
    for await (const { id } of parseCurrencyRes) {
      const response = await axios.get(HTTP_API.FETCH_MARKET, {
        params: { currency: id },
      });
      console.log(response.data);
    }
  }

  getPriceStreamer(msg?: string): { open: any; close: any; stream: any } {
    throw new Error('Method not implemented.');
  }
}
