import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CentralExchangeBase {
  abstract fetchMarket();
}
