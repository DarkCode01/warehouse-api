import { PartialType } from '@nestjs/swagger';
import { CreateAuditPlanDto } from './create-audit-plan.dto';

export class UpdateAuditPlanDto extends PartialType(CreateAuditPlanDto) {}
