import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BinsController } from './bins.controller';
import { BinsService } from './bins.service';

@Module({
  controllers: [BinsController],
  providers: [BinsService],
  imports: [DatabaseModule],
  exports: [BinsService],
})
export class BinsModule {}
