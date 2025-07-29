// src/monitored-destination/monitored-destination.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredDestinationController } from './monitored-destination.controller';
import { MonitoredDestinationService } from './monitored-destination.service';

describe('MonitoredDestinationController', () => {
  let controller: MonitoredDestinationController;
  let mockMonitoredDestinationService: any;

  beforeEach(async () => {
    // Define your mock MonitoredDestinationService methods
    mockMonitoredDestinationService = {
      createMonitoredDestination: jest.fn(),
      findAllMonitoredDestinations: jest.fn(),
      // Add any other methods from MonitoredDestinationService that MonitoredDestinationController uses
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoredDestinationController],
      providers: [
        {
          provide: MonitoredDestinationService,
          useValue: mockMonitoredDestinationService,
        },
      ],
    }).compile();

    controller = module.get<MonitoredDestinationController>(MonitoredDestinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more specific tests for controller methods here
});