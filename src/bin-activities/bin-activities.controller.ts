import { Controller, Get, Param } from '@nestjs/common';
import { BinActivitiesService } from './bin-activities.service';

@Controller('bins/:binId/activities')
export class BinActivitiesController {
  constructor(private readonly binActivitiesService: BinActivitiesService) {}

  @Get()
  findAll(@Param('binId') binId: string) {
    return this.binActivitiesService.findAll(binId);
  }
}
