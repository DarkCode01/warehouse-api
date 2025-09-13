import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditTaskDto } from './dto/create-audit-task.dto';
import { UpdateAuditTaskDto } from './dto/update-audit-task.dto';

@Injectable()
export class AuditTasksService {
  constructor(private dbService: DatabaseService) {}

  create(createAuditTaskDto: CreateAuditTaskDto) {
    return this.dbService.auditTask.create({
      data: createAuditTaskDto,
    });
  }

  findAll(planId: string) {
    return this.dbService.auditTask.findMany({
      where: { planId },
    });
  }

  update(id: string, updateAuditTaskDto: UpdateAuditTaskDto) {
    return this.dbService.auditTask.update({
      where: { id },
      data: updateAuditTaskDto,
    });
  }
}
