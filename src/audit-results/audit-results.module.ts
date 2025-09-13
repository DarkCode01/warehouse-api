import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuditResultsController } from './audit-results.controller';
import { AuditResultsService } from './audit-results.service';

@Module({
  controllers: [AuditResultsController],
  providers: [AuditResultsService],
  imports: [DatabaseModule],
})
export class AuditResultsModule {}
