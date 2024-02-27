import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// rota - sem nada no parametro - está na raiz em relação ao browser que foi aberto
@Controller('app') //quando acrescenta um nome dentro dos parenteses(prefixo)para todas as minhas rotas
export class AppController {
  constructor(private readonly appService: AppService) {}

  // sub-rota
  @Get() // - você cria uma rota ligada ao verbo HTTP
  getHello(): string {
    return this.appService.getHello();
  }

  // tbm pode passar parametros
  // @Get('hello/:id')
  // getHello(@Param() params: any): string {
  //   return this.appService.getHello();
  // }
}
