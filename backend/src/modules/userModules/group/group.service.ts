import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '@group/group.repository';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { ThemeRepository } from '@theme/theme.repository';
import { Theme } from '@theme/entities/theme.entity';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';
import { UserGroupRepository } from '@user/userGroup.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(UserGroupRepository)
    private readonly userGroupRepository: UserGroupRepository
  ) {}

  async createGroup(groupRequest: GroupRequestDto, nickname: string) {
    const theme: Theme = await this.themeRepository.findOneBy({ id: groupRequest.themeId });
    await this.groupRepository.createGroup(groupRequest, nickname, theme);
  }

  async getAllGroups(
    nickname: string,
    findOptions: GroupFindOptionsDto
  ): Promise<GroupFindResponseDto[]> {
    const rawDtos = await this.groupRepository.findByFindOptions(findOptions);

    if (rawDtos.length === 0) {
      return rawDtos;
    }

    let enteredGroupsSet: Set<number> = new Set();

    if (nickname) {
      const groupIds: number[] = rawDtos.map(({ groupId }) => {
        return groupId;
      });

      enteredGroupsSet = (
        await this.userGroupRepository.findUserGroupsByNicknameAndGroupId(nickname, groupIds)
      ).reduce((prev, { groupId }) => {
        prev.add(groupId);
        return prev;
      }, enteredGroupsSet);
    }

    return rawDtos.map((dto) => {
      dto.hasPassword = dto.password !== null;
      dto.isEnter = enteredGroupsSet.has(dto.groupId);
      dto.appointmentCompleted = dto.appointmentCompleted === 1;
      dto.recruitmentCompleted = dto.recruitmentCompleted === 1;
      dto.brandBranchName = `${dto.brandName} ${dto.branchName}`;
      return new GroupFindResponseDto(dto);
    });
  }
}
