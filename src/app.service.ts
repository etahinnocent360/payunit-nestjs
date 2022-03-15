/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, HttpService, Injectable, Param } from '@nestjs/common';
import { TransactionModel } from "./transaction.model";
import { GetTransaction } from "./transaction.model";
import { response } from 'express';
import { configurations } from './lib/Configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { date, number, string } from 'joi';
import axios from 'axios';
import { config } from 'rxjs';
import Joi from "joi";

@Injectable()
export class AppService {
  public transactions: TransactionModel[] =[]
  public payUnitData={
    transaction_id:11,
    transaction_amount:10000,
    currency:'USD',
    return_url:'http://localhost:3000',
  };
  // private all
  private completeTransaction = {
    gateway: 'mtnmomo',
    transaction_amount: 1001,
    transaction_id: 1005,
    phone_number: 681479697,
    currency: 'USD',
    paymentType: 'button',
  };
  private urlinitialized = 'https://app.payunit.net/api/gateway/initialize';
  private paymentUrl = 'https://app.payunit.net/api/gateway/makepayment';
  private urlproceed = 'https://app.payunit.net/api';
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async postApi() {
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    await axios
      .post(
        this.urlinitialized,
        {
          transaction_id:this.payUnitData.transaction_id,
          transact_amount:this.payUnitData.transaction_amount,
          currency:this.payUnitData.currency,
          return_url:this.payUnitData.return_url
        },
        {
          headers: {
            'Authorization': `Basic ${base64data}`,
            'Content-Type': 'application/json',
            'x-api-Key': process.env.apiKey,
            'mode': process.env.mode,
          },
        },
      )
      .then((request) => {
        // this.all = response.data
        // console.log(this.all)
        console.log(request.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getTransact(params) {
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    return axios
      .get(`${this.urlproceed}/gateway/gateways?t_url=""&t_id=""&t_sum=""`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64data}`,
          'x-api-Key': process.env.apiKey,
          mode: process.env.mode,
        },
      },
      )
      .then((request) => {
        // request = this.all.t_id
        console.log(request)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //make payment

  async makePayment() {
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);
    await axios
      .post(
        this.paymentUrl,
        {
          gateway: this.completeTransaction.gateway,
          total_amount: this.completeTransaction.transaction_amount,
          transaction_id: this.completeTransaction.transaction_id,
          phone_number: this.completeTransaction.phone_number,
          currency: this.completeTransaction.currency,
          paymentType: this.completeTransaction.paymentType,
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
        console.log(request.data);
        request.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
