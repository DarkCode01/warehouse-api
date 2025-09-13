import { CONSTANTS } from './constants';

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomDate = (daysAgo: number): Date => {
  const baseDate = Date.now() - daysAgo * CONSTANTS.TIME.ONE_DAY_MS;
  const randomOffset = Math.random() * CONSTANTS.TIME.ONE_DAY_MS;
  return new Date(baseDate - randomOffset);
};

export const shouldHaveAuditDate = (): boolean => Math.random() > 0.4;
