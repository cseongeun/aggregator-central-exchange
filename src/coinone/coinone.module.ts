import { Module } from '@nestjs/common';
import { CoinoneService } from './coinone.service';

@Module({
  providers: [CoinoneService]
})
export class CoinoneModule {}
