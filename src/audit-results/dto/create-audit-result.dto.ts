import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { AuditStatus } from 'generated/prisma';

export class CreateAuditResultDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  expected_count: number;

  @ApiProperty()
  @IsNumber()
  actual_count: number;

  @ApiProperty()
  @IsEnum(AuditStatus)
  status: AuditStatus;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  notes?: string;

  // internal values
  taskId: string;
  bin_id: string;
  discrepancy: number;
}
