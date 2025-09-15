import { Injectable } from '@nestjs/common';
import { Bin } from 'generated/prisma';
import { BinActivitiesService } from 'src/bin-activities/bin-activities.service';
import { DatabaseService } from 'src/database/database.service';
import { RiskScoreService } from 'src/risk-score/risk-score.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { RiskScoreBin } from './dto/score-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Injectable()
export class BinsService {
  constructor(
    private dbService: DatabaseService,
    private binActivitiesService: BinActivitiesService,
    private riskScoreService: RiskScoreService,
  ) {}

  create(createBinDto: CreateBinDto): Promise<Bin> {
    return this.dbService.bin.create({
      data: createBinDto,
    });
  }

  findAll() {
    return this.dbService.bin.findMany();
  }

  findOne(id: string) {
    return this.dbService.bin.findUnique({
      where: { id },
    });
  }

  findOneByBinCode(binCode: string) {
    return this.dbService.bin.findUnique({
      where: { code: binCode },
    });
  }

  findAllByWarehouse(warehouseId: string) {
    return this.dbService.bin.findMany({
      where: { warehouse_id: warehouseId, is_active: true },
      select: {
        id: true,
        code: true,
        position: true,
        risk_score: true,
        pallet_count: true,
        capacity: true,
        rack: {
          select: {
            number: true,
            aisle: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          rack: {
            aisle: {
              code: 'asc',
            },
          },
        },
        {
          rack: {
            number: 'asc',
          },
        },
        {
          position: 'asc',
        },
      ],
    });
  }

  update(id: string, updateBinDto: Partial<UpdateBinDto>) {
    return this.dbService.bin.update({
      where: { id },
      data: updateBinDto,
    });
  }

  async updateScore(bin: Bin) {
    const activities = await this.binActivitiesService.findAll(bin.id);

    // new scores
    const auditFactor = this.riskScoreService.getScoreByAuditFactor(
      bin?.last_audit_date,
    );
    const adjustmentFactor =
      this.riskScoreService.getScoreByAdjustmentsFactor(activities);
    const activityFactor =
      this.riskScoreService.getScoreByActivitiesFactor(activities);
    const riskScore =
      auditFactor.value + adjustmentFactor.value + activityFactor.value;

    // update bin score
    if (
      riskScore !== bin?.risk_score ||
      auditFactor.value !== bin.audit_factor ||
      activityFactor.value !== bin.activity_factor ||
      adjustmentFactor.value !== bin.adjustment_factor
    ) {
      await this.update(bin.id, {
        risk_score: riskScore,
        audit_factor: auditFactor.value,
        adjustment_factor: adjustmentFactor.value,
        activity_factor: activityFactor.value,
      });
    }

    return {
      riskScore,
      auditFactor: auditFactor.value,
      lastAuditDayCount: auditFactor.count,
      activityFactor: activityFactor.value,
      activityCount: activityFactor.count,
      adjustmentCount: adjustmentFactor.count,
      adjustmentFactor: adjustmentFactor.value,
    } as RiskScoreBin;
  }

  async bulkUpdateScore(warehouseId: string) {
    const bins = await this.findAllByWarehouse(warehouseId);
    let updated = 0;
    let errors = 0;

    // update score for all bins
    for (const bin of bins) {
      try {
        await this.updateScore(bin as unknown as Bin);
        updated += 1;
      } catch (error) {
        errors += 1;
        console.log(error);
      }
    }

    return {
      binsUpdated: updated,
      binsNotUpdated: errors,
    };
  }

  async findAllHighestRiskAndLimit(warehouseId: string, take: number) {
    return this.dbService.bin.findMany({
      where: { warehouse_id: warehouseId },
      select: {
        id: true,
      },
      orderBy: {
        risk_score: 'desc',
      },
      take,
    });
  }
}
