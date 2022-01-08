import { Test, TestingModule } from '@nestjs/testing';
import { BithumbService } from './bithumb.service';

describe('BithumbService', () => {
  let service: BithumbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BithumbService],
    }).compile();

    service = module.get<BithumbService>(BithumbService);
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
      const msg = JSON.stringify({
        type: 'ticker',
        symbols: ['BTC_KRW', 'ETH_KRW'],
        tickTypes: ['30M', '1H', '12H', '24H', 'MID'],
      });
      const { open, close, stream } = service.getPriceStreamer(msg);

      open(() => {
        return;
      });
      close(() => {
        return;
      });
      stream((data) => {
        try {
          const parsed = JSON.parse(data);
          const symbol = 'BTC_KRW';

          if (parsed.content.symbol === symbol) {
            const price = parsed.content;
            console.log(price.closePrice);
          }
        } catch (e) {}
      });

      done;
    });
  });
});
