import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditResultDto } from './dto/create-audit-result.dto';
import { UpdateAuditResultDto } from './dto/update-audit-result.dto';

@Injectable()
export class AuditResultsService {
  constructor(private dbService: DatabaseService) {}

  create(createAuditResultDto: CreateAuditResultDto) {
    return this.dbService.auditResult.create({
      data: createAuditResultDto,
    });
  }

  findAll(taskId: string) {
    return this.dbService.auditResult.findMany({
      where: { taskId },
    });
  }

  findOne(id: string) {
    return this.dbService.auditResult.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAuditResultDto: UpdateAuditResultDto) {
    return this.dbService.auditResult.update({
      where: { id },
      data: updateAuditResultDto,
    });
  }
}
