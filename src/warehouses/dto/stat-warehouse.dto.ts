import { ApiProperty } from '@nestjs/swagger';

export class StatGroupDto {
  @ApiProperty()
  group: string;

  @ApiProperty()
  totalBins: number;

  @ApiProperty()
  totalPallets: number;

  @ApiProperty()
  totalCapacity: number;

  @ApiProperty()
  averageRiskScore: number;
}
