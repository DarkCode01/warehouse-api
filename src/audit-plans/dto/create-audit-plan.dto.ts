import { ApiProperty } from '@nestjs/swagger';
import { PlanStatus } from 'generated/prisma';

export class CreateAuditPlanDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  // Private data
  status: PlanStatus;
  warehouse_id: string;
}
