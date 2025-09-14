import { Module } from '@nestjs/common';
import { BinsModule } from 'src/bins/bins.module';
import { DatabaseModule } from 'src/database/database.module';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [DatabaseModule, BinsModule],
})
export class WarehousesModule {}
