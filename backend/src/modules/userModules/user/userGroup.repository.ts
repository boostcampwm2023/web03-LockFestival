import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserGroup } from './entities/userGroup.entity';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
  constructor(private dataSource: DataSource) {
    super(UserGroup, dataSource.createEntityManager());
  }

  async findUserGroupsByNicknameAndGroupId(nickname: string, groupIds: number[]) {
    return await this.dataSource
      .createQueryBuilder()
      .select('user_group.group_id as groupId')
      .from(UserGroup, 'user_group')
      .innerJoin('user_group.user', 'user')
      .where('user_group.group in (:groupIds)', { groupIds })
      .andWhere('user.nickname = :nickname', { nickname })
      .getRawMany();
  }
}
