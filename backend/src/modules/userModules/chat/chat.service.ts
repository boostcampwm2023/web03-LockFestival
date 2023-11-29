import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async validateRoomAndGetChatUserList(roomId: string, nickname: string) {
    const chatUsers = (
      await this.chatRepository.validateRoomAndGetChatUserList(roomId, nickname)
    ).map((chatUser) => {
      return {
        ...chatUser,
        isMe: chatUser.user_nickname === nickname,
      };
    });

    const lastChatLogId: string = chatUsers.find(({ isMe }) => {
      return isMe;
    }).last_chat_log_id;

    const countMap: object = chatUsers
      .filter((user) => {
        return !user.isMe;
      })
      .map(({ last_chat_log_id: lastChatLogId }) => {
        return lastChatLogId.toString();
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

    return { lastChatLogId, unreadCountMap, chatUsers };
  }
}
