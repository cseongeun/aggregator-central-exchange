import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export abstract class CentralExchangeBase {
  /**
   * 마켓 조회
   */
  abstract fetchMarket(): Promise<
    {
      base: string;
      quote: string;
    }[]
  >;

  abstract getPriceStreamer(msg?: string): { open; close; stream };
}
