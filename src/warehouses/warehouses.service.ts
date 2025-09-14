import { Injectable } from '@nestjs/common';
import { Warehouse } from 'generated/prisma';
import { BinsService } from 'src/bins/bins.service';
import { HeatmapBinDto } from 'src/bins/dto/heatmap-bin.dto';
import { DatabaseService } from 'src/database/database.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { StatGroupDto } from './dto/stat-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly binsService: BinsService,
  ) {}

  create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.dbService.warehouse.create({
      data: createWarehouseDto,
    });
  }

  findOne(id: string) {
    return this.dbService.warehouse.findUnique({
      where: { id },
    });
  }

  async getHeatmap(
    warehouseId: string,
  ): Promise<{ [keyname: string]: Array<HeatmapBinDto> }> {
    const bins = await this.binsService.findAllByWarehouse(warehouseId);

    return bins.reduce((acc, bin) => {
      const key = `${bin.rack.aisle.code}${bin.rack.number}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({
        id: bin.id,
        code: bin.code,
        position: bin.position,
        riskScore: bin.risk_score,
        palletCount: bin.pallet_count,
        capacity: bin.capacity,
        aisleDescription: bin.rack.aisle.name,
        rackNumber: bin.rack.number,
      });

      return acc;
    }, {});
  }

  async getStats(warehouseId: string): Promise<Array<StatGroupDto>> {
    const groupedBins = await this.getHeatmap(warehouseId);

    return Object.entries(groupedBins).map(([key, bins]) => ({
      group: key,
      totalBins: bins.length,
      totalPallets: bins.reduce((sum, bin) => sum + bin.palletCount, 0),
      totalCapacity: bins.reduce((sum, bin) => sum + bin.capacity, 0),
      averageRiskScore:
        bins.reduce((sum, bin) => sum + bin.riskScore, 0) / bins.length,
    }));
  }
}
