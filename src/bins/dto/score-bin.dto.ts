import { ApiProperty } from '@nestjs/swagger';

export class RiskScoreBin {
  @ApiProperty()
  riskScore: number;

  @ApiProperty()
  auditFactor: number;

  @ApiProperty()
  adjustmentFactor: number;

  @ApiProperty()
  activityFactor: number;

  @ApiProperty()
  adjustmentCount: number;

  @ApiProperty()
  activityCount: number;

  @ApiProperty()
  lastAuditDayCount: number | null;
}
