import { Test, TestingModule } from '@nestjs/testing';
import { CoinoneService } from './coinone.service';

describe('CoinoneService', () => {
  let service: CoinoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinoneService],
    }).compile();

    service = module.get<CoinoneService>(CoinoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchMarket', () => {
    it('동작 테스트', async () => {
      const markets = await service.fetchMarket();
      console.log(markets);
    });
  });
});
