import { PartialType } from '@nestjs/swagger';
import { CreateAuditResultDto } from './create-audit-result.dto';

export class UpdateAuditResultDto extends PartialType(CreateAuditResultDto) {}
