import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export class TransactionModel {
  constructor(
    public total_amount: number,
    public transaction_id: number,
    public currency: string,
    public return_url: string,
  ) {}
}
export class Initialize {
  @ApiProperty()
  total_amount: number;
  @ApiProperty()
  currency: string;
}

export class PaymentModel {
  @ApiProperty()
  gateway: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  phone_number: number;
}
export interface GetToken {
  ['auth-token']: string;
  ['x-token']: string;
  transaction_id: string;
  pay_token: string;
  payment_ref: string;
  gateway: string;
  message: string;
}
export const getTransactionSchema = new mongoose.Schema({
  t_id: {
    type: String,
  },
  t_sum: {
    type: String,
  },
  t_url: {
    type: String,
  },
  transaction_url: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
});
export const getTokenSchema = new mongoose.Schema({
  ['auth-token']: {
    type: String,
  },
  ['x-token']: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
  pay_token: {
    type: String,
  },
  payment_ref: {
    type: String,
  },
  gateway: {
    type: String,
  },
  message: {
    type: String,
  },
});

export const getPspSchema = new mongoose.Schema({
  create_time: {
    type: String,
  },
  update_time: {
    type: String,
  },
  provider_id: {
    type: String,
  },
  provider_name: {
    type: String,
  },
  provider_logo: {
    type: String,
  },
  provider_short_tag: {
    type: String,
  },
  provider_status: {
    type: String,
  },
  delete_time: {
    type: String,
  },
  service_accounts_account_id: {
    type: String,
  },
  service_accounts_users_user_id: {
    type: String,
  },
  providers_provider_id: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
});
export interface GetTransaction {
  t_id: string;
  t_sum: string;
  t_url: string;
  transaction_url: string;
  transaction_id: string;
}
export interface GetPsp {
  create_time: string;
  update_time: string;
  provider_id: string;
  provider_name: string;
  provider_logo: string;
  provider_short_tag: string;
  provider_status: string;
  delete_time: string;
  service_accounts_account_id: string;
  service_accounts_users_user_id: string;
  providers_provider_id: string;
  transaction_id: string;
}
export class Payment {
  constructor(
    public gateway: string,
    public amount: number,
    public transaction_id: string,
    public phone_number: number,
    public currency: string,
    public paymentType: string,
  ) {}
}
