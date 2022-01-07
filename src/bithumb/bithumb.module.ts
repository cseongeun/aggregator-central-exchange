import { Module } from '@nestjs/common';
import { BithumbService } from './bithumb.service';

@Module({
  providers: [BithumbService]
})
export class BithumbModule {}
