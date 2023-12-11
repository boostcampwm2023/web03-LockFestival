import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OptionalGuard } from '@src/utils/decorator';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { GroupsResponseDto } from '@group/dtos/groups.response.dto';
import { EventsGateway } from '@src/gateway/events.gateway';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import {
  CreateGroupSwagger,
  EnterGroupSwagger,
  ExitGroupSwagger,
  GetAllGroupsSwagger,
} from '@utils/swagger/group.swagger.decorator';

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private eventsGateway: EventsGateway
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @CreateGroupSwagger()
  async createGroup(@Req() { user }, @Res() res, @Body() groupRequest: GroupRequestDto) {
    try {
      await this.groupService.createGroup(groupRequest, user.nickname);
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  @OptionalGuard()
  @GetAllGroupsSwagger()
  async getAllGroups(
    @Req() { user },
    @Query() findOptions: GroupFindOptionsDto
  ): Promise<GroupsResponseDto> {
    return await this.groupService.getAllGroups(user?.nickname, findOptions);
  }

  @Post(`:groupId/enter`)
  @UseGuards(TokenAuthGuard)
  @EnterGroupSwagger()
  async enterGroup(
    @Req() { user },
    @Param('groupId', ParseIntPipe)
    groupId: number,
    @Res() res
  ): Promise<boolean> {
    const inMessage: ChatMessageDto = await this.groupService.enterGroup(user.nickname, groupId);
    await this.eventsGateway.sendChangeUserBroadcastMessage(String(groupId), inMessage);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Successfully entered the group!' });
  }

  @Delete(':groupId')
  @UseGuards(TokenAuthGuard)
  @ExitGroupSwagger()
  async exitGroup(@Param('groupId', ParseIntPipe) groupId: number, @Req() { user }) {
    const leaderFlag = await this.groupService.deleteGroupOnOut(groupId, user.nickname);
    await this.eventsGateway.leave(String(groupId), user.nickname, leaderFlag);
  }
}
