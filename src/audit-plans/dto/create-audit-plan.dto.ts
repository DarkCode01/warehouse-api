import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { PlanStatus } from 'generated/prisma';

export class CreateAuditPlanDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsEnum(PlanStatus)
  status: PlanStatus;

  @ApiProperty()
  @IsUUID()
  warehouse_id: string;
}
