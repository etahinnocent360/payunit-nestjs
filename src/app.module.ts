import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './lib/Configuration';
import { validationSchema } from './lib/Validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getPspSchema, getTransactionSchema } from "./transaction.model";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      validationSchema,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/transactions'),
    MongooseModule.forFeature([
      { name: 'getTransaction ', schema: getTransactionSchema },
      { name: 'getPsp', schema: getPspSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
