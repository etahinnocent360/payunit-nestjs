import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetTransaction } from './transaction.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('getTransaction ')
    private readonly getTransactionModel: Model<GetTransaction>,
  ) {}
  @Get('/getpsp/:id([0-9a-f]{24})')
  async getTransact(@Param() param) {
    console.log('nest params ', param.id);

    return this.appService.getTransact(param.id);
  }
  @Post('initialize')
  async postApi(
    @Body('total_amount') total_amount: number,
    @Body('transaction_id') transaction_id: number,
    @Body('currency') currency: string,
    @Body('return_url') return_url: string,
  ) {
    const [results] = await Promise.all([
      this.appService.postApi(
        total_amount,
        transaction_id,
        currency,
        return_url,
      ),
    ]);
    return results;
  }

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
