/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { ActivityType, Bin } from 'generated/prisma';
import { CONSTANTS } from './constants';
import {
  generateRandomDate,
  generateRandomNumber,
  shouldHaveAuditDate,
} from './utils';

// ==================== DATA GENERATORS ====================
export const generateRackData = (rackNumber: number, aisleId: string) => ({
  number: rackNumber,
  aisleId,
});

export const generateBinCode = (
  aisleCode: string,
  rackNumber: number,
  position: number,
): string => {
  return `${aisleCode}${rackNumber}-${position.toString().padStart(2, '0')}`;
};

export const generateBinData = (
  binCode: string,
  position: number,
  rackId: string,
  warehouseId: string,
) => ({
  code: binCode,
  position,
  rack_id: rackId,
  warehouse_id: warehouseId,
  pallet_count: generateRandomNumber(1, 6),
  capacity: CONSTANTS.WAREHOUSE.BIN_CAPACITY,
  last_audit_date: shouldHaveAuditDate()
    ? generateRandomDate(generateRandomNumber(1, 60))
    : null,
  is_active: true,
});

export const generateActivityData = (
  activityType: string,
  randomBin: any,
  activityDate: Date,
) => {
  const activityConfigs = {
    PUTAWAY: {
      quantity: generateRandomNumber(1, 2),
      notes: 'Recepción de mercancía',
    },
    PICK: {
      quantity: generateRandomNumber(1, 2),
      notes: 'Picking para pedido',
    },
    MOVE: {
      quantity: 1,
      notes: 'Reubicación de pallet',
    },
    ADJUSTMENT: {
      quantity: 1,
      notes: 'Ajuste por discrepancia',
    },
  };

  const config = activityConfigs[activityType as keyof typeof activityConfigs];

  return {
    bin_id: randomBin.id,
    type: activityType as any,
    quantity: config.quantity,
    notes: config.notes,
    created_at: activityDate,
  };
};
