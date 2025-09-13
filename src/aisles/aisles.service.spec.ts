import { Test, TestingModule } from '@nestjs/testing';
import { AislesService } from './aisles.service';

describe('AislesService', () => {
  let service: AislesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AislesService],
    }).compile();

    service = module.get<AislesService>(AislesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
