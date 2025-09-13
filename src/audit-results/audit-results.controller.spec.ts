import { Test, TestingModule } from '@nestjs/testing';
import { AuditResultsController } from './audit-results.controller';
import { AuditResultsService } from './audit-results.service';

describe('AuditResultsController', () => {
  let controller: AuditResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditResultsController],
      providers: [AuditResultsService],
    }).compile();

    controller = module.get<AuditResultsController>(AuditResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
