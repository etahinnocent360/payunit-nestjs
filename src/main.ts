import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Cores } from 'cores';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(4000);
}
bootstrap();
