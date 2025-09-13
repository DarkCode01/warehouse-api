import { Test, TestingModule } from '@nestjs/testing';
import { AislesController } from './aisles.controller';
import { AislesService } from './aisles.service';

describe('AislesController', () => {
  let controller: AislesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AislesController],
      providers: [AislesService],
    }).compile();

    controller = module.get<AislesController>(AislesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
