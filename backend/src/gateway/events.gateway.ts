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
import { ChatService } from '@chat/chat.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, ParseIntPipe } from '@nestjs/common';
import { PayloadDto } from '@auth/dtos/payload.dto';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatType } from '@src/enum/chat.type';
import { GroupService } from '@group/group.service';
import { ChatMessageDto } from '@src/modules/userModules/chat/dtos/chat.message.dto';

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
  socketToRoomId;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly groupService: GroupService
  ) {
    this.socketsInrooms = {};
    this.socketToRoomId = {};
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

    this.socketToRoomId[client.id] = roomId;

    await client.join(roomId);

    client.emit('roomInfo', await this.groupService.getGroupInfo(Number(roomId)));

    client.emit('chatLog', prevMessages);
    client.emit('userListInfo', chatUsers);
    this.server.to(roomId).emit('unread', unreadCountMap);
    return 'ok';
  }

  @SubscribeMessage('chatLog')
  async chatLog(
    @MessageBody('cursorLogId') cursorLogId: string,
    @MessageBody('count', ParseIntPipe) count: number,
    @MessageBody('direction') direction: -1 | 1 = -1,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    const roomId = this.exportGroupId(client);
    const chatMessageResponseDto = await this.chatService.findMessagesByLogId({
      roomId,
      cursorLogId,
      direction,
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
    this.logger.log(message);
    const roomId = this.exportGroupId(client);
    const userId = this.socketsInrooms[roomId][client.id];

    const request = new ChatMessageRequestDto(
      message,
      userId,
      Number(roomId),
      ChatType.message,
      new Date()
    );

    const messageObject: ChatMessageDto = await this.chatService.createMessageByChat(request);
    client.to(roomId).emit('chat', messageObject);
    return 'ok';
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.leave(client.id); //자동 할당된 방을 나감
    this.logger.log('connect ' + client.id);
  }

  async handleDisconnect(client: Socket) {
    const roomId = this.socketToRoomId[client.id];
    const userId = this.socketsInrooms[roomId][client.id];

    delete this.socketsInrooms[roomId][client.id];
    delete this.socketToRoomId[client.id];
    await this.chatService.updateLastChatLogId(roomId, userId);
    this.logger.log('by' + client.id);
  }
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
}
