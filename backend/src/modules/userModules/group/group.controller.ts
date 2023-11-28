import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
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
    description: JSON.stringify({ success: true, message: 'Group created successfully' }),
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: JSON.stringify({ success: false, message: 'Error creating group' }),
  })
  @ApiBearerAuth('Authorization')
  @ApiBody({ type: GroupRequestDto })
  async createGroup(@Req() { user }, @Res() res, @Body() groupRequest: GroupRequestDto) {
    try {
      await this.groupService.createGroup(groupRequest, user.nickname);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Group created successfully' });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'Error creating group' });
    }
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  @OptionalGuard()
  @ApiOperation({
    summary: '그룹 리스트 조회(검색)',
    description:
      '입력받은 조건을 기준으로 그룹 리스트를 반환합니다. 로그인한 사용자에게는 그룹에 속하는지에 대한 정보도 추가로 제공합니다.',
  })
  @ApiOkResponse({
    type: GroupsResponseDto,
  })
  async getAllGroups(
    @Req() { user },
    @Query() findOptions: GroupFindOptionsDto
  ): Promise<GroupsResponseDto> {
    return await this.groupService.getAllGroups(user?.nickname, findOptions);
  }
}
