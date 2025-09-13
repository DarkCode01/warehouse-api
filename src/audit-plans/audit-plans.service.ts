import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditPlanDto } from './dto/create-audit-plan.dto';
import { UpdateAuditPlanDto } from './dto/update-audit-plan.dto';

@Injectable()
export class AuditPlansService {
  constructor(private dbService: DatabaseService) {}

  create(createAuditPlanDto: CreateAuditPlanDto) {
    return this.dbService.auditPlan.create({
      data: createAuditPlanDto,
    });
  }

  findAll(warehouseId: string) {
    return this.dbService.auditPlan.findMany({
      where: { warehouse_id: warehouseId },
    });
  }

  findOne(id: string) {
    return this.dbService.auditPlan.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAuditPlanDto: UpdateAuditPlanDto) {
    return this.dbService.auditPlan.update({
      where: { id },
      data: updateAuditPlanDto,
    });
  }
}
