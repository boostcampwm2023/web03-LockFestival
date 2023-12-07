import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { GroupRequestDto } from '@group/dtos/group.create.dto';

export class GroupEditDto extends GroupRequestDto {
  @Type(() => {
    return Boolean;
  })
  @IsBoolean()
  recruitmentCompleted: boolean;

  @IsOptional()
  leaderNickname?: string;

  @IsOptional()
  groupId?: number;
}
