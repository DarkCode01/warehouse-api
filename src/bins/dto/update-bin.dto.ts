import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { CreateBinDto } from './create-bin.dto';

export class UpdateBinDto extends PartialType(CreateBinDto) {
  @IsNumber()
  @IsPositive()
  position: number; // at rack

  @IsNumber()
  @IsOptional()
  @IsPositive()
  risk_score?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  audit_factor?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  activity_factor?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  adjustment_factor?: number;

  @IsNumber()
  @IsPositive()
  pallet_count: number;

  @IsUUID()
  @IsNotEmpty()
  rack_id: string;

  @IsUUID()
  @IsNotEmpty()
  warehouse_id: string;
}
