import { Injectable } from '@nestjs/common';
import { Aisle } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateAisleDto } from './dto/create-aisle.dto';

@Injectable()
export class AislesService {
  constructor(private dbService: DatabaseService) {}

  create(createAisleDto: CreateAisleDto): Promise<Aisle> {
    return this.dbService.aisle.create({
      data: createAisleDto,
    });
  }
}
