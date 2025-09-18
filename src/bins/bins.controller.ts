import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateAuditResultDto } from 'src/audit-results/dto/create-audit-result.dto';
import { BinsService } from './bins.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { RiskScoreBin } from './dto/score-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  create(@Body() createBinDto: CreateBinDto) {
    return this.binsService.create(createBinDto);
  }

  @Post('audit')
  audit(@Body() binToAudit: CreateAuditResultDto) {
    return this.binsService.audit(binToAudit);
  }

  @Get()
  findAll() {
    return this.binsService.findAll();
  }

  @Get('warehouse/:warehouseId')
  findAllByWarehouse(@Param('warehouseId') warehouseId: string) {
    return this.binsService.findAllHighestRiskAndLimit(warehouseId, 30);
  }

  @Get('code/:binCode')
  async findOne(@Param('binCode') binCode: string) {
    const bin = await this.binsService.findOneByBinCode(binCode);

    if (!bin) throw new NotFoundException(`Bin not found by code ${binCode}.`);

    return bin;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinDto: UpdateBinDto) {
    return this.binsService.update(id, updateBinDto);
  }

  @Patch(':id/recompute')
  @ApiCreatedResponse({
    description: '',
    type: RiskScoreBin,
  })
  async updateRiskScore(@Param('id') id: string) {
    const bin = await this.binsService.findOne(id);

    if (!bin) return null;

    return this.binsService.updateScore(bin);
  }
}
