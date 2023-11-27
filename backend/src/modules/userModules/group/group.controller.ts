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
import { OptionalGuard } from '@src/decorator';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  @UseGuards(TokenAuthGuard)
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
