import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { CdcService } from './cdc.service';
import { CdcController } from './cdc.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CdcController],
  providers: [CdcService],
})
export class CdcModule {}
