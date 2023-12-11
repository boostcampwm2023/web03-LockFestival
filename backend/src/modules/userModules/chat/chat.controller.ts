import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from '@chat/chat.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { EnteredChatMessageResponseDto } from '@chat/dtos/chat.entered.response.dto';
import { GetUnreadChatListByGroupIdSwagger } from '@utils/swagger/chat.swagger.decorator';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':groupId/unread')
  @UseGuards(TokenAuthGuard)
  @GetUnreadChatListByGroupIdSwagger()
  async getUnreadChatListByGroupId(
    @Req() { user },
    @Param('groupId') groupId: number
  ): Promise<EnteredChatMessageResponseDto> {
    return await this.chatService.findUnreadMessagesByRoomIdAndNickname(
      String(groupId),
      user.nickname
    );
  }
}
