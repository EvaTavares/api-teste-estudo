import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// rota
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // sub-rota
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // tbm pode passar parametros
  // @Get('hello/:id')
  // getHello(@Param() params: any): string {
  //   return this.appService.getHello();
  // }
}
