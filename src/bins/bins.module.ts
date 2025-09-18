import { Module } from '@nestjs/common';
import { AuditResultsModule } from 'src/audit-results/audit-results.module';
import { AuditTasksModule } from 'src/audit-tasks/audit-tasks.module';
import { BinActivitiesModule } from 'src/bin-activities/bin-activities.module';
import { DatabaseModule } from 'src/database/database.module';
import { RiskScoreModule } from 'src/risk-score/risk-score.module';
import { BinsController } from './bins.controller';
import { BinsService } from './bins.service';

@Module({
  controllers: [BinsController],
  providers: [BinsService],
  imports: [
    DatabaseModule,
    BinActivitiesModule,
    RiskScoreModule,
    AuditResultsModule,
    AuditTasksModule,
  ],
  exports: [BinsService],
})
export class BinsModule {}
