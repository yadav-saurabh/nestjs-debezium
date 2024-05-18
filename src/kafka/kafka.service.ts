import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  private readonly kafka: Kafka;
  private readonly kafkaTopicPrefix: Kafka;
  private consumer: Consumer;

  constructor(private configService: ConfigService) {
    this.kafkaTopicPrefix = this.configService.get('KAFKA_TOPIC_PREFIX');
    this.kafka = new Kafka({
      brokers: [this.configService.get('KAFKA_BROKERS')],
    });
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.listen();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.consumer.disconnect();
  }

  private async listen(): Promise<void> {
    try {
      const consumer = this.kafka.consumer({
        groupId: this.configService.get('KAFKA_CONSUMER_GROUP_ID'),
      });
      this.consumer = consumer;

      await consumer.connect();
      await consumer.subscribe({
        topics: [`${this.kafkaTopicPrefix}.public.user`],
        fromBeginning: true,
      });

      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          if (!message.value) {
            return;
          }
          const parsedMessage = JSON.parse(message.value.toString());
          const eventPayload = {
            topic,
            database: parsedMessage.payload.source.db,
            table: parsedMessage.payload.source.table,
            operationType: parsedMessage.payload.op,
            data: parsedMessage.payload.after,
            previousData: parsedMessage.payload.before,
          };
          console.log({ eventPayload });
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
