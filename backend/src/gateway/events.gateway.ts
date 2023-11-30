import { Logger, UseGuards, Req } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from '@src/modules/userModules/chat/chat.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  socketsInrooms;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
  ) {
    this.socketsInrooms = {};
  }

  //private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody('message') data,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    return 'ok';
  }

  @SubscribeMessage('prev')
  async prevMessages(
    @MessageBody('start_log_id') startLogId: string,
    @MessageBody('count') count: string,
    @ConnectedSocket() client: Socket
  ) {}

  //myPage 입장
  @SubscribeMessage('join')
  async join(
    @MessageBody('roomId') roomId: string,
    @MessageBody('Authorization') authorization: string,
    @ConnectedSocket() client: Socket
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    client.leave(client.id); //자동 할당된 방을 나감
    console.log('connect ' + client.id);
  }

  handleDisconnect(client: Socket) {
    client.leave(client.id);
    console.log('by' + client.id);
  }
  afterInit(server: Server) {
    console.log('Initialized!');
  }
}
