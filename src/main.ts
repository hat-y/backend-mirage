import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), { prefix: '/static/' });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`🚀 API running on port :${port}`);
  Logger.log(`📡 Hot reload enabled for development`);
}

bootstrap();
