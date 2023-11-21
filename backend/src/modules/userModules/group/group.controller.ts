import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  async createGroup(@Req() { user }, @Body() groupRequest: GroupRequestDto) {
    return this.groupService.createGroup(groupRequest, user.nickname);
  }
}
