import { Test, TestingModule } from '@nestjs/testing';
import { NotifsService } from './notifs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification, StatusType } from './notif.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/create-notif.dto';

// Helper type and factory for a mocked TypeORM repository
type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

function createMockRepository<T extends ObjectLiteral = any>(): MockType<
  Repository<T>
> {
  return {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    updateAll: jest.fn(),
  } as unknown as MockType<Repository<T>>;
}

describe('NotifsService', () => {
  let service: NotifsService;
  let mockRepo: MockType<Repository<Notification>>;

  beforeEach(async () => {
    mockRepo = createMockRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotifsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<NotifsService>(NotifsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllNotifs', () => {
    it('should return all notifications', async () => {
      const mockNotifications = [{ id: 1 }, { id: 2 }];
      mockRepo.find!.mockResolvedValue(mockNotifications);

      const result = await service.getAllNotifs();

      expect(result).toEqual(mockNotifications);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a notification', async () => {
      const dto: CreateNotificationDto = { title: 'Test' };
      const savedNotif = { id: 1, ...dto };
      mockRepo.save!.mockResolvedValue(savedNotif);

      const result = await service.create(dto);

      expect(result).toEqual(savedNotif);
      expect(mockRepo.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return the notification', async () => {
      const dto: UpdateNotificationDto = { title: 'Updated' };
      const updatedNotif = { id: 1, ...dto };
      mockRepo.save!.mockResolvedValue(updatedNotif);

      const result = await service.update(1, dto);

      expect(result).toEqual(updatedNotif);
      expect(mockRepo.save).toHaveBeenCalledWith({ ...dto, id: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a notification by id', async () => {
      mockRepo.delete!.mockResolvedValue(undefined);

      await service.remove(1);

      expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('markAsRead', () => {
    it('should mark a notification as read', async () => {
      const notif = { id: 1, status: 0 };
      mockRepo.findOneBy!.mockResolvedValue(notif);
      mockRepo.save!.mockResolvedValue({ ...notif, status: 1 });

      await service.markAsRead(1);

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepo.save).toHaveBeenCalledWith({
        ...notif,
        status: StatusType.Read,
      });
    });

    it('should do nothing if notification not found', async () => {
      mockRepo.findOneBy!.mockResolvedValue(null);

      await service.markAsRead(999);

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });
});
