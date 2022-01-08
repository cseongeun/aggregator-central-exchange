import { Module } from '@nestjs/common';
import { CoinbaseService } from './coinbase.service';

@Module({
  providers: [CoinbaseService]
})
export class CoinbaseModule {}
