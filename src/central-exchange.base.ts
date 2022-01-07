import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export abstract class CentralExchangeBase {
  /**
   * 거래소 API 인스턴스
   */
  abstract api: Axios;

  /**
   * 마켓 조회
   */
  abstract fetchMarket(): Promise<
    {
      base: string;
      quote: string;
    }[]
  >;
}
