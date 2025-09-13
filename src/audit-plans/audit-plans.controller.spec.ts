import { Test, TestingModule } from '@nestjs/testing';
import { AuditPlansController } from './audit-plans.controller';
import { AuditPlansService } from './audit-plans.service';

describe('AuditPlansController', () => {
  let controller: AuditPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditPlansController],
      providers: [AuditPlansService],
    }).compile();

    controller = module.get<AuditPlansController>(AuditPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
