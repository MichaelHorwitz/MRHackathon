// src/monitored-destination/monitored-destination.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredDestinationService } from './monitored-destination.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MonitoredDestination } from './entities/monitored-destination.entity'; // Import your entity

describe('MonitoredDestinationService', () => {
  let service: MonitoredDestinationService;
  let mockMonitoredDestinationRepository: any;

  beforeEach(async () => {
    mockMonitoredDestinationRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      // Add other methods used by MonitoredDestinationService
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoredDestinationService,
        {
          provide: getRepositoryToken(MonitoredDestination),
          useValue: mockMonitoredDestinationRepository,
        },
      ],
    }).compile();

    service = module.get<MonitoredDestinationService>(MonitoredDestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more specific tests for MonitoredDestinationService methods here
});