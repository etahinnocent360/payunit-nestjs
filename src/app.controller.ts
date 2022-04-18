import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetPsp, GetTransaction, Payment, TransactionModel, TransPspModel } from "./transaction.model";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller()
// @UseInterceptors(new HttpRequestHeaderInterceptor())
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('getTransaction ')
    private getTransactionModel: Model<GetTransaction>,
    @InjectModel('getPsp') private getpspmodel: Model<GetPsp>,
  ) {}

  // @UseInterceptors(HttpRequestHeaderInterceptor)
  @Get('/getpsp/:id')
  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'id',
    description: 'Gets the mongodb object id',
  })
  async getTransact(@Param() param) {
    console.log('nest params ', param.id);

    return this.appService.getTransact(param.id);
  }
  @Get('/getstatus/:id')
  @ApiParam({
    name: 'id',
    description: 'Gets the mongodb  object id',
  })
  async getStatus(@Param() param) {
    return this.appService.getStatus(param.id);
  }

  @Post('/initialize/')
  @ApiResponse({
    status: 201,
    description:
      'expects an object' + "{'currency:string'," + "'total_amount:number}",
  })
  @ApiBody({
    type: TransactionModel,
  })
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
  @Post('/payment/:t_id')
  @ApiResponse({
    status: 201,
  })
  @ApiBody({
    type: Payment,
    description:
      "{' \n" +
      '      "gateway":"mtnmomo",' +
      '      "amount":2000,' +
      '      "currency":"USD",' +
      '      "phone_number":654751836' +
      "      '}",
  })
  @ApiParam({
    name: 'id',
    description:
      'Gets the mongodb object id',
  })
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
