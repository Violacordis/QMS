import { Logger, Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface PushMessageOptions {
  event: string;
  channel?: string;
  message: any;
}

@WebSocketGateway()
@Injectable()
export class EventsGateway implements OnGatewayConnection, OnGatewayInit {
  private readonly logger = new Logger(EventsGateway.name);

  constructor() {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.join(client.id);
  }

  afterInit() {
    this.logger.log('Event Gateway Initialized!');
  }

  async handleDisconnect(client: Socket) {
    client.leave(client.id);
    this.logger.log(`Client with id ${client.id} disconnected`);
  }

  public pushMessage({ event, channel, message }: PushMessageOptions) {
    channel
      ? this.server.to(channel).emit(event, JSON.stringify(message))
      : this.server.emit(event, JSON.stringify(message));
  }
}
