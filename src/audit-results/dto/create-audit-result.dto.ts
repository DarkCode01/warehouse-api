import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
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
  @IsNumber()
  discrepancy: number;

  @ApiProperty()
  @IsEnum(AuditStatus)
  status: AuditStatus;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  notes?: string;

  @ApiProperty()
  @IsUUID()
  taskId: string;

  @ApiProperty()
  @IsUUID()
  bin_id: string;
}
