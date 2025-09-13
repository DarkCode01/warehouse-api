import { Module } from '@nestjs/common';
import { AislesModule } from './aisles/aisles.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { RacksModule } from './racks/racks.module';
import { BinsModule } from './bins/bins.module';

@Module({
  imports: [WarehousesModule, AislesModule, RacksModule, BinsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
