import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { App2Controller } from './app2.controller';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [AppController, App2Controller],
  providers: [AppService],
})
export class AppModule {}
