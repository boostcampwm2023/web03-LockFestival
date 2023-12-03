import { Injectable, Logger } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.mesage.response.dto';

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

    const meUser: ChatUserInfoDto = chatUsers.find(({ isMe }) => {
      return isMe;
    });

    const countMap: object = chatUsers
      .filter((user: ChatUserInfoDto) => {
        return !user.isMe;
      })
      .map(({ lastChatLogId }) => {
        return lastChatLogId;
      })
      .reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
      }, {});

    let count: number = 0;
    const unreadCountMap = Object.entries(countMap)
      .sort(([key1], [key2]) => {
        return key1.localeCompare(key2);
      })
      .reduce((acc, [key, value]) => {
        count += value;
        acc[count] = key;
        return acc;
      }, {});

    await this.chatRepository.updateRead(meUser.userId);

    const prevMessages: ChatMessageResponseDto = await this.findMessagesByLogId({
      startLogId: meUser.lastChatLogId,
      count: 0,
      direction: 1,
      roomId,
    });

    return { prevMessages, unreadCountMap, chatUsers };
  }

  async validateLeader(roomId: string, userId: string) {
    this.logger.log(`roomId: ${roomId}, userId: ${userId}`);
    return await this.chatRepository.validateLeaderByRoomId(roomId, userId);
  }

  async createMessageByChat(chatMessageDto: ChatMessageRequestDto): Promise<ChatMessageDto> {
    this.logger.log(chatMessageDto);
    return await this.chatRepository.createMessageByChat(chatMessageDto);
  }
  async findMessagesByLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageResponseDto> {
    this.logger.log(chatUnreadDto);
    const messages: ChatMessageDto[] =
      await this.chatRepository.findMessagesByStartLogId(chatUnreadDto);
    return new ChatMessageResponseDto(chatUnreadDto.startLogId, messages);
  }
}
