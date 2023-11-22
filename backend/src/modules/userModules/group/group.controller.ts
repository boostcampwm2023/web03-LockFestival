import { Body, Controller, Post, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { GroupService } from '@group/group.service';
import { TokenAuthGuard } from '@auth/auth.guard';
import { GroupRequestDto } from '@group/dtos/group.create.dto';

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
}
