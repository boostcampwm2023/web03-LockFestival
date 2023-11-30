import { ChatUser } from '@chat/entities/chat.user.schema';

export class ChatUserInfoDto {
  userId: string;
  nickname: string;
  profileImg: string;
  isLeader: boolean;
  isLeave: boolean;
  lastChatLogId: string;
  isMe: boolean;

  constructor(user: ChatUser) {
    this.userId = user._id.toString();
    this.profileImg = user.user_profile_url;
    this.nickname = user.user_nickname;
    this.isLeader = user.is_leader;
    this.isLeave = user.is_leave;
    this.lastChatLogId = user.last_chat_log_id;
  }

  updateIsMe(isMe: boolean) {
    this.isMe = isMe;
    return this;
  }
}
