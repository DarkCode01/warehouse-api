import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ActivityType } from 'generated/prisma';

export class CreateBinActivityDto {
  @ApiProperty()
  @IsEnum(ActivityType)
  type: ActivityType;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number; // pallets quantity removed or added

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  notes?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  bin_id: string;
}
