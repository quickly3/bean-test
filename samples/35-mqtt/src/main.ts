import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  // await app.listen(3001);
  // console.log(`Application is running on: ${await app.getUrl()}`);

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://127.0.0.1:1883',
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
