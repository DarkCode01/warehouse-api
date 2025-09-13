import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AislesController } from './aisles.controller';
import { AislesService } from './aisles.service';

@Module({
  controllers: [AislesController],
  providers: [AislesService],
  imports: [DatabaseModule],
})
export class AislesModule {}
