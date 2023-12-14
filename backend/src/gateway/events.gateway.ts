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
import { HttpException, HttpStatus, Injectable, Logger, ParseIntPipe } from '@nestjs/common';
import { PayloadDto } from '@auth/dtos/payload.dto';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatType } from '@enum/chat.type';
import { GroupService } from '@group/group.service';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatLeaveRoomDto } from '@chat/dtos/chat.leave.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';
import { GroupEditDto } from '@group/dtos/group.edit.dto';

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

  socketsInRooms: { [roomId: string]: { [socketId: string]: string } };
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
    return Object.values(this.socketsInRooms[roomId]).find((sessionUserId: string) => {
      return sessionUserId === userId;
    });
  }

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
    } else {
      client.emit('unread', unreadCountMap);
    }

    this.socketsInRooms[roomId][client.id] = meUser.userId;

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
      const socketIdList = Object.keys(this.socketsInRooms[roomId]);
      delete this.socketsInRooms[roomId];
      socketIdList.forEach((socketId) => {
        delete this.socketToRoomId[socketId];
      });
      return;
    }
    const chatUserId = await this.chatService.getChatUserIdByNicknameAndRoomId(roomId, nickname);
    const message = await this.chatService.leaveChatRoom(
      new ChatLeaveRoomDto(roomId, nickname, chatUserId, ChatType.out)
    );

    await this.sendChangeUserBroadcastMessage(roomId, message);
  }

  @SubscribeMessage('kick')
  async handleKick(@MessageBody('userId') kickUserId: string, @ConnectedSocket() client: Socket) {
    const roomId = this.socketToRoomId[client.id];
    const userId = this.socketsInRooms[roomId][client.id];

    if (!(await this.chatService.validateLeader(roomId, userId))) {
      throw new HttpException('강퇴는 방장만 가능합니다.', HttpStatus.UNAUTHORIZED);
    }

    const nickname = await this.chatService.getNicknameByChatUserId(kickUserId);
    await this.groupService.deleteGroupOnKick(Number(roomId), nickname);
    const message = await this.chatService.leaveChatRoom(
      new ChatLeaveRoomDto(roomId, nickname, kickUserId, ChatType.kick)
    );

    const socketId = Object.keys(this.socketsInRooms[roomId]).find((clientId) => {
      const sessionUserId = this.socketsInRooms[roomId][clientId];
      return sessionUserId === kickUserId;
    });

    const kickSocket = this.server.sockets.sockets.get(socketId);

    if (!!kickSocket) {
      kickSocket.emit('kick', { message: '방장에 의해 강퇴당하셨습니다.' });
      await kickSocket.leave(roomId);
    }

    await this.sendChangeUserBroadcastMessage(roomId, message);

    kickSocket.disconnect(true);
  }

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket
  ): Promise<string> {
    this.logger.log(message);
    const roomId = this.exportGroupId(client);
    const userId = this.socketsInRooms[roomId][client.id];

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

  @SubscribeMessage('roomInfo')
  async handleRoomInfo(
    @MessageBody('roomInfo') roomInfo: GroupEditDto,
    @ConnectedSocket() client: Socket
  ) {
    const roomId = this.exportGroupId(client);
    const userId = this.socketsInRooms[roomId][client.id];
    const nickname = await this.chatService.getNicknameByChatUserId(userId);

    const editedGroupInfo = await this.groupService.editGroupInfo({
      ...roomInfo,
      groupId: Number(roomId),
      leaderNickname: nickname,
    });
    client.to(roomId).emit('roomInfo', editedGroupInfo);
  }

  async sendChangeUserBroadcastMessage(roomId: string, chatMessageDto: ChatMessageDto) {
    this.server.to(roomId).emit('chat', chatMessageDto);
    this.server.to(roomId).emit('roomInfo', await this.groupService.getGroupInfo(Number(roomId)));

    const chatUsers: ChatUserInfoDto[] =
      await this.chatService.getUserInfoListWithLeavedByRoomId(roomId);

    const unreadCountMap = this.chatService.makeUnreadCountMap(
      chatUsers.filter(({ isLeave }) => {
        return !isLeave;
      })
    );

    this.server.to(roomId).emit('unread', unreadCountMap);

    this.sendChangeUserListInfoMessage(roomId, chatUsers);
  }

  sendChangeUserListInfoMessage(roomId: string, chatUsers: ChatUserInfoDto[]) {
    if (!this.socketsInRooms[roomId]) {
      return;
    }
    Object.entries(this.socketsInRooms[roomId]).forEach(([socketId, sessionUserId]) => {
      this.server.sockets.sockets.get(socketId).emit(
        'userListInfo',
        chatUsers.map((chatUser: ChatUserInfoDto) => {
          return chatUser.updateIsMe(!chatUser.isLeave && chatUser.userId === sessionUserId);
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
    const userId = this.socketsInRooms[roomId][client.id];

    delete this.socketsInRooms[roomId][client.id];
    delete this.socketToRoomId[client.id];

    try {
      if (!this.hasAnotherSession(roomId, userId)) {
        await this.chatService.updateLastChatLogId(roomId, userId);
        this.server.to(roomId).emit('unread', await this.chatService.getUnreadCount(roomId));
      }
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
}
