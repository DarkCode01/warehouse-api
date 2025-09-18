import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateAuditResultDto } from 'src/audit-results/dto/create-audit-result.dto';
import { BinsService } from 'src/bins/bins.service';
import { AuditPlansService } from './audit-plans.service';
import { CreateAuditPlanDto } from './dto/create-audit-plan.dto';
import { UpdateAuditPlanDto } from './dto/update-audit-plan.dto';

@Controller('plans')
export class AuditPlansController {
  constructor(
    private readonly auditPlansService: AuditPlansService,
    private binsService: BinsService,
  ) {}

  @Post(':warehouseId/generate/:count')
  async create(
    @Param('warehouseId') warehouseId: string,
    @Param('count') count: string,
    @Body() createAuditPlanDto: CreateAuditPlanDto,
  ) {
    const binIds = await this.binsService.findAllHighestRiskAndLimit(
      warehouseId,
      +count || 10,
    );

    return this.auditPlansService.create({
      createAuditPlanDto,
      warehouseId,
      binIds,
    });
  }

  @Get(':warehouseId/all')
  findAll(@Param('warehouseId') warehouseId: string) {
    return this.auditPlansService.findAll(warehouseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditPlansService.findOne(id);
  }

  @Get(':warehouseId/recent')
  async findOneRecent(@Param('warehouseId') warehouseId: string) {
    return this.auditPlansService.findCurrent(warehouseId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuditPlanDto: UpdateAuditPlanDto,
  ) {
    return this.auditPlansService.update(id, updateAuditPlanDto);
  }

  @Patch(':id/audit/:taskId')
  audit(
    @Param('taskId') taskId: string,
    @Body() taskAuditData: CreateAuditResultDto,
  ) {
    return this.auditPlansService.auditTask({
      taskId,
      auditData: taskAuditData,
    });
  }
}
