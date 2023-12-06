import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '@group/group.repository';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { ThemeRepository } from '@theme/theme.repository';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';
import { GroupsResponseDto } from '@group/dtos/groups.response.dto';
import { Theme } from '@theme/entities/theme.entity';
import { UserGroupRepository } from '@user/userGroup.repository';
import { UserRepository } from '@user/user.repository';
import { User } from '@user/entities/user.entity';
import { ChatRepository } from '@chat/chat.repository';
import { GroupInfoResponseDto } from '@group/dtos/group.info.response.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(UserGroupRepository)
    private readonly userGroupRepository: UserGroupRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  async createGroup(groupRequest: GroupRequestDto, nickname: string) {
    const theme: Theme = await this.themeRepository.findOneBy({ id: groupRequest.themeId });
    const { groupId, user } = await this.groupRepository.createGroup(groupRequest, nickname, theme);
    await this.chatRepository.createRoomByLeader(groupId, user);
  }

  async getAllGroups(
    nickname: string,
    findOptions: GroupFindOptionsDto
  ): Promise<GroupsResponseDto> {
    const { count, dtos: rawDtos } = await this.groupRepository.findByFindOptions(findOptions);

    if (rawDtos.length === 0) {
      return new GroupsResponseDto(0, undefined, []);
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

    const restCount: number = Math.max(count - findOptions.count, 0);
    const nextCursor: number | undefined =
      restCount > 0 ? rawDtos[rawDtos.length - 1].groupId : undefined;

    return new GroupsResponseDto(
      restCount,
      nextCursor,
      rawDtos.map((dto) => {
        dto.hasPassword = dto.password !== null;
        dto.isEnter = enteredGroupsSet.has(dto.groupId);
        dto.appointmentCompleted = dto.appointmentCompleted === 1;
        dto.recruitmentCompleted = dto.recruitmentCompleted === 1;
        dto.brandBranchName = `${dto.brandName} ${dto.branchName}`;
        return new GroupFindResponseDto(dto);
      })
    );
  }

  async enterGroup(nickname: string, groupId: number): Promise<ChatMessageDto> {
    const user: User = await this.userRepository.findOneBy({ nickname });
    await this.groupRepository.insertGroup(user, groupId);

    return await this.chatRepository.addUserInRoom(
      groupId,
      user.id,
      user.nickname,
      user.profileImageUrl
    );
  }
  async getGroupInfo(groupId: number): Promise<GroupInfoResponseDto> {
    return await this.groupRepository.getGroupInfo(groupId);
  }
}
