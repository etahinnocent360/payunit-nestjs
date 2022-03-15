import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('get')
  getTransact(@Param() params) {
    return this.appService.getTransact(params);
  }

  @Post('post')
  postApi() {
    return this.appService.postApi();
  }

  @Post('payment')
  makePayment(): any {
    return this.appService.makePayment();
  }
}
