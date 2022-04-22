import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetPsp,
  GetTransaction,
  Initialize,
  PaymentModel,
} from './transaction.model';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SuccessSchema } from './commons/swagger.document';
import { ErrorInterceptor } from './commons/error.interceptor';
@Controller()
// @UseInterceptors(new HttpRequestHeaderInterceptor())
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('getTransaction ')
    private getTransactionModel: Model<GetTransaction>,
    @InjectModel('getPsp') private getpspmodel: Model<GetPsp>,
  ) {}

  @Get('/getpsp/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      example: {
        status: 'SUCCESS',
        statusCode: 200,
        message: 'ok',
        data: [
          {
            create_time: '2020-10-12 15:22:57',
            update_time: '2020-10-12 15:22:57',
            provider_id: '3',
            provider_name: 'MTN MOMO',
            provider_logo: 'https://core.payunit.net/resources/flags/mtn.png',
            provider_short_tag: 'mtnmomo',
            provider_status: 'ACTIVE',
            delete_time: null,
            service_accounts_account_id: null,
            service_accounts_users_user_id: null,
            providers_provider_id: null,
          },
          {
            create_time: '2020-10-12 15:26:38',
            update_time: '2020-11-05 06:14:05',
            provider_id: '5',
            provider_name: 'EXPRESS UNION MOBILE',
            provider_logo: 'https://core.payunit.net/resources/flags/eu.png',
            provider_short_tag: 'eu',
            provider_status: 'ACTIVE',
            delete_time: null,
            service_accounts_account_id: null,
            service_accounts_users_user_id: null,
            providers_provider_id: null,
          },
          {
            create_time: '2020-12-01 15:55:50',
            update_time: '2020-12-01 16:33:53',
            provider_id: '22',
            provider_name: 'ORANGE MONEY',
            provider_logo:
              'https://core.payunit.net/resources/flags/orange.png',
            provider_short_tag: 'orange',
            provider_status: 'ACTIVE',
            delete_time: null,
            service_accounts_account_id: null,
            service_accounts_users_user_id: null,
            providers_provider_id: null,
          },
          {
            create_time: '2021-01-07 16:00:05',
            update_time: '2021-01-07 16:00:05',
            provider_id: '23',
            provider_name: 'VISA/MASTERCARD',
            provider_logo: 'https://core.payunit.net/resources/flags/cb.png',
            provider_short_tag: 'stripe',
            provider_status: 'ACTIVE',
            delete_time: null,
            service_accounts_account_id: null,
            service_accounts_users_user_id: null,
            providers_provider_id: null,
          },
          {
            create_time: '2021-01-22 14:13:16',
            update_time: '2021-01-22 14:13:16',
            provider_id: '25',
            provider_name: 'PAYPAL',
            provider_logo:
              'https://core.payunit.net/resources/flags/paypal.png',
            provider_short_tag: 'paypal',
            provider_status: 'ACTIVE',
            delete_time: null,
            service_accounts_account_id: null,
            service_accounts_users_user_id: null,
            providers_provider_id: null,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: {
        status: 'FAILED',
        statusCode: 400,
        message:
          "Sorry, we couldn't establish the integrity of this transaction. Actual amount initiated 0, is different from Amount Received, 0",
        data: [],
      },
    },
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      example: {
        status: 'SUCCESSFUL',
        statusCode: 200,
        message: 'Your transaction is processing. Please wait ...',
        data: {
          transactions: '',
          transaction_id: '801301906326',
          transaction_amount: '0',
          payment_transaction_id: '',
          callback: 'https://react-ecommerce2-eta.vercel.app/',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error undocumented',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async getStatus(@Param() param) {
    return this.appService.getStatus(param.id);
  }
  // @UseInterceptors(ErrorInterceptor)
  @Post('/initialize/')
  @ApiBody({
    type: Initialize,
  })
  @ApiResponse({
    status: 201,
    description: `created`,
    schema: {
      example: {
        data: {
          t_id: 'ZTIxNGI2Yzc0MTA3MGMzNTEyMzU2YTJlMWM2ODZlNGRlZDY5NGNkM2U0NmY0NjhjMWJiNDY4NmYyZjU5NjczNDI5YmM1ZGI2ZGMyNzE0MzFhNGQ0NzYyMTJkMDE1YmYwZjlhMDNiMGI5ZDhlZmZmYjQ5MjExMGI5MzlhOTdmYmFSQWJaa0dWNmlEdjJmbnFTUHI1TlFMck5LZjZTWUlFVm96Q0xPbkFyd3ZVPQ==',
          t_sum:
            'ZjJmZTk1NmE5YzE2ZThkMTgxNTJmYzEwODJiMjMyMjk5MjVkZTE5NmUxZjg0MTc1YmFjZmIwNzIxZDRiZDY1NmMzM2ZmODJjZTczZDVmMGFhYmFjZTI3N2JmNDE0N2MyMjJiYWU4ZmYxNjhjMmIyNjY5Njk1MDQ0ZjU2MDVmNmNPWmdBdnBqYjNOMVdQKzJkRWVyREZCVGdETVZLKzYyVEZNTEIxcXVPQzVnPQ==',
          t_url:
            'ZDgxMGFlMjhmZGZjNWM1Yjk1MTJkOTQxODc2ZDhmNjhiNTY1MDNiZTlmYzA5YmNjMjkzYTNhNTUzOGM2MDJhMzg3ZWY1Mzg4MjlhN2UwODJkMjIzMzRlYmM1ODUxYzM0YmJmMjgzMzczY2IxMGZkMmZlOWIyZDY4YzU0YzViZWEwM1dDODE0eUlURzNnMUpLcjFERHBTdWpmdmc3MmpyVHNJaUNGUkpaVmFIcUdFZTMxOVp0OXhpZmVzWkJpN2t0bjZUVXRBQ1NBNFFvcXhUOUlFMm9SZz09',
          transaction_url:
            'https://hostedpages.payunit.net/#/hostedPayment/payment/?t_id=MDdlYjAwYzI3OWY1OGU0NTYyYzZjNzA2MzE3MzdkOWI2Nzg2YzFjOWNjZTcwZTgzNTNlMzJkYmQyODVlN2IwZTJjNGUwZjI1NWFhMGExNTc5MDEyOTdmZmQ0OTQzNzU4Mjg4MjMzNzU5NGZmYWY3ZmY3OTJjN2MxNjBlMmE0OGJVbEFqczFyRm5PZkp5cXlLc2swaStWcmNnTFJvb2FuZi9PVXEva1RQd0hzPQ%3D%3D&t_sum=ZGQyNWEwN2RiMjE3OWZkZWQwMjllMTZhNjFiNjhjMmY1ODZlNjgwMGZlYWJiOTgxMGI0YWM0OGY1NTRhZGM5NGUzY2M5ZGM4ZjEzZjNjZjZiNDYwMmNmZmJhNTZmMzNhMGU4MGI3YmViYjk4N2Y0MWFiMmViYzQxYmIxOGJiMzQzL2FSVWhrSmNKRTIyaHBSOEo5R1RnUFMxTFhWQ2E4YVJVMnMwcVRtUUNZPQ%3D%3D&t_url=OGY2OWQzZjk5MjMyNDMyMzYyNzgzZjM4MjNjNzdiYzk5YjVkMmIyZTU0ODI2NjhiMTE4ZGI0ZmQ5YmNkNjlhNDQ1MzU1OWE4MzVmMzJmMzQ4ZGE3Mjc4M2Y0NGJjN2Y4NWNmMDNjMGI3MmMyMGY5OWFiMzFjNTQzNDNiMDBiNjFtTUtMSlU1S21sUjJCZjhidlRQK2JIcXFmSmxmbmJQd3dRaUtiQjRnR21ReTViUjhWU2R2dGdWRFMyNUxLT2tXR1VNaDhZSG9FeXkzeTMvU0pOaFBHZz09&id=1650616289408',
          transaction_id: '801301906326',
          _id: '626267a814566578587db4b3',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    schema: {
      example: {
        data: {
          status: 400,
          error: 'currency of type string is not supported',
        },
      },
    },
  })
  async postApi(
    @Body('total_amount') total_amount: number,
    @Body('transaction_id') transaction_id: number,
    @Body('currency') currency: string,
    @Body('return_url') return_url: string,
  ) {
    if (currency === 'XAF' || currency === 'USD') {
      return await this.appService.postApi(
        total_amount,
        transaction_id,
        currency,
        return_url,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `currency of type ${currency} is not supported supported currencies UAD, XAF`,
        },
        HttpStatus.BAD_REQUEST,
      );
      // return 'please provide a valid currency';
    }
  }
  // @UseInterceptors(HttpRequestHeaderInterceptor)
  @Post('/payment/:id')
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: {
        status: 'FAILED',
        statusCode: 400,
        message: 'Transaction currency, string, not supported at this time.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'created',
    schema: {
      example: {
        transaction_id: '801301906326',
        pay_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImU3N2E3NmQ5LTg4MTEtNDhlZC04MWZhLTIzMjNjYTYwNTYwOSIsImV4cGlyZXMiOiIyMDIyLTA0LTIyVDA5OjUzOjE3LjU3MyIsInNlc3Npb25JZCI6ImEyYTc5OWJlLTVjOTMtNGJjYy1iZGU1LWFlODhiOWYxMGVlNSJ9.VAsS60-_41nnsWtCoLZfRK_neQHqbI0DhgAsFWMk1vXMEkcH8AXQAY4yrVpORDVmKyTwwfPYRs7hQCIoX7ENYUW9bBqJyaOgnxeovQBF071aXdExIJenRnEmILuq5wt1b-9FXVcyiTFKXl5ar6hRfO53-KZShPQayyNceEv58bGNx9yVE1yjoHuSovVm-I5BWAQJtwSO-vOlMailGq8iaS2irARzpWH1IGL0hjAluorfivi6n39J0ldxLd-ryLq4IV4kVh9boGX6C_EvbV4qrRvoGlCA65JugXHkheAH0wIRYzj1JNTn6fK0nr_URO8tYT1ChCvsr0qJYfvbpdtObw',
        payment_ref: 'f5a9c0c9-3217-4391-a913-e780519fbfa6',
        gateway: 'mtnmomo',
        message:
          'Please confirm the Transaction on your mobile by dialing *126#',
        _id: '62626cfe2f411f8b77c5f0e2',
      },
    },
  })
  @ApiBody({
    type: PaymentModel,
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
