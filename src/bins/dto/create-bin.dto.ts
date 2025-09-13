import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateBinDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  @MinLength(3)
  code: string; // A1-01

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  position: number; // at rack

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  pallet_count: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  rack_id: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  warehouse_id: string;
}
