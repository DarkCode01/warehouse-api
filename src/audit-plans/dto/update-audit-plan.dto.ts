import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PlanStatus } from 'generated/prisma';
import { CreateAuditPlanDto } from './create-audit-plan.dto';

export class UpdateAuditPlanDto extends PartialType(CreateAuditPlanDto) {
  @ApiProperty()
  @IsEnum(PlanStatus)
  status: PlanStatus;
}
