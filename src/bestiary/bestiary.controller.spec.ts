import { Test, TestingModule } from '@nestjs/testing';
import { BestiaryController } from './bestiary.controller';

describe('BestiaryController', () => {
  let controller: BestiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BestiaryController],
    }).compile();

    controller = module.get<BestiaryController>(BestiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
