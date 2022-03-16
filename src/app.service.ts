/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, HttpService, Injectable, Param } from '@nestjs/common';
import { Payment, TransactionModel } from "./transaction.model";
import { GetTransaction } from "./transaction.model";
import { response } from 'express';
import { configurations } from './lib/Configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { date, number, string } from 'joi';
import axios from 'axios';
import { config } from 'rxjs';
import Joi from "joi";
import { Session } from 'express-session';

@Injectable()
export class AppService {
  private all
  public  getIninitial: GetTransaction[] =[]
  public transaction: TransactionModel[] =[]
  public  payment:Payment[] =[]
  private urlinitialized = 'https://app.payunit.net/api/gateway/initialize';
  private paymentUrl = 'https://app.payunit.net/api/gateway/makepayment';
  private urlproceed = 'https://app.payunit.net/api/gateway/gateways?t_url=""&t_id=""&t_sum=""';
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async postApi(transaction_id:string, total_amount:number,  currency:string, return_url:string) {
    const newTransaction =new TransactionModel(
      transaction_id,
      total_amount,
      currency,
      return_url)
    this.transaction.push(newTransaction)
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    await axios
      .post(
        `${this.urlinitialized}`,
        {
          transaction_id:newTransaction.transaction_id,
          total_amount:newTransaction.transaction_amount,
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
        this.all = request.data
        console.log(this.all)
        return this.all
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getTransact() {
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    return axios
      .get(`${this.urlproceed}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64data}`,
          'x-api-Key': process.env.apiKey,
          mode: process.env.mode,
        },
      },
      )
      .then((response) => {
        response = this.all
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //make payment

  async makePayment(gateway: string, amount: number, transaction_id: string, phone_number: number, currency: string, paymentType: string,) {
    const newPayment = new Payment(
      gateway,
      amount,
      transaction_id,
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
        this.paymentUrl,
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
