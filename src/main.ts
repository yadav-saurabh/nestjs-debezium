import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['/', '/cdc/(.*)'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(+(process.env.PORT || 3000));
}
bootstrap();
