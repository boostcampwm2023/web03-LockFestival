import { ChatType } from '@enum/chat.type';

export class ChatLeaveRoomDto {
  roomId: string;
  nickname: string;
  userChatId: string;
  chatType: ChatType;
  constructor(roomId, nickname, userChatId, chatType) {
    this.roomId = roomId;
    this.nickname = nickname;
    this.userChatId = userChatId;
    this.chatType = chatType;
  }
}
