import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredDestinationController } from './monitored-destination.controller';
import { MonitoredDestinationService } from './monitored-destination.service';

describe('MonitoredDestinationController', () => {
  let controller: MonitoredDestinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoredDestinationController],
      providers: [MonitoredDestinationService],
    }).compile();

    controller = module.get<MonitoredDestinationController>(
      MonitoredDestinationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
