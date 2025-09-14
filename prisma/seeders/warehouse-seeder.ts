import type { Aisle, Bin, Rack, Warehouse } from 'generated/prisma';
import { PrismaClient } from 'generated/prisma';
import { CONSTANTS, SEED_DATA } from './data';
import {
  generateActivityData,
  generateBinCode,
  generateRandomDate,
  generateRandomNumber,
  shouldHaveAuditDate,
} from './utils/generators';

export class WarehouseSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<void> {
    console.log('🏢 Creando estructura del almacén...');

    const warehouse = await this.createWarehouse();
    const aisles = await this.createAisles(warehouse.id);
    const racks = await this.createRacks(aisles);
    const bins = await this.createBins(racks, warehouse.id);

    await this.simulateActivities(bins);
    await this.calculateRiskScores(bins);
  }

  private async createWarehouse() {
    console.log('🏢 Creando almacén...');

    const warehouse: Warehouse = await this.prisma.warehouse.create({
      data: SEED_DATA.warehouse,
    });
    console.log('✅ Almacén creado');
    return warehouse;
  }

  private async createAisles(warehouseId: string): Promise<Aisle[]> {
    console.log('🛤️  Creando pasillos...');
    const aisles: Aisle[] = [];

    for (const aisleData of SEED_DATA.aisles) {
      const aisle = await this.prisma.aisle.create({
        data: {
          code: aisleData.code,
          name: aisleData.name,
          warehouse_id: warehouseId,
        },
      });
      aisles.push(aisle);
    }

    console.log(`✅ ${aisles.length} pasillos creados`);
    return aisles;
  }

  private async createRacks(
    aisles: Aisle[],
  ): Promise<Array<Rack & { aisleCode: string }>> {
    console.log('🗂️  Creando racks...');
    const racks: Array<Rack & { aisleCode: string }> = [];

    for (const aisle of aisles) {
      for (
        let rackNumber = 1;
        rackNumber <= CONSTANTS.WAREHOUSE.RACKS_PER_AISLE;
        rackNumber++
      ) {
        const rack = await this.prisma.rack.create({
          data: {
            number: rackNumber,
            aisleId: aisle.id,
          },
        });
        racks.push({ ...rack, aisleCode: aisle.code });
      }
    }

    console.log(`✅ ${racks.length} racks creados`);
    return racks;
  }

  private async createBins(
    racks: Array<Rack & { aisleCode: string }>,
    warehouseId: string,
  ): Promise<Bin[]> {
    console.log('📦 Creando bins...');
    const bins: Bin[] = [];

    for (const rack of racks) {
      for (
        let position = 1;
        position <= CONSTANTS.WAREHOUSE.BINS_PER_RACK;
        position++
      ) {
        const binCode = generateBinCode(rack.aisleCode, rack.number, position);

        const binData = {
          code: binCode,
          position,
          rack_id: rack.id,
          warehouse_id: warehouseId,
          pallet_count: generateRandomNumber(1, 6),
          capacity: CONSTANTS.WAREHOUSE.BIN_CAPACITY,
          last_audit_date: shouldHaveAuditDate()
            ? generateRandomDate(generateRandomNumber(1, 60))
            : null,
          is_active: true,
        };

        const bin = await this.prisma.bin.create({ data: binData });
        bins.push(bin);
      }
    }

    console.log(`✅ ${bins.length} bins creados`);
    return bins;
  }

  private async simulateActivities(bins: Bin[]): Promise<void> {
    console.log('⚡ Simulando actividades...');
    let totalActivities = 0;

    for (let day = 0; day < CONSTANTS.TIME.SIMULATION_DAYS; day++) {
      const activitiesPerDay = generateRandomNumber(
        CONSTANTS.ACTIVITIES.MIN_PER_DAY,
        CONSTANTS.ACTIVITIES.MAX_PER_DAY,
      );

      for (let i = 0; i < activitiesPerDay; i++) {
        const randomBin = bins[Math.floor(Math.random() * bins.length)];
        const activityType =
          SEED_DATA.activityTypes[
            Math.floor(Math.random() * SEED_DATA.activityTypes.length)
          ];
        const activityDate = generateRandomDate(day);

        const activityData = generateActivityData(
          activityType,
          randomBin,
          activityDate,
        );

        await this.prisma.binActivity.create({
          data: activityData,
        });

        totalActivities++;
      }
    }

    console.log(`✅ ${totalActivities} actividades simuladas`);
  }

  private async calculateRiskScores(bins: Bin[]): Promise<void> {
    console.log('📊 Calculando risk scores...');
    const thirtyDaysAgo = new Date(Date.now() - 30 * CONSTANTS.TIME.ONE_DAY_MS);

    for (const bin of bins) {
      // Factor 1: Días sin auditar
      const daysSinceAudit = this.calculateDaysSinceAudit(bin.last_audit_date);
      const auditFactor = Math.min(
        CONSTANTS.RISK_SCORING.MAX_AUDIT_FACTOR,
        Math.floor(daysSinceAudit * CONSTANTS.RISK_SCORING.AUDIT_MULTIPLIER),
      );

      // Factor 2: Actividades del último mes
      const monthlyActivities = await this.prisma.binActivity.count({
        where: {
          bin_id: bin.id,
          type: { not: 'AUDIT' },
          created_at: { gte: thirtyDaysAgo },
        },
      });
      const activityFactor = Math.min(
        CONSTANTS.RISK_SCORING.MAX_ACTIVITY_FACTOR,
        monthlyActivities * CONSTANTS.RISK_SCORING.ACTIVITY_MULTIPLIER,
      );

      // Factor 3: Ajustes del último mes
      const adjustments = await this.prisma.binActivity.count({
        where: {
          bin_id: bin.id,
          type: 'ADJUSTMENT',
          created_at: { gte: thirtyDaysAgo },
        },
      });
      const adjustmentFactor = Math.min(
        CONSTANTS.RISK_SCORING.MAX_ADJUSTMENT_FACTOR,
        adjustments * CONSTANTS.RISK_SCORING.ADJUSTMENT_MULTIPLIER,
      );

      const totalScore = Math.min(
        100,
        auditFactor + activityFactor + adjustmentFactor,
      );

      await this.prisma.bin.update({
        where: { id: bin.id },
        data: {
          risk_score: totalScore,
          audit_factor: auditFactor,
          activity_factor: activityFactor,
          adjustment_factor: adjustmentFactor,
        },
      });
    }

    console.log('✅ Risk scores calculados');
  }

  private calculateDaysSinceAudit(lastAuditDate: Date | null): number {
    if (!lastAuditDate) return CONSTANTS.TIME.MAX_AUDIT_DAYS;

    return Math.floor(
      (Date.now() - lastAuditDate.getTime()) / CONSTANTS.TIME.ONE_DAY_MS,
    );
  }
}
