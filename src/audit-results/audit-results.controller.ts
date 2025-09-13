import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuditResultsService } from './audit-results.service';
import { CreateAuditResultDto } from './dto/create-audit-result.dto';
import { UpdateAuditResultDto } from './dto/update-audit-result.dto';

@Controller('/results')
export class AuditResultsController {
  constructor(private readonly auditResultsService: AuditResultsService) {}

  @Post()
  create(@Body() createAuditResultDto: CreateAuditResultDto) {
    return this.auditResultsService.create(createAuditResultDto);
  }

  @Get(':taskId/all')
  findAll(@Param('taskId') taskId: string) {
    return this.auditResultsService.findAll(taskId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditResultsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuditResultDto: UpdateAuditResultDto,
  ) {
    return this.auditResultsService.update(id, updateAuditResultDto);
  }
}
