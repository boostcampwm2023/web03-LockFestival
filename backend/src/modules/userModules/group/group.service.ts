import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '@group/group.repository';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { ThemeRepository } from '@theme/theme.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    private readonly themeRepository: ThemeRepository
  ) {}
  async createGroup(groupRequest: GroupRequestDto, nickname: string) {
    const theme = await this.themeRepository.findOneBy({ id: groupRequest.themeId });
    await this.groupRepository.createGroup(groupRequest, nickname, theme);
  }
}
