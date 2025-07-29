import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredDestinationService } from './monitored-destination.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MonitoredDestination } from './entities/monitored-destination.entity';
import { Repository } from 'typeorm';

describe('MonitoredDestinationService', () => {
  let service: MonitoredDestinationService;
  let mockRepo: jest.Mocked<Partial<Repository<MonitoredDestination>>>;

  beforeEach(async () => {
    mockRepo = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoredDestinationService,
        {
          provide: getRepositoryToken(MonitoredDestination),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<MonitoredDestinationService>(MonitoredDestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call save with the correct DTO', async () => {
      const dto = { name: 'Test Destination', location: 'Test Location', riskLevel: 'Low', lastChecked: new Date() };
      const saved = { id: 1, ...dto };
      (mockRepo.save as jest.Mock).mockResolvedValue(saved as MonitoredDestination);

      const result = await service.create(dto as any);
      expect(mockRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(saved);
    });
  });

  describe('findAll', () => {
    it('should return all monitored destinations', async () => {
      const destinations = [{ id: 1 }, { id: 2 }];
      (mockRepo.find as jest.Mock).mockResolvedValue(destinations as MonitoredDestination[]);

      const result = await service.findAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(destinations);
    });
  });

  describe('findOne', () => {
    it('should return a monitored destination by id', async () => {
      const destination = { 
        id: 1, 
        name: 'Somewhere', 
        location: 'Test Location', 
        riskLevel: 'Low', 
        lastChecked: new Date() 
      };
      (mockRepo.findOneBy as jest.Mock).mockResolvedValue(destination as MonitoredDestination);

      const result = await service.findOne(1);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(destination);
    });
  });

  describe('update', () => {
    it('should update and return the monitored destination', async () => {
      const dto = { name: 'Updated Name' };
      const updated = { 
        id: 1, 
        name: 'Updated Name', 
        location: 'Test Location', 
        riskLevel: 'Low', 
        lastChecked: new Date() 
      };
      (mockRepo.save as jest.Mock).mockResolvedValue(updated as MonitoredDestination);

      const result = await service.update(1, dto as any);
      expect(mockRepo.save).toHaveBeenCalledWith({ id: 1, ...dto });
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should delete the monitored destination by id', async () => {
      (mockRepo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });
  });
});
