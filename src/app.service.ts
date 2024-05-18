import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getConnectors() {
    return this.httpService
      .get('http://localhost:8083/connectors')
      .pipe(map((response) => response.data));
  }

  pauseCDC(connector: string) {
    return this.httpService
      .put(`http://localhost:8083/connectors/${connector}/pause`)
      .pipe(map((response) => response.data));
  }

  resumeCDC(connector: string) {
    return this.httpService
      .put(`http://localhost:8083/connectors/${connector}/resume`)
      .pipe(map((response) => response.data));
  }
}
