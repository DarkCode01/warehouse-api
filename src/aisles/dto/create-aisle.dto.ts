import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsNotEmpty,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAisleDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(4)
  @IsHexadecimal()
  code: string; // "A", "B1", "C20"

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  warehouse_id: string;
}
