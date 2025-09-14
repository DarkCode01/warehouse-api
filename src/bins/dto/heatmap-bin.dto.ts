import { ApiProperty } from '@nestjs/swagger';

export class HeatmapBinDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  riskScore: number;

  @ApiProperty()
  palletCount: number;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  aisleDescription: string;

  @ApiProperty()
  rackNumber: number;
}
