import { Controller, Get, Body, Put, Post } from '@nestjs/common';

import { CdcService } from './cdc.service';
import { CreateCdcDto } from './dto/create-cdc.dto';
import { PutCdcConnectionDto } from './dto/put-cdc-connection.dto';

@Controller('cdc')
export class CdcController {
  constructor(private readonly cdcService: CdcService) {}

  @Post()
  createConnectors(@Body() data: CreateCdcDto) {
    return this.cdcService.createConnectors(data);
  }

  @Get()
  getConnectors() {
    return this.cdcService.getConnectors();
  }

  @Put('/pause')
  pauseCDC(@Body() data: PutCdcConnectionDto) {
    return this.cdcService.pauseCDC(data.connector);
  }

  @Put('/resume')
  resumeCDC(@Body() data: PutCdcConnectionDto) {
    return this.cdcService.resumeCDC(data.connector);
  }
}
