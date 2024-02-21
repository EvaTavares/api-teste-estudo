import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// função que inicia a aplicação nest
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
