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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OptionalGuard } from '@src/utils/decorator';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { GroupsResponseDto } from '@group/dtos/groups.response.dto';

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @ApiOperation({
    summary: '새로운 그룹 생성',
    description: '입력받은 데이터를 기반으로 새로운 그룹을 생성합니다.',
  })
  @ApiOkResponse({
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
  })
  @ApiBearerAuth('Authorization')
  @ApiBody({ type: GroupRequestDto })
  async createGroup(@Req() { user }, @Res() res, @Body() groupRequest: GroupRequestDto) {
    try {
      await this.groupService.createGroup(groupRequest, user.nickname);
      return res.status(HttpStatus.OK);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  @OptionalGuard()
  @ApiOperation({
    summary: '그룹 리스트 조회(검색)',
    description:
      '입력받은 조건을 기준으로 그룹 리스트를 반환합니다. 로그인한 사용자에게는 그룹에 속하는지에 대한 정보도 추가로 제공합니다.(Authentication: Optional)',
  })
  @ApiOkResponse({
    type: GroupsResponseDto,
  })
  @ApiBearerAuth('Authorization')
  async getAllGroups(
    @Req() { user },
    @Query() findOptions: GroupFindOptionsDto
  ): Promise<GroupsResponseDto> {
    return await this.groupService.getAllGroups(user?.nickname, findOptions);
  }

  @Post(`:groupId/enter`)
  @UseGuards(TokenAuthGuard)
  @ApiOperation({
    summary: '그룹에 해당 유저 추가',
    description: '그룹에 로그인한 현재 유저를 추가하고 채팅방에 추가해줍니다.',
  })
  @ApiParam({
    name: 'groupId',
    description: '입장하고자하는 그룹의 groupId',
  })
  @ApiOkResponse({
    type: Boolean,
  })
  @ApiBearerAuth('Authorization')
  async enterGroup(
    @Req() { user },
    @Param('groupId', ParseIntPipe)
    groupId: number,
    @Res() res
  ): Promise<boolean> {
    await this.groupService.enterGroup(user.nickname, groupId);
    return res.status(HttpStatus.OK).json({ success: true, message: 'Group created successfully' });
  }
}
