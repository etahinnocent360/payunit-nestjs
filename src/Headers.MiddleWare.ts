import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class HeadersMiddlware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const appBasic = `${process.env.apiSecret}`;
    const buff = Buffer.from(appBasic);
    const base64data = buff.toString('base64');
    console.log('coming from middle ware');
    const data = {
      headers: {
        ['Content-Type']: 'application/json',
        Authorization: `Basic ${base64data}`,
        'x-api-Key': process.env.apiKey,
        mode: process.env.mode,
      },
    };
    axios.defaults.headers.head = data.headers;
    next();
    return data.headers;
  }
}
