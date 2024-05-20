import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Admin, Consumer, Kafka } from 'kafkajs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class KafkaService
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  private readonly kafka: Kafka;
  private readonly kafkaAdmin: Admin;
  private readonly kafkaTopicPrefix: string;
  private readonly consumer: Consumer;
  private kafkaTotalSubscribedTopics: number = 0;

  constructor(private configService: ConfigService) {
    this.kafkaTopicPrefix = this.configService.get('KAFKA_TOPIC_PREFIX');
    this.kafka = new Kafka({
      brokers: [this.configService.get('KAFKA_BROKERS')],
    });
    this.consumer = this.kafka.consumer({
      groupId: this.configService.get('KAFKA_CONSUMER_GROUP_ID'),
    });
    this.kafkaAdmin = this.kafka.admin();
  }

  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.kafkaAdmin.connect();

      const filterTopics = await this.getTopics();
      this.kafkaTotalSubscribedTopics = filterTopics.length;

      await this.runConsumer(filterTopics);
    } catch (error) {
      console.log(error);
    }
  }

  async onApplicationShutdown(): Promise<void> {
    await this.consumer.disconnect();
  }

  private async getTopics() {
    const allTopics = await this.kafkaAdmin.listTopics();

    return allTopics.filter((d: string) =>
      d.match(new RegExp(`${this.kafkaTopicPrefix}.*`)),
    );
  }

  private async runConsumer(topics: string[]): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topics, fromBeginning: true });

      await this.consumer.run({
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

  private async restartConsumer(topics: string[]) {
    try {
      await this.consumer.stop();
      await this.runConsumer(topics);
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: needs a better solution, dynamic generation of the consumer might be better(needs testing)
  // !ISSUE: https://github.com/tulios/kafkajs/issues/336
  // !ISSUE: https://github.com/tulios/kafkajs/issues/371
  @Cron('*/5 * * * * *') // every 5 sec
  private async watchForTopic() {
    console.log('cron job evert 5 sec');
    const topics = await this.getTopics();
    if (this.kafkaTotalSubscribedTopics !== topics.length) {
      console.log('Change in topics, Restarting consumer');
      this.restartConsumer(topics);
    }
    this.kafkaTotalSubscribedTopics = topics.length;
  }
}
