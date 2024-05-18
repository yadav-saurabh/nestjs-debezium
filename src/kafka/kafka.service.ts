import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  private readonly kafka: Kafka;

  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      brokers: [`localhost:9092`],
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
        groupId: 'console-consumer-24440',
      });
      this.consumer = consumer;

      await consumer.connect();
      await consumer.subscribe({
        topics: ['nestjs-debezium-topic.public.user'],
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
