import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PlanStatus, TaskStatus } from 'generated/prisma';
import { AuditTasksService } from 'src/audit-tasks/audit-tasks.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditPlanDto } from './dto/create-audit-plan.dto';
import { UpdateAuditPlanDto } from './dto/update-audit-plan.dto';

@Injectable()
export class AuditPlansService {
  constructor(
    private dbService: DatabaseService,
    private tasksService: AuditTasksService,
  ) {}

  async create({
    createAuditPlanDto,
    warehouseId,
    binIds,
  }: {
    warehouseId: string;
    createAuditPlanDto: CreateAuditPlanDto;
    binIds: Array<{ id: string }>;
  }) {
    // default status and warehouse id
    createAuditPlanDto.warehouse_id = warehouseId;
    createAuditPlanDto.status = PlanStatus.ACTIVE;

    // Add a default description to plan
    if (!createAuditPlanDto.description) {
      const currentDate = dayjs().format('[Plan] [created] [on] dd MMMM YYYY');
      createAuditPlanDto.description = currentDate;
    }

    // Create plan
    return await this.dbService.$transaction(async (tx) => {
      const plan = await tx.auditPlan.create({
        data: createAuditPlanDto,
      });

      // Generate dto audit task by n count tasks
      const tasksDto = binIds.map(({ id }) => ({
        status: TaskStatus.PENDING,
        planId: plan.id,
        bin_id: id,
      }));

      // Insert tasks dto on database
      await this.tasksService.createBulk(tasksDto, tx);

      return plan;
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
      include: {
        tasks: true,
      },
    });
  }

  update(id: string, updateAuditPlanDto: UpdateAuditPlanDto) {
    return this.dbService.auditPlan.update({
      where: { id },
      data: updateAuditPlanDto,
    });
  }
}
