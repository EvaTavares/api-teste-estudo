import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// banco de dados é criado se não existe
// const uri = 'mongodb://root:root@db:27017/tweets_test?authSource=admin';

//decorator
@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_DSN), TweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
