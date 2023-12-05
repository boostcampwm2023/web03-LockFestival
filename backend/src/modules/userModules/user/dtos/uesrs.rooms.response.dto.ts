import { UsersRoomsGroupDto } from '@user/dtos/users.rooms.group.dto';

export class UsersRoomsResponseDto extends UsersRoomsGroupDto {
  lastChatMessage: string;
  lastChatTime: Date;
  hasNewChat: boolean;
  newChatCount: number;

  constructor({
    themeId,
    themeName,
    posterImageUrl,
    branchName,
    groupId,
    recruitmentContent,
    lastChatMessage,
    lastChatTime,
    hasNewChat,
    newChatCount,
  }) {
    super({ themeId, themeName, posterImageUrl, branchName, groupId, recruitmentContent });
    this.lastChatMessage = lastChatMessage;
    this.lastChatTime = lastChatTime;
    this.hasNewChat = hasNewChat;
    this.newChatCount = newChatCount;
  }
}
