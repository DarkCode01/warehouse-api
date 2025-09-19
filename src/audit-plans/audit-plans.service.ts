import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import {
  ActivityType,
  AuditStatus,
  PlanStatus,
  TaskStatus,
} from 'generated/prisma';
import { AuditResultsService } from 'src/audit-results/audit-results.service';
import { CreateAuditResultDto } from 'src/audit-results/dto/create-audit-result.dto';
import { AuditTasksService } from 'src/audit-tasks/audit-tasks.service';
import { BinActivitiesService } from 'src/bin-activities/bin-activities.service';
import { BinsService } from 'src/bins/bins.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditPlanDto } from './dto/create-audit-plan.dto';
import { UpdateAuditPlanDto } from './dto/update-audit-plan.dto';

@Injectable()
export class AuditPlansService {
  constructor(
    private dbService: DatabaseService,
    private tasksService: AuditTasksService,
    private taskResultsService: AuditResultsService,
    private binsService: BinsService,
    private binActivitiesService: BinActivitiesService,
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
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        status: true,
        description: true,
        tasks: {
          select: {
            status: true,
            id: true,
            bin_id: true,
            bin: true,
            results: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.dbService.auditPlan.findUnique({
      where: { id },
      include: {
        tasks: {
          select: {
            status: true,
            id: true,
            bin_id: true,
            bin: true,
            results: true,
          },
        },
      },
    });
  }

  findCurrent(warehouseId: string) {
    return this.dbService.auditPlan.findFirst({
      where: {
        warehouse_id: warehouseId,
        status: PlanStatus.ACTIVE,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  update(id: string, updateAuditPlanDto: UpdateAuditPlanDto) {
    return this.dbService.auditPlan.update({
      where: { id },
      data: updateAuditPlanDto,
    });
  }

  async auditTask({
    auditData,
    taskId,
  }: {
    taskId: string;
    auditData: CreateAuditResultDto;
  }) {
    const task = await this.tasksService.findOne(taskId);
    const resultPassed = auditData.status === AuditStatus.PASS;
    const newAuditDate = dayjs().toDate();

    if (!task) return null;

    // Prepare payload
    auditData.taskId = taskId;
    auditData.bin_id = task.bin_id;
    auditData.discrepancy = auditData.expected_count - auditData.actual_count;

    // creating result
    await this.taskResultsService.create(auditData);

    if (resultPassed) {
      await this.tasksService.update(taskId, {
        status: TaskStatus.DONE,
      });
    }

    // update bin audit date

    await this.binsService.update(task.bin_id, {
      last_audit_date: newAuditDate,
    });
    task.bin.last_audit_date = newAuditDate;

    // recompute bin score
    await this.binsService.updateScore(task.bin);

    // create bin activity
    await this.binActivitiesService.create({
      type: ActivityType.AUDIT,
      quantity: auditData.actual_count,
      notes: auditData.notes,
      bin_id: task.bin_id,
    });

    return {
      taskAudited: taskId,
      resultStatus: auditData.status,
      taskStatus: resultPassed ? TaskStatus.DONE : TaskStatus.PENDING,
    };
  }
}
