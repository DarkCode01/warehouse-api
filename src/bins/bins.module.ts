import { Module } from '@nestjs/common';
import { BinActivitiesModule } from 'src/bin-activities/bin-activities.module';
import { DatabaseModule } from 'src/database/database.module';
import { RiskScoreModule } from 'src/risk-score/risk-score.module';
import { BinsController } from './bins.controller';
import { BinsService } from './bins.service';

@Module({
  controllers: [BinsController],
  providers: [BinsService],
  imports: [DatabaseModule, BinActivitiesModule, RiskScoreModule],
  exports: [BinsService],
})
export class BinsModule {}
