import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { forkJoin, map } from 'rxjs';

import { CreateCdcDto } from './dto/create-cdc.dto';

enum CONNECTOR_CLASS {
  'postgres' = 'io.debezium.connector.postgresql.PostgresConnector',
}

let DEFAULT_CONNECTION = 'postgres';

@Injectable()
export class CdcService {
  private readonly DEBEZIUM_CONNECT_URL: string;
  private readonly kafkaTopicPrefix: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.kafkaTopicPrefix = this.configService.get('KAFKA_TOPIC_PREFIX');
    this.DEBEZIUM_CONNECT_URL = this.configService.get('DEBEZIUM_CONNECT_URL');
  }

  createConnectors(data: CreateCdcDto) {
    return forkJoin(
      data.config.map((config) => {
        const body = {
          name: config.connectorName,
          config: {
            'connector.class': CONNECTOR_CLASS[DEFAULT_CONNECTION],
            'database.hostname': data.dbHost,
            'database.port': data.dbPort,
            'database.user': data.dbUsername,
            'database.password': data.dbPassword,
            'database.dbname': config.dbName,
            'topic.prefix': `${this.kafkaTopicPrefix}.${config.dbName}.${config.connectorName}`,
            'slot.name': config.dbName,
          },
        };
        if (config.dbTableName && config.dbTableName.length) {
          body.config['table.include.list'] = config.dbTableName.join(',');
        }
        return this.httpService
          .post(`${this.DEBEZIUM_CONNECT_URL}/connectors`, body)
          .pipe(map((response) => response.data));
      }),
    );
  }

  getConnectors() {
    return this.httpService
      .get(`${this.DEBEZIUM_CONNECT_URL}/connectors`)
      .pipe(map((response) => response.data));
  }

  pauseCDC(connector: string) {
    return this.httpService
      .put(`${this.DEBEZIUM_CONNECT_URL}/connectors/${connector}/pause`, {})
      .pipe(map((response) => response.data));
  }

  resumeCDC(connector: string) {
    return this.httpService
      .put(`${this.DEBEZIUM_CONNECT_URL}/connectors/${connector}/resume`, {})
      .pipe(map((response) => response.data));
  }
}
