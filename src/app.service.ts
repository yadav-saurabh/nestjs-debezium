import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private DEBEZIUM_CONNECT_URL: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.DEBEZIUM_CONNECT_URL = this.configService.get('DEBEZIUM_CONNECT_URL');
  }

  getHello(): string {
    return 'Hello World!';
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
