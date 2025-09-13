import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuditPlansService } from './audit-plans.service';
import { CreateAuditPlanDto } from './dto/create-audit-plan.dto';
import { UpdateAuditPlanDto } from './dto/update-audit-plan.dto';

@Controller('plans')
export class AuditPlansController {
  constructor(private readonly auditPlansService: AuditPlansService) {}

  @Post()
  create(@Body() createAuditPlanDto: CreateAuditPlanDto) {
    return this.auditPlansService.create(createAuditPlanDto);
  }

  @Get(':warehouseId/all')
  findAll(@Param('warehouseId') warehouseId: string) {
    return this.auditPlansService.findAll(warehouseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditPlansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuditPlanDto: UpdateAuditPlanDto,
  ) {
    return this.auditPlansService.update(id, updateAuditPlanDto);
  }
}
