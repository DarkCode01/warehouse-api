import { Test, TestingModule } from '@nestjs/testing';
import { AuditTasksController } from './audit-tasks.controller';
import { AuditTasksService } from './audit-tasks.service';

describe('AuditTasksController', () => {
  let controller: AuditTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditTasksController],
      providers: [AuditTasksService],
    }).compile();

    controller = module.get<AuditTasksController>(AuditTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
