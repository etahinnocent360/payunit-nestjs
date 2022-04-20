import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Initialize } from '../transaction.model';
import axios from 'axios';

@Injectable()
export class ErrorhandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
 next();
    return axios.defaults.data;
  }
}
