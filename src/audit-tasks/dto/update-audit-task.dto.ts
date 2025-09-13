import { PartialType } from '@nestjs/swagger';
import { CreateAuditTaskDto } from './create-audit-task.dto';

export class UpdateAuditTaskDto extends PartialType(CreateAuditTaskDto) {}
