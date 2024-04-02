import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
  namespace: 'create_message',
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<any> {
    console.log(payload);
    const message = await this.messagesService.createMessage(payload);
    await this.server.emit('response_message', message);
    const event = 'create_message';
    return { event, payload };
  }

  afterInit(server: Server) {
    this.logger.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    //Do stuffs
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    //Do stuffs
  }
}
