import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class App2Controller {
  constructor(private readonly appService: AppService) {}

  @Get('app2')
  getHello(): string {
    return 'app2';
  }
}
