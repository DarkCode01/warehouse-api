import { Test, TestingModule } from '@nestjs/testing';
import { BinActivitiesService } from './bin-activities.service';

describe('BinActivitiesService', () => {
  let service: BinActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinActivitiesService],
    }).compile();

    service = module.get<BinActivitiesService>(BinActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
