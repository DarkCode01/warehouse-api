import { Body, Controller, Post } from '@nestjs/common';
import { AislesService } from './aisles.service';
import { CreateAisleDto } from './dto/create-aisle.dto';

@Controller('aisles')
export class AislesController {
  constructor(private readonly aislesService: AislesService) {}

  @Post()
  create(@Body() createAisleDto: CreateAisleDto) {
    return this.aislesService.create(createAisleDto);
  }
}
