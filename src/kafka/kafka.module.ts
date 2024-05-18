import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule],
  providers: [KafkaService],
})
export class KafkaModule {}
