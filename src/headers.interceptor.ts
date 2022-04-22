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

    // request.headers = axios.defaults.headers.head;
    return next.handle().pipe(
      map((data: any) => {
        // data = axios.defaults.headers.head; r
        return data;
      }),
    );
  }
}
