import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpRequestHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log(base64data);

    request.headers = {
      Headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64data}`,
        ['x-api-Key']: process.env.apiKey,
        mode: process.env.mode,
      },
    };
    // request.headers = axios.defaults.headers.head;
    return next.handle().pipe(
      map((data: any) => {
        // data = axios.defaults.headers.head; r
        return data;
      }),
    );
  }
}
