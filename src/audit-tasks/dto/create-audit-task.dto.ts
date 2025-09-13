import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from 'generated/prisma';

export class CreateAuditTaskDto {
  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @IsUUID()
  planId: string;

  @ApiProperty()
  @IsUUID()
  bin_id: string;
}
