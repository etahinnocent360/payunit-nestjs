/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  HttpService,
  Injectable,
  NotFoundException,
  Param,
  Redirect,
} from '@nestjs/common';
import {
  GetPsp,
  GetToken,
  getTokenSchema,
  Payment,
  TransactionModel,
} from './transaction.model';
import { GetTransaction } from './transaction.model';
import { response } from 'express';
import { configurations } from './lib/Configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { array, date, number, string } from "joi";
import axios from 'axios';
import { config, find } from 'rxjs';
import Joi from 'joi';
import { Session } from 'express-session';
import { Model, Schema } from 'mongoose';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { request } from 'http';

@Injectable()
export class AppService {
  private baseUrl = process.env.baseUrl;
  public storeProduct;
  constructor(
    @InjectModel('getTransaction ')
    private readonly getTransactionModel: Model<GetTransaction>,
    @InjectModel('getPsp') private readonly getPspModel: Model<GetPsp>,
    @InjectModel('gettokens') private readonly getTokenModel: Model<GetToken>,
    private httpService: HttpService,
    private configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  async postApi(
    total_amount: number,
    transaction_id: number,
    currency: string,
    return_url: string,
  ) {
    const newTransaction = await new TransactionModel(
      total_amount,
      transaction_id,
      currency,
      return_url,
    );
    transaction_id = 100000 + Math.floor(Math.random() * 9000000000000);
    return_url = 'https://react-ecommerce2-eta.vercel.app/';
    console.log(axios.defaults.data, 'from service')
 const res = await axios
      .post(
        `${this.baseUrl}/gateway/initialize`,
        {
          total_amount: newTransaction.total_amount,
          transaction_id: transaction_id,
          currency:newTransaction.currency,
          return_url: return_url,
        },
        {
          headers:axios.defaults.headers.head
        },
      )
      .then(async (request) => {
        let storeProduct = request.data.data;
        storeProduct = new this.getTransactionModel({
          t_id: request.data.data.t_id,
          t_sum: request.data.data.t_sum,
          t_url: request.data.data.t_url,
          transaction_url: request.data.data.transaction_url,
          transaction_id: request.data.data.transaction_id,
        });
        storeProduct.save();
        // console.log(storeProduct)
        return storeProduct
      })
      .catch((error) => {
        return error.response.data
      });
   return res
  }
  public async getTransact(_id) {
    // eslint-disable-next-line prefer-const
    const transaction = await this.getTransactionModel.findById(_id);
    console.log(`transaction_id goes here${transaction.transaction_id}`)
    console.log('transaction here', transaction);
const psps = await axios
      .get(
        `${this.baseUrl}/gateway/gateways?t_url="${transaction.t_url}"&t_id="${transaction.t_id}"&t_sum="${transaction.t_sum}"`,
        {
          headers:axios.defaults.headers.head
        },
      )
      .then((request) => {
        // request.data.data.map((all) => {
      const  all = new this.getPspModel({
            create_time: request.data.data.create_time,
            update_time: request.data.data.update_time,
            provider_id: request.data.data.provider_id,
            provider_name: request.data.data.provider_id,
            provider_logo: request.data.data.provider_logo,
            gateway: request.data.data.provider_short_tag,
            provider_status: request.data.data.provider_status,
            delete_time: request.data.data.delete_time,
            service_accounts_account_id: request.data.data.service_accounts_account_id,
            service_accounts_users_user_id: request.data.data.service_accounts_users_user_id,
            providers_provider_id: request.data.data.providers_provider_id,
            transaction_id:request.data.data.transaction_id,
          });
      console.log(request.data.data.provider_id)
         all.save();
      return  request.data
        // });
        return request.data.data
      })
      .catch((error) => {
        return error.response.data
      });
return psps
  }

  async makePayment(
    _id: string,
    gateway: string,
    amount: number,
    transaction_id: string,
    phone_number: number,
    currency: string,
    paymentType: string,
  ) {
    // eslint-disable-next-line prefer-const
    const transaction = await this.getTransactionModel.findById(_id);
    let allPsp = await this.getPspModel.findById(_id);
    console.log('transaction here', transaction);
    paymentType ='button'
  const newPayment = new Payment(
      gateway,
      amount,
      _id,
      phone_number,
      currency,
      paymentType,
    );
    const res = await axios
      .post(
        `${this.baseUrl}/gateway/makepayment`,
        {
          gateway: newPayment.gateway,
          amount: newPayment.amount,
          transaction_id: transaction.transaction_id,
          phone_number: newPayment.phone_number,
          currency: currency,
          paymentType:paymentType,
        },
        {
          headers:axios.defaults.headers.head
        },
      )
      .then(async (request) => {
        let tokens = request.data;
          tokens = new this.getTokenModel({
          transaction_id: request.data.data.transaction_id,
          pay_token: request.data.data.pay_token,
          payment_ref: request.data.data.payment_ref,
            gateway:newPayment.gateway,
            ['auth-token']: request.data.data['auth-token'],
            ['x-token']: request.data.data['x-token'],
            message:request.data.message,
        });
       return  tokens.save();
      })
      .catch((error) => {
        return error.response.data;
      });
    // this.getStatus(_id)
    return (res)
  }
  // @Interval(2000)
  async  getStatus(_id:string){
    const tokens = await this.getTokenModel.findById(_id)
   const res = await axios.get(
      `${this.baseUrl}/gateway/paymentstatus/${tokens.gateway}/${tokens.transaction_id}?
      pay_token="${tokens.pay_token}"&
      payment_ref="${tokens.payment_ref}"`,
      {
        headers:axios.defaults.headers.head
      },
    ).then(request =>{
      return request.data
    }).catch(error =>{
      return error.response.data
   })
    return res
  }
}
