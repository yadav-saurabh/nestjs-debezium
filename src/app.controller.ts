import {
  Body,
  Controller,
  Get,
  MethodNotAllowedException,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cdc/connectors')
  getConnectors() {
    return this.appService.getConnectors();
  }

  @Put('/cdc/pause')
  pauseCDC(@Body() data: { connector: string }) {
    if (!data.connector) {
      throw new MethodNotAllowedException('connector name is mandatory');
    }
    return this.appService.pauseCDC(data.connector);
  }

  @Put('/cdc/resume')
  resumeCDC(@Body() data: { connector: string }) {
    if (!data.connector) {
      throw new MethodNotAllowedException('connector name is mandatory');
    }
    return this.appService.resumeCDC(data.connector);
  }
}
