import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { number, string } from "joi";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('getpsp')
  getTransact() {
    return this.appService.getTransact();
  }

  @Post('initialize')
  postApi(
    @Body('total_amount') total_amount: number,
    @Body('transaction_id') transaction_id: string,
    @Body('currency') currency: string,
    @Body('return_url') return_url: string,
  ) {
  return   this.appService.postApi(transaction_id, total_amount, currency, return_url);
  }

  @Post('payment')
  makePayment(
    @Body('gateway') gateway: string,
    @Body('amount') amount: number,
    @Body('transaction_id') transaction_id: string,
    @Body('phone_number') phone_number: number,
    @Body('currency') currency: string,
    @Body('paymentType') paymentType: string,
  ) {
    return this.appService.makePayment(
      gateway,
      amount,
      transaction_id,
      phone_number,
      currency,
      paymentType,
    );
  }
}
