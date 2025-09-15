import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

import * as timezone from 'dayjs/plugin/timezone.js';
import * as utc from 'dayjs/plugin/utc.js';
import { ActivityType, BinActivity } from 'generated/prisma';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class RiskScoreService {
  getScoreByAuditFactor(auditDate: Date | null | undefined) {
    if (!auditDate) return { count: null, value: 50 };

    const date = dayjs.utc(auditDate);
    const current = dayjs();
    const totalDays = Math.abs(date.diff(current, 'day'));

    return {
      count: totalDays,
      value: Math.min(50, Math.floor(totalDays * 0.8)),
    };
  }

  getScoreByActivitiesFactor(activities: Array<BinActivity>) {
    const movements = activities.filter(
      (activity) =>
        activity.type !== ActivityType.AUDIT &&
        activity.type !== ActivityType.ADJUSTMENT,
    );

    return {
      count: movements.length,
      value: Math.min(30, movements.length * 2),
    };
  }

  getScoreByAdjustmentsFactor(activities: Array<BinActivity>) {
    const adjustments = activities.filter(
      (activity) => activity.type === ActivityType.ADJUSTMENT,
    );

    return {
      count: adjustments.length,
      value: Math.min(20, adjustments.length * 8),
    };
  }
}
