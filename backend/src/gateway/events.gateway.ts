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
import { Logger, ParseIntPipe, Injectable } from '@nestjs/common';
import { PayloadDto } from '@auth/dtos/payload.dto';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatType } from '@src/enum/chat.type';
import { GroupService } from '@group/group.service';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('EventsGateway');
  @WebSocketServer()
  server: Server;

  socketsInRooms: { [roomId: string]: { [socketId: string]: any } };
  socketToRoomId: { [socketId: string]: string };

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly groupService: GroupService
  ) {
    this.socketsInRooms = {};
    this.socketToRoomId = {};
  }

  exportGroupId(client: Socket) {
    return [...client.rooms.values()][0];
  }

  hasAnotherSession(roomId: string, userId: string) {
    return Object.values(this.socketsInRooms[roomId]).find((session) => {
      return session.userId === userId;
    });
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
    const { prevMessages, unreadCountMap, chatUsers, meUser } =
      await this.chatService.validateRoomAndGetChatUserList(roomId, payload.nickname);

    if (!this.socketsInRooms[roomId]) {
      this.socketsInRooms[roomId] = {};
    }

    await client.join(roomId);

    if (!this.hasAnotherSession(roomId, meUser.userId)) {
      this.server.to(roomId).emit('unread', unreadCountMap);
    }

    this.socketsInRooms[roomId][client.id] = { userId: meUser.userId, socket: client };

    this.socketToRoomId[client.id] = roomId;

    client.emit('roomInfo', await this.groupService.getGroupInfo(Number(roomId)));

    client.emit('chatLog', prevMessages);
    client.emit('userListInfo', chatUsers);
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

  async leave(roomId: string, nickname: string, isLeader: boolean) {
    if (isLeader) {
      await this.chatService.deleteRoomByLeader(roomId);
      return;
    }

    const { unreadCountMap, chatUsers, message } = await this.chatService.leaveChatRoom(
      roomId,
      nickname
    );
    const groupInfo = await this.groupService.getGroupInfo(Number(roomId));
    this.server.to(roomId).emit('roomInfo', groupInfo);
    this.server.to(roomId).emit('unread', unreadCountMap);
    this.sendChangeUserListInfoMessage(roomId, chatUsers);
    this.server.to(roomId).emit('chat', message);
  }

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    this.logger.log(message);
    const roomId = this.exportGroupId(client);
    const userId = this.socketsInRooms[roomId][client.id].userId;

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

  async sendChangeUserBroadcastMessage(roomId: string, chatMessageDto: ChatMessageDto) {
    this.server.to(roomId).emit('chat', chatMessageDto);
    this.server.to(roomId).emit('roomInfo', await this.groupService.getGroupInfo(Number(roomId)));

    const chatUsers: ChatUserInfoDto[] =
      await this.chatService.getUserInfoListWithLeavedByRoomId(roomId);

    this.sendChangeUserListInfoMessage(roomId, chatUsers);
  }

  sendChangeUserListInfoMessage(roomId: string, chatUsers: ChatUserInfoDto[]) {
    if (!this.socketsInRooms[roomId]) {
      return;
    }
    Object.values(this.socketsInRooms[roomId]).forEach((session) => {
      session.socket.emit(
        'userListInfo',
        chatUsers.map((chatUser: ChatUserInfoDto) => {
          return chatUser.updateIsMe(!chatUser.isLeave && chatUser.userId === session.userId);
        })
      );
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.leave(client.id); //자동 할당된 방을 나감
    this.logger.log('connect ' + client.id);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log('by' + client.id);
    const roomId = this.socketToRoomId[client.id];
    if (!roomId) {
      return;
    }
    const userId = this.socketsInRooms[roomId][client.id].userId;

    delete this.socketsInRooms[roomId][client.id];
    delete this.socketToRoomId[client.id];

    if (!this.hasAnotherSession(roomId, userId)) {
      await this.chatService.updateLastChatLogId(roomId, userId);
      this.server.to(roomId).emit('unread', await this.chatService.getUnreadCount(roomId));
    }
  }
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
}
