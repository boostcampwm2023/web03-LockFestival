import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.message.response.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';

@Injectable()
export class ChatService {
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

    return { lastChatLogId: meUser.lastChatLogId, unreadCountMap, chatUsers };
  }

  async validateLeader(roomId: string, userId: string) {
    return await this.chatRepository.validateLeaderByRoomId(roomId, userId);
  }

  async createMessgeByChat(chatMessageDto: ChatMessageDto): Promise<ChatMessageResponseDto> {
    return await this.chatRepository.createMessageByChat(chatMessageDto);
  }
  async findMessagesByLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageResponseDto[]> {
    return await this.chatRepository.findMessagesByStartLogId(chatUnreadDto);
  }
}
