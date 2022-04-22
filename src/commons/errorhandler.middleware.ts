import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Initialize, TransactionModel } from '../transaction.model';
import axios from 'axios';
import { number, string } from 'joi';

@Injectable()
export class ErrorhandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const newTransaction = async (
      total_amount: number,
      transaction_id: number,
      currency: string,
      return_url: string,
    ) => {
      const initialized = await new TransactionModel(
        total_amount,
        transaction_id,
        currency,
        return_url,
      );
      if (initialized.currency === 'USD' || initialized.currency === 'XAF') {
        console.log(currency);
        return initialized;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `currency of type ${currency} is not supported`,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    };
    const data = newTransaction;
    console.log(data);
    next();
    return data;
  }
}
