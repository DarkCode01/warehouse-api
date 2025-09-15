import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BinActivitiesController } from './bin-activities.controller';
import { BinActivitiesService } from './bin-activities.service';

@Module({
  controllers: [BinActivitiesController],
  providers: [BinActivitiesService],
  imports: [DatabaseModule],
  exports: [BinActivitiesService],
})
export class BinActivitiesModule {}
