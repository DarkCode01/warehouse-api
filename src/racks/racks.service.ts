import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRackDto } from './dto/create-rack.dto';

@Injectable()
export class RacksService {
  constructor(private dbService: DatabaseService) {}

  create(createRackDto: CreateRackDto) {
    return this.dbService.rack.create({
      data: createRackDto,
    });
  }
}
