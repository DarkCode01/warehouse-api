import { Module } from '@nestjs/common';
import { AislesModule } from './aisles/aisles.module';
import { AuditPlansModule } from './audit-plans/audit-plans.module';
import { BinActivitiesModule } from './bin-activities/bin-activities.module';
import { BinsModule } from './bins/bins.module';
import { RacksModule } from './racks/racks.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuditTasksModule } from './audit-tasks/audit-tasks.module';
import { AuditResultsModule } from './audit-results/audit-results.module';
import { RiskScoreModule } from './risk-score/risk-score.module';

@Module({
  imports: [
    WarehousesModule,
    AislesModule,
    RacksModule,
    BinsModule,
    BinActivitiesModule,
    AuditPlansModule,
    AuditTasksModule,
    AuditResultsModule,
    RiskScoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
