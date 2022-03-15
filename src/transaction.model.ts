export class TransactionModel {
  constructor(
    public transaction_id: string,
    public transaction_amount: number,
    public currency: string,
    public return_url: string,
  ) {}
}
export class GetTransaction {
  constructor(public t_id: string, public t_amount: string, t_url: string) {}
}
