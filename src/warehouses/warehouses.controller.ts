import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { HeatmapBinDto } from 'src/bins/dto/heatmap-bin.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { StatGroupDto } from './dto/stat-warehouse.dto';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get(':id/heatmap')
  @ApiCreatedResponse({
    description: '',
    type: HeatmapBinDto,
  })
  getHeatmap(@Param('id') id: string) {
    return this.warehousesService.getHeatmap(id);
  }

  @Get(':id/stats')
  @ApiCreatedResponse({
    description: '',
    type: StatGroupDto,
  })
  getStats(@Param('id') id: string) {
    return this.warehousesService.getStats(id);
  }

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(id);
  }
}
