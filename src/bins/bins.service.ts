import { Injectable } from '@nestjs/common';
import { Bin } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Injectable()
export class BinsService {
  constructor(private dbService: DatabaseService) {}

  create(createBinDto: CreateBinDto): Promise<Bin> {
    return this.dbService.bin.create({
      data: createBinDto,
    });
  }

  findAll() {
    return this.dbService.bin.findMany();
  }

  findOne(id: string) {
    return this.dbService.bin.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBinDto: UpdateBinDto) {
    return this.dbService.bin.update({
      where: { id },
      data: updateBinDto,
    });
  }
}
