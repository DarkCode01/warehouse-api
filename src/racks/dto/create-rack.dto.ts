import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';

export class CreateRackDto {
  @ApiProperty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  aisleId: string;
}
