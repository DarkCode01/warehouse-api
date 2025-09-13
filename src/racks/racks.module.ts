import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RacksController } from './racks.controller';
import { RacksService } from './racks.service';

@Module({
  controllers: [RacksController],
  providers: [RacksService],
  imports: [DatabaseModule],
})
export class RacksModule {}
