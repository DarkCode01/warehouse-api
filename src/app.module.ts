import { Module } from '@nestjs/common';
import { AislesModule } from './aisles/aisles.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { RacksModule } from './racks/racks.module';

@Module({
  imports: [WarehousesModule, AislesModule, RacksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
