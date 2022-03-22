/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, HttpService, Injectable, NotFoundException, Param } from "@nestjs/common";
import { GetPsp, Payment, TransactionModel } from "./transaction.model";
import { GetTransaction } from "./transaction.model";
import { response } from 'express';
import { configurations } from './lib/Configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { date, number, string } from 'joi';
import axios from 'axios';
import { config, find } from "rxjs";
import Joi from "joi";
import { Session } from 'express-session';
import { Model, Schema } from "mongoose";
import { Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";



@Injectable()
export class AppService {
  private all
  public  getIninitial: GetTransaction[] =[]
  public transaction: TransactionModel[] =[]
  public  allPsp: GetPsp[] =[]
  public  payment:Payment[] =[]
  private  baseUrl = process.env.baseUrl
  public storeProduct
  constructor(
    @InjectModel( 'getTransaction ' ) private  readonly getTransactionModel:Model<GetTransaction>,
    @InjectModel('getPsp') private  readonly  getPspModel:Model<GetPsp>,
    private httpService: HttpService,
    private configService: ConfigService,
   ) {}
  async postApi( total_amount:number,transaction_id:string,  currency:string, return_url:string,) {
    const newTransaction =await new TransactionModel(
      total_amount,
      transaction_id,
      currency,
      return_url)
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    await axios
      .post(
        `${this.baseUrl}/gateway/initialize`,
        {
          total_amount:newTransaction.total_amount,
          transaction_id:newTransaction.transaction_id,
          currency:newTransaction.currency,
          return_url:newTransaction.return_url
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64data}`,
            'x-api-Key': process.env.apiKey,
            'mode': process.env.mode,
          },
        },
      )
      .then((request) => {
        let storeProduct = request.data.data
      storeProduct = new this.getTransactionModel({
        t_id:request.data.data.t_id,
        t_sum:request.data.data.t_sum,
        t_url:request.data.data.t_url,
          transaction_url:request.data.data.transaction_url,
          transaction_id:request.data.data.transaction_id,
        },)
        console.log(request.data)
        return   storeProduct.save()
      })
      .catch((error) => {
        console.log(error);
      });

  }
 public async getTransact(_id){
   let transaction:any;
   transaction = await this.getTransactionModel.findById(_id);
   console.log('transaction here', transaction);
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
     await axios
      .get(`${this.baseUrl}/gateway/gateways?t_url="${transaction.t_url}"&t_id="${transaction.t_id}"&t_sum="${transaction.t_sum}"`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64data}`,
          'x-api-Key': process.env.apiKey,
          mode: process.env.mode,
        }
      },
      )
      .then((request) => {

     request.data.data.map(all =>{
           all = new this.getPspModel({
             create_time: all.create_time,
             update_time: all.update_time,
             provider_id: all.provider_id,
             provider_name: all.provider_id,
             provider_logo: all.provider_logo,
             provider_short_tag: all.provider_short_tag,
             provider_status: all.provider_status,
             delete_time: all.delete_time,
             service_accounts_account_id: all.service_accounts_account_id,
             service_accounts_users_user_id: all.service_accounts_users_user_id,
             providers_provider_id: all.providers_provider_id
           })
           return all.save()
         })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //make payment

  async makePayment(t_id:string, gateway: string, amount: number, transaction_id: string, phone_number: number, currency: string, paymentType: string,) {
    let transaction:any;
    transaction = await this.getTransactionModel.findById(transaction_id);
    console.log('transaction here', transaction);
    const newPayment = new Payment(
      gateway,
      amount,
     t_id,
      phone_number,
      currency,
      paymentType
    )
    this.payment.push(newPayment)
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    await axios
      .post(
        `${this.baseUrl}/gateway/makepayment`,
        {
          gateway: newPayment.gateway,
          amount: newPayment.amount,
          transaction_id:newPayment.transaction_id,
          phone_number: newPayment.phone_number,
          currency: newPayment.currency,
          paymentType: newPayment.paymentType,
        },
        {
          headers: {
            Authorization: `Basic ${base64data}`,
            'Content-Type': 'application/json',
            'x-api-Key': process.env.apiKey,
            mode: process.env.mode,
          },
        },
      )
      .then((request) => {
        this.all =request.data
        console.log(this.all)
        return this.all
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
