import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredDestinationService } from './monitored-destination.service';

describe('MonitoredDestinationService', () => {
  let service: MonitoredDestinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoredDestinationService],
    }).compile();

    service = module.get<MonitoredDestinationService>(
      MonitoredDestinationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
