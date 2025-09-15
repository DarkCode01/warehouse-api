import { Module } from '@nestjs/common';
import { AuditResultsModule } from 'src/audit-results/audit-results.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuditTasksController } from './audit-tasks.controller';
import { AuditTasksService } from './audit-tasks.service';

@Module({
  controllers: [AuditTasksController],
  providers: [AuditTasksService],
  imports: [DatabaseModule, AuditResultsModule],
  exports: [AuditTasksService],
})
export class AuditTasksModule {}
