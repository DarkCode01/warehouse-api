import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AuditStatus } from 'generated/prisma';
import { CreateAuditResultDto } from './create-audit-result.dto';

export class UpdateAuditResultDto extends PartialType(CreateAuditResultDto) {
  @ApiProperty()
  @IsEnum(AuditStatus)
  status: AuditStatus;
}
