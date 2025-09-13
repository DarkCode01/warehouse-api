import { Test, TestingModule } from '@nestjs/testing';
import { BinActivitiesController } from './bin-activities.controller';
import { BinActivitiesService } from './bin-activities.service';

describe('BinActivitiesController', () => {
  let controller: BinActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinActivitiesController],
      providers: [BinActivitiesService],
    }).compile();

    controller = module.get<BinActivitiesController>(BinActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
