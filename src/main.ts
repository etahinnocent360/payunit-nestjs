import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Cores } from 'cores';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'hhjsdugyhjkdssd',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  const config = app.get(ConfigService);
  await app.listen(5000);
}
bootstrap();
