import { Injectable, Logger } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.mesage.response.dto';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { EnteredChatMessageResponseDto } from '@chat/dtos/chat.entered.response.dto';
import { ChatLeaveRoomDto } from '@chat/dtos/chat.leave.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(private readonly chatRepository: ChatRepository) {}

  async validateRoomAndGetChatUserList(roomId: string, nickname: string) {
    const chatUsers: ChatUserInfoDto[] = (
      await this.chatRepository.validateRoomAndGetChatUserList(roomId, nickname)
    ).map((chatUser: ChatUserInfoDto) => {
      return chatUser.updateIsMe(chatUser.nickname === nickname);
    });

    const meUser: ChatUserInfoDto = chatUsers.find(({ isMe, isLeave }) => {
      return isMe && !isLeave;
    });

    const unreadCountMap = this.makeUnreadCountMap(
      chatUsers.filter(({ isMe }) => {
        return !isMe;
      })
    );

    await this.chatRepository.updateRead(meUser.userId);

    const prevMessages: ChatMessageResponseDto = await this.findMessagesByLogId({
      cursorLogId:
        meUser.lastChatLogId || (await this.chatRepository.findLastChatLogIdByRoomId(roomId)),
      count: 0,
      direction: 1,
      roomId,
    });

    return { prevMessages, unreadCountMap, chatUsers, meUser };
  }

  async getUnreadCount(roomId: string) {
    const chatUsers: ChatUserInfoDto[] = await this.chatRepository.findUserListByRoomId(roomId);

    return this.makeUnreadCountMap(chatUsers);
  }

  makeUnreadCountMap(chatUsers: ChatUserInfoDto[]) {
    const countMap: { [k: string]: number } = chatUsers
      .filter((user: ChatUserInfoDto) => {
        return !!user.lastChatLogId;
      })
      .map(({ lastChatLogId }) => {
        return lastChatLogId;
      })
      .reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
      }, {});

    let count: number = 0;
    return Object.entries(countMap)
      .sort(([key1], [key2]) => {
        return key1.localeCompare(key2);
      })
      .reduce((acc, [key, value]) => {
        count += value;
        acc[count] = key;
        return acc;
      }, {});
  }

  async validateLeader(roomId: string, userId: string): Promise<boolean> {
    this.logger.log(`roomId: ${roomId}, userId: ${userId}`);
    return await this.chatRepository.validateLeaderByRoomId(roomId, userId);
  }

  async getUserInfoListWithLeavedByRoomId(roomId: string): Promise<ChatUserInfoDto[]> {
    this.logger.log(`roomId: ${roomId}`);
    return await this.chatRepository.findUserListWithLeavedUserByRoomId(roomId);
  }

  async createMessageByChat(chatMessageDto: ChatMessageRequestDto): Promise<ChatMessageDto> {
    this.logger.log(chatMessageDto);
    return await this.chatRepository.createMessageByChat(chatMessageDto);
  }
  async updateLastChatLogId(roomId: string, userId: string) {
    const lastChatLogId = await this.chatRepository.findLastChatLogIdByRoomId(roomId);
    if (!lastChatLogId) {
      return;
    }
    await this.chatRepository.updateLastChatLogId(userId, lastChatLogId);
  }
  async findMessagesByLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageResponseDto> {
    this.logger.log(chatUnreadDto);
    const messages: ChatMessageDto[] =
      await this.chatRepository.findMessagesByStartLogId(chatUnreadDto);
    return new ChatMessageResponseDto(chatUnreadDto.cursorLogId, messages, chatUnreadDto.direction);
  }

  async findUnreadMessagesByRoomIdAndNickname(
    roomId: string,
    nickname: string
  ): Promise<EnteredChatMessageResponseDto> {
    const chatUser: ChatUser = await this.chatRepository.validateRoomAndGetChatUser(
      roomId,
      nickname
    );

    const messages: ChatMessageDto[] = await this.chatRepository.findMessagesByStartLogId(
      new ChatUnreadDto(roomId, chatUser.last_chat_log_id, 1, 0)
    );

    return new EnteredChatMessageResponseDto(chatUser.last_chat_log_id, messages);
  }

  async getNicknameByChatUserId(chatUserId: string): Promise<string> {
    return await this.chatRepository.getNicknameByChatUserId(chatUserId);
  }

  async getChatUserIdByNicknameAndRoomId(roomId: string, nickname: string): Promise<ChatUser> {
    return (await this.chatRepository.validateRoomAndGetChatUser(roomId, nickname))._id;
  }

  async leaveChatRoom(dto: ChatLeaveRoomDto): Promise<ChatMessageDto> {
    await this.chatRepository.updateUserInfoOnLeave(dto.userChatId);
    const message: ChatMessageDto = await this.chatRepository.createMessageByLeaveEvent(
      dto.roomId,
      dto.nickname,
      dto.chatType
    );
    return message;
  }

  async deleteRoomByLeader(roomId: string): Promise<void> {
    await this.chatRepository.deleteRoomByLeader(roomId);
  }
}
