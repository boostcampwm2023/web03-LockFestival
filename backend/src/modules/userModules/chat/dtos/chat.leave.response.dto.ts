import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';

export class ChatLeaveRoomResponseDto {
  chatUsers: ChatUserInfoDto[];
  unreadCountMap: Record<string, string>;
  message: ChatMessageDto;
}
