import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBinActivityDto } from './dto/create-bin-activity.dto';

@Injectable()
export class BinActivitiesService {
  constructor(private dbService: DatabaseService) {}

  create(createBinActivityDto: CreateBinActivityDto) {
    return this.dbService.binActivity.create({
      data: createBinActivityDto,
    });
  }

  findAll(binId: string) {
    return this.dbService.binActivity.findMany({
      where: { bin_id: binId },
    });
  }
}
