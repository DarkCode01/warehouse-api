import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuditTasksService } from './audit-tasks.service';
import { CreateAuditTaskDto } from './dto/create-audit-task.dto';

@Controller('plans/tasks')
export class AuditTasksController {
  constructor(private readonly auditTasksService: AuditTasksService) {}

  @Post()
  create(@Body() createAuditTaskDto: CreateAuditTaskDto) {
    return this.auditTasksService.create(createAuditTaskDto);
  }

  @Get(':planId')
  findAll(@Param('planId') planId: string) {
    return this.auditTasksService.findAll(planId);
  }
}
