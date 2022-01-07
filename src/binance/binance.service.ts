import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { CentralExchangeBase } from '../central-exchange.base';
import { HTTP_API_LIST, HTTP_BASE_URI } from '../binance/binance.constant';

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
}
