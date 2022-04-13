import {
  Body,
  Controller,
  Get, HttpCode, HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetTransaction } from './transaction.model';
import { HttpRequestHeaderInterceptor } from './headers.interceptor';

@Controller()
// @UseInterceptors(new HttpRequestHeaderInterceptor())
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('getTransaction ')
    private readonly getTransactionModel: Model<GetTransaction>,
  ) {}
  // @UseInterceptors(HttpRequestHeaderInterceptor)
  @Get('/getpsp/:id')
  async getTransact(@Param() param) {
    console.log('nest params ', param.id);

    return this.appService.getTransact(param.id);
  }
  @Get('/getstatus/:id')
  async getStatus(@Param() param) {
    // console.log('id here', param.id);
    return this.appService.getStatus(param.id);
  }

  @Post('initialize')
  async postApi(
    @Body('total_amount') total_amount: number,
    @Body('transaction_id') transaction_id: number,
    @Body('currency') currency: string,
    @Body('return_url') return_url: string,
  ) {
    const res = await this.appService.postApi(
      total_amount,
      transaction_id,
      currency,
      return_url,
    );
    return res;
  }
  // @UseInterceptors(HttpRequestHeaderInterceptor)
  @Post('payment/:t_id')
  makePayment(
    @Param() param,
    @Body('gateway') gateway: string,
    @Body('amount') amount: number,
    @Body('transaction_id') transaction_id: string,
    @Body('phone_number') phone_number: number,
    @Body('currency') currency: string,
    @Body('paymentType') paymentType: string,
  ) {
    return this.appService.makePayment(
      param.t_id,
      gateway,
      amount,
      transaction_id,
      phone_number,
      currency,
      paymentType,
    );
  }
}
