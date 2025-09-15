import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
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

  // @Post(':binCode')
  // async audit(@Param('binCode') binCode: string) {
  //   const bin = await this.binsService.findOneByBinCode(binCode);
  //   return;
  // }

  @Get()
  findAll() {
    return this.binsService.findAll();
  }

  @Get('code/:binCode')
  findOne(@Param('binCode') binCode: string) {
    return this.binsService.findOneByBinCode(binCode);
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
