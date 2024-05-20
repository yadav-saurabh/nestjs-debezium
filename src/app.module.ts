import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { CdcModule } from './cdc/cdc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ScheduleModule.forRoot(),
    KafkaModule,
    CdcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
