import { Module } from '@nestjs/common';
import { UpbitService } from './upbit.service';

@Module({
  providers: [UpbitService],
})
export class UpbitModule {}
