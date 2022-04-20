import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetPsp,
  GetTransaction,
  Initialize,
  PaymentModel,
} from './transaction.model';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

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
    description:
      'Gets the mongodb object id from response of the initialized transaction',
  })
  async getTransact(@Param() param) {
    console.log('nest params ', param.id);

    return this.appService.getTransact(param.id);
  }
  @Get('/getstatus/:id')
  @ApiParam({
    name: 'id',
    description: 'Gets the mongodb  object id from the payment response',
  })
  async getStatus(@Param() param) {
    return this.appService.getStatus(param.id);
  }
  private data: {
    total_amount: 2000;
    transaction_id;
    currency: 'USD';
  };
  @Post('/initialize/')
  @ApiResponse({
    status: 201,
    description:
      'expects an object' + "{'currency:string'," + "'total_amount:number}",
  })
  @ApiBody({
    type: Initialize,
  })
  async postApi(
    @Body('total_amount') total_amount: number,
    @Body('transaction_id') transaction_id: number,
    @Body('currency') currency: string,
    @Body('return_url') return_url: string,
  ) {
    if(currency ==="XAF" || currency==="USD"){
      return await this.appService.postApi(
        total_amount,
        transaction_id,
        currency,
        return_url,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `currency of type ${currency} is not supported`,
        },
        HttpStatus.FORBIDDEN,
      );
      // return 'please provide a valid currency';
    }
  }
  // @UseInterceptors(HttpRequestHeaderInterceptor)
  @Post('/payment/:id')
  @ApiResponse({
    status: 201,
  })
  @ApiBody({
    type: PaymentModel,
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
      'Gets the mongodb object id from response of the initialized transaction',
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
      param.id,
      gateway,
      amount,
      transaction_id,
      phone_number,
      currency,
      paymentType,
    );
  }
}
