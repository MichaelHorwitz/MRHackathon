import { Test, TestingModule } from '@nestjs/testing';
import { UtilsController } from './utils.controller';
import { TerminusModule } from '@nestjs/terminus';

describe('UtilsController', () => {
  let controller: UtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule
      ],
      controllers: [UtilsController],
    }).compile();

    controller = module.get<UtilsController>(UtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
