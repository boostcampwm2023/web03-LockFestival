import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from '@src/modules/userModules/chat/chat.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { PayloadDto } from '@src/modules/authModules/auth/dtos/payload.dto';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRequestDto } from '@src/modules/userModules/chat/dtos/chat.message.request.dto';
import { ChatType } from '@src/enum/chat.type';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('EventsGateway');
  @WebSocketServer()
  server: Server;

  socketsInrooms;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.socketsInrooms = {};
  }

  exportGroupId(client: Socket) {
    return [...client.rooms.values()][0];
  }

  //myPage 입장
  @SubscribeMessage('join')
  async join(
    @MessageBody('roomId') roomId: string,
    @MessageBody('Authorization') authorization: string,
    @ConnectedSocket() client: Socket
  ) {
    const payload: PayloadDto = await this.jwtService.verify(authorization, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
    const { prevMessages, unreadCountMap, chatUsers } =
      await this.chatService.validateRoomAndGetChatUserList(roomId, payload.nickname);

    if (!this.socketsInrooms[roomId]) {
      this.socketsInrooms[roomId] = {};
    }

    this.socketsInrooms[roomId][client.id] = chatUsers.find((user) => {
      return user.nickname === payload.nickname;
    }).userId;

    await client.join(roomId);

    //TODO 진짜로 고치기
    client.emit('roomInfo', {
      brandName: '마스터키',
      branchName: '강남점',
      regionName: '서울 강남', //CONCAT 필요
      themeName: '테마',
      themeId: 11, //시간표 불러올 때 사용
      posterImageUrl: '',
      contents: 'contents',
      appointmentDate: new Date(),
      recruitmentMembers: 4,
      currentMembers: 3,
      recruitmentCompleted: false,
      appointmentCompleted: false,
    });

    client.emit('chatLog', prevMessages);
    client.emit('userListInfo', chatUsers);
    this.server.to(roomId).emit('unread', unreadCountMap);
    return 'ok';
  }

  @SubscribeMessage('chatLog')
  async chatLog(
    @MessageBody('last_log_id') startLogId: string,
    @MessageBody('count') count: number,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    const roomId = this.exportGroupId(client);
    const chatMessageResponseDto = await this.chatService.findMessagesByLogId({
      roomId,
      startLogId,
      direction: -1,
      count,
    });
    client.emit('chatLog', chatMessageResponseDto);
    return 'ok';
  }

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    console.log(message);
    const roomId = this.exportGroupId(client);
    const userId = this.socketsInrooms[roomId][client.id];

    const request = new ChatMessageRequestDto(
      message,
      userId,
      Number(roomId),
      ChatType.message,
      new Date()
    );

    const messageObject = await this.chatService.createMessageByChat(request);
    client.to(roomId).emit('chat', messageObject);
    return 'ok';
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.leave(client.id); //자동 할당된 방을 나감
    this.logger.log('connect ' + client.id);
  }

  handleDisconnect(client: Socket) {
    client.leave(client.id);
    this.logger.log('by' + client.id);
  }
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
}
