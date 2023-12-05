import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserGroup } from '@user/entities/userGroup.entity';
import { User } from '@user/entities/user.entity';
import { UsersRoomsGroupDto } from '@user/dtos/users.rooms.group.dto';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
  constructor(private dataSource: DataSource) {
    super(UserGroup, dataSource.createEntityManager());
  }

  async findUserGroupsByNicknameAndGroupId(
    nickname: string,
    groupIds: number[]
  ): Promise<UsersRoomsGroupDto[]> {
    return await this.dataSource
      .createQueryBuilder()
      .select('user_group.group_id as groupId')
      .from(UserGroup, 'user_group')
      .innerJoin('user_group.user', 'user')
      .where('user_group.group in (:groupIds)', { groupIds })
      .andWhere('user.nickname = :nickname', { nickname })
      .getRawMany();
  }

  async findGroupsByNickname(nickname: string) {
    const rawDatas = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as themeName',
        'theme.poster_image_url as posterImageUrl',
        'branch.branch_name as branchName',
        'group.id as groupId',
        'group.recruitment_content as recruitmentContent',
      ])
      .from(UserGroup, 'user_group')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('user.id')
          .from(User, 'user')
          .where('user.nickname = :nickname', { nickname })
          .getQuery();
        return `user_group.user = ${subQuery}`;
      })
      .innerJoin('user_group.group', 'group')
      .innerJoin('group.theme', 'theme')
      .innerJoin('theme.branch', 'branch')
      .orderBy('user_group.created_at', 'DESC')
      .getRawMany();

    return rawDatas.map((data) => {
      return new UsersRoomsGroupDto(data);
    });
  }
}
