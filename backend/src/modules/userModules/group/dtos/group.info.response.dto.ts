import { ApiProperty } from '@nestjs/swagger';
import { GroupInfoDto } from '@group/dtos/group.info.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class GroupInfoResponseDto extends GroupInfoDto {
  @ApiProperty({ description: '브랜드 이름', type: String, example: '키이스케이프' })
  brandName: string;

  @ApiProperty({ description: '지점 이름', type: String, example: '홍대점' })
  branchName: string;

  @ApiProperty({ description: '지역', type: String, example: '서울 홍대' })
  regionName: string;

  constructor({
    brandName,
    branchName,
    regionName,
    themeName,
    themeId,
    posterImageUrl,
    recruitmentContent,
    appointmentDate,
    recruitmentMembers,
    currentMembers,
    recruitmentCompleted,
    appointmentCompleted,
  }) {
    super({
      recruitmentContent,
      appointmentDate,
      recruitmentMembers,
      currentMembers,
      recruitmentCompleted,
      appointmentCompleted,
    });
    this.brandName = brandName;
    this.branchName = branchName;
    this.regionName = regionName;
    Object.assign(this, new ThemeResponseDto({ name: themeName, id: themeId, posterImageUrl }));
  }
}
