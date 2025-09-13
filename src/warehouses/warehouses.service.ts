import { Injectable } from '@nestjs/common';
import { Warehouse } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(private dbService: DatabaseService) {}

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
}
