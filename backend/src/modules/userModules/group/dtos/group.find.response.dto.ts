import { GroupFindDetailResponseDto } from '@group/dtos/group.find.detail.response.dto';
import { GroupLeaderDto } from '@group/dtos/group.leader.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ThemeDetailsWithBranchNameResponseDto } from '@src/modules/themeModules/theme/dtos/theme.detail.branch.response.dto';

export class GroupFindResponseDto {
  @ApiProperty({ type: GroupLeaderDto })
  leader: GroupLeaderDto;
  @ApiProperty({ type: ThemeDetailsWithBranchNameResponseDto })
  themeDetail: ThemeDetailsWithBranchNameResponseDto;
  @ApiProperty({ type: GroupFindDetailResponseDto })
  groupDetail: GroupFindDetailResponseDto;

  constructor(options) {
    this.leader = new GroupLeaderDto(options);
    this.themeDetail = new ThemeDetailsWithBranchNameResponseDto(options);
    this.groupDetail = new GroupFindDetailResponseDto(options);
  }
}
