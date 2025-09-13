import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuditPlansController } from './audit-plans.controller';
import { AuditPlansService } from './audit-plans.service';

@Module({
  controllers: [AuditPlansController],
  providers: [AuditPlansService],
  imports: [DatabaseModule],
})
export class AuditPlansModule {}
