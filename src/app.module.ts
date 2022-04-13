import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './lib/Configuration';
import { validationSchema } from './lib/Validation';
import { MongooseModule } from '@nestjs/mongoose';
import {
  getPspSchema,
  getTokenSchema,
  getTransactionSchema,
} from './transaction.model';
import { ScheduleModule } from '@nestjs/schedule';
import { HeadersMiddlware } from './Headers.MiddleWare';
@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: 'getTransaction ', schema: getTransactionSchema },
      { name: 'getPsp', schema: getPspSchema },
      { name: 'gettokens', schema: getTokenSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeadersMiddlware).forRoutes('/');
  }
}
