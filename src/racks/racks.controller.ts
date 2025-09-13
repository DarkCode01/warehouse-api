import { Body, Controller, Post } from '@nestjs/common';
import { CreateRackDto } from './dto/create-rack.dto';
import { RacksService } from './racks.service';

@Controller('racks')
export class RacksController {
  constructor(private readonly racksService: RacksService) {}

  @Post()
  create(@Body() createRackDto: CreateRackDto) {
    return this.racksService.create(createRackDto);
  }
}
