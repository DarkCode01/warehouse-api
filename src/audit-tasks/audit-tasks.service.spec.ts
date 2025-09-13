import { Test, TestingModule } from '@nestjs/testing';
import { AuditTasksService } from './audit-tasks.service';

describe('AuditTasksService', () => {
  let service: AuditTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditTasksService],
    }).compile();

    service = module.get<AuditTasksService>(AuditTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
