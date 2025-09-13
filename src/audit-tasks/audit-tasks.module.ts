import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuditTasksController } from './audit-tasks.controller';
import { AuditTasksService } from './audit-tasks.service';

@Module({
  controllers: [AuditTasksController],
  providers: [AuditTasksService],
  imports: [DatabaseModule],
})
export class AuditTasksModule {}
