import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, TaskStatus } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuditTaskDto } from './dto/create-audit-task.dto';
import { UpdateAuditTaskDto } from './dto/update-audit-task.dto';

type Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>;

@Injectable()
export class AuditTasksService {
  constructor(private dbService: DatabaseService) {}

  create(createAuditTaskDto: CreateAuditTaskDto) {
    return this.dbService.auditTask.create({
      data: createAuditTaskDto,
    });
  }

  findOne(id: string) {
    return this.dbService.auditTask.findUnique({
      where: { id },
      include: { bin: true },
    });
  }

  findOneActiveByBin(binId: string) {
    return this.dbService.auditTask.findFirst({
      where: {
        bin_id: binId,
        status: TaskStatus.PENDING,
      },
    });
  }

  createBulk(tasksDto: Array<CreateAuditTaskDto>, transaction?: Transaction) {
    let tx: DatabaseService | Transaction = this.dbService;

    if (transaction) tx = transaction;

    return tx.auditTask.createMany({
      data: tasksDto,
      skipDuplicates: true,
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
