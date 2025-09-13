import { Test, TestingModule } from '@nestjs/testing';
import { AuditResultsService } from './audit-results.service';

describe('AuditResultsService', () => {
  let service: AuditResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditResultsService],
    }).compile();

    service = module.get<AuditResultsService>(AuditResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
