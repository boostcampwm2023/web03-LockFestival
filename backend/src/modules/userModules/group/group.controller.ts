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
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OptionalGuard } from '@src/decorator';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';

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

  @UseGuards(TokenAuthGuard)
  @OptionalGuard()
  @Get()
  async getAllGroups(
    @Req() { user },
    @Query() findOptions: GroupFindOptionsDto
  ): Promise<GroupFindResponseDto[]> {
    return await this.groupService.getAllGroups(user?.nickname, findOptions);
  }
}
