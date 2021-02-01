import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const cors: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
};

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors(cors);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
