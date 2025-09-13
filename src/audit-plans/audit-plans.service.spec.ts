import { Test, TestingModule } from '@nestjs/testing';
import { AuditPlansService } from './audit-plans.service';

describe('AuditPlansService', () => {
  let service: AuditPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditPlansService],
    }).compile();

    service = module.get<AuditPlansService>(AuditPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
