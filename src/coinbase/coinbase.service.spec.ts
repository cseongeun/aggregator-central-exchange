import { Test, TestingModule } from '@nestjs/testing';
import { CoinbaseService } from './coinbase.service';

describe('CoinbaseService', () => {
  let service: CoinbaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinbaseService],
    }).compile();

    service = module.get<CoinbaseService>(CoinbaseService);
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
