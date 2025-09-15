import { Module } from '@nestjs/common';
import { AuditResultsModule } from 'src/audit-results/audit-results.module';
import { AuditTasksModule } from 'src/audit-tasks/audit-tasks.module';
import { BinActivitiesModule } from 'src/bin-activities/bin-activities.module';
import { BinsModule } from 'src/bins/bins.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuditPlansController } from './audit-plans.controller';
import { AuditPlansService } from './audit-plans.service';

@Module({
  controllers: [AuditPlansController],
  providers: [AuditPlansService],
  imports: [
    DatabaseModule,
    BinsModule,
    AuditTasksModule,
    AuditResultsModule,
    BinActivitiesModule,
  ],
})
export class AuditPlansModule {}
