import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttBroadcastController } from './mqtt-broadcast.controller';
import { MqttController } from './mqtt.controller';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://127.0.0.1:1883',
        },
      },
    ]),
  ],
  controllers: [AppController, MqttController, MqttBroadcastController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}
  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
