import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [DatabaseModule],
})
export class WarehousesModule {}
