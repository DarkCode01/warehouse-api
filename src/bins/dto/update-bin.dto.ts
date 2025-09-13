import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { CreateBinDto } from './create-bin.dto';

export class UpdateBinDto extends PartialType(CreateBinDto) {
  @IsNumber()
  @IsPositive()
  position: number; // at rack

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
