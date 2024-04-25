import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { scan, take } from 'rxjs/operators';

@Controller()
export class MqttBroadcastController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Get('broadcast')
  multicats() {
    console.log(` @Get('broadcast')`);
    return this.client.send<number>({ cmd: 'broadcast' }, {}).pipe(
      scan((a, b) => a + b),
      take(2),
    );
  }

  @MessagePattern({ cmd: 'broadcast' })
  replyBroadcast(): Observable<number> {
    console.log(` @MessagePattern({ cmd: 'broadcast' })`);

    return new Observable((observer) => observer.next(1));
  }
}
