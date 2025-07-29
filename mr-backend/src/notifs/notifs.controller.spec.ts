import { Test, TestingModule } from '@nestjs/testing';
import { NotifsController } from './notifs.controller';

describe('NotifsController', () => {
  let controller: NotifsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifsController],
    }).compile();

    controller = module.get<NotifsController>(NotifsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
