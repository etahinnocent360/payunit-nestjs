import { publish } from "rxjs";

export class TransactionModel {
  constructor(
    public transaction_id: string,
    public transaction_amount: number,
    public currency: string,
    public return_url: string,
  ) {}
}
export class GetTransaction {
  constructor(
    public t_id: string,
    public t_amount: string,
    public t_url: string,
  ) {}
}
export class Payment  {
  constructor(
    public gateway: string,
    public amount: number,
    public transaction_id: string,
    public phone_number: number,
    public currency: string,
    public paymentType: string,
  ) {}
}
