import {
  CallHandler,
  NestInterceptor,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetTransaction } from '../transaction.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('getTransaction ')
    private readonly getTransactionModel: Model<GetTransaction>,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const requestBody = ctx.getRequest()!.body as {
      currency: any;
    };

    if (requestBody.currency === 'XAF' || requestBody.currency === 'USD') {
      return ;
    } else if (
      requestBody.currency !== 'XAF' ||
      requestBody.currency !== 'USD'
    ) {
      throw new BadRequestException('name should be atleast 8 characters long');
    }

    return next
      .handle()
      .pipe(tap(() => console.log('response from the method handler')));
  }
}
