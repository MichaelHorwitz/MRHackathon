// src/notifs/notifs.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotifsController } from './notifs.controller';
import { NotifsService } from './notifs.service';

describe('NotifsController', () => {
  let controller: NotifsController;
  let mockNotifsService: any;

  beforeEach(async () => {
    // Define your mock NotifsService methods
    mockNotifsService = {
      createNotification: jest.fn(),
      findAllNotifications: jest.fn(),
      // Add any other methods from NotifsService that NotifsController uses
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifsController],
      providers: [
        {
          provide: NotifsService,
          useValue: mockNotifsService,
        },
      ],
    }).compile();

    controller = module.get<NotifsController>(NotifsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Example of a test for a controller method
  // it('should create a notification via controller', async () => {
  //   const createNotificationDto = { message: 'Test from Controller', userId: 1 };
  //   const expectedResult = { id: 1, ...createNotificationDto };
  //   mockNotifsService.createNotification.mockResolvedValue(expectedResult);
  //
  //   const result = await controller.create(createNotificationDto); // Assuming a 'create' method
  //   expect(result).toEqual(expectedResult);
  //   expect(mockNotifsService.createNotification).toHaveBeenCalledWith(createNotificationDto);
  // });
});