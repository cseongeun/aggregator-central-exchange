import { Test, TestingModule } from '@nestjs/testing';
import { UpbitService } from './upbit.service';

describe('UpbitService', () => {
  let service: UpbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpbitService],
    }).compile();

    service = module.get<UpbitService>(UpbitService);
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
      const msg =
        '[{"ticket":"UNIQUE_TICKET"},{"type":"trade","codes":["KRW-BTC","BTC-XRP"]}]';

      const { open, close, afterReceive } = service.getPriceReceiver(msg);

      open(() => {
        return;
      });
      close(() => {
        return;
      });
      afterReceive((data) => {
        console.log(data.toString('utf-8'));
      });

      done;
    });
  });
});
