import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  name: string;
}
