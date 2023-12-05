import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from '@chat/chat.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnteredChatMessageResponseDto } from '@chat/dtos/chat.entered.response.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':groupId/unread')
  @UseGuards(TokenAuthGuard)
  @ApiOperation({
    description: '채팅방 입장시 안읽은 메세지 리스트를 반환합니다.',
  })
  @ApiBadRequestResponse({
    description: '유저가 방에 없습니다.',
  })
  @ApiBearerAuth('Authorization')
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
