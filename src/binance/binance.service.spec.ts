import { Test, TestingModule } from '@nestjs/testing';
import { BinanceService } from './binance.service';

describe('BinanceService', () => {
  let service: BinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceService],
    }).compile();

    service = module.get<BinanceService>(BinanceService);
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
  describe('getPriceReceiver', () => {
    it('동작 테스트', async (done) => {
      const { open, close, stream } = service.getPriceStreamer();

      open(() => {
        return;
      });
      close(() => {
        return;
      });
      stream((data) => {
        console.log(JSON.parse(data));
      });

      done;
    });
  });
});
