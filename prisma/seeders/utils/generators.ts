import type { ActivityType, Bin } from 'generated/prisma';
import { CONSTANTS } from '../data/constants';

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomDate = (daysAgo: number): Date => {
  const baseDate = Date.now() - daysAgo * CONSTANTS.TIME.ONE_DAY_MS;
  const randomOffset = Math.random() * CONSTANTS.TIME.ONE_DAY_MS;
  return new Date(baseDate - randomOffset);
};

export const shouldHaveAuditDate = (): boolean => Math.random() > 0.4;

export const generateBinCode = (
  aisleCode: string,
  rackNumber: number,
  position: number,
): string => {
  return `${aisleCode}${rackNumber}-${position.toString().padStart(2, '0')}`;
};

export const generateActivityData = (
  activityType: string,
  randomBin: Bin,
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
    type: activityType as ActivityType,
    quantity: config.quantity,
    notes: config.notes,
    created_at: activityDate,
  };
};
