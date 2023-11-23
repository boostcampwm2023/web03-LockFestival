import { Repository, DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group } from '@group/entities/group.entity';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { User } from '@user/entities/user.entity';
import { UserGroup } from '@user/entities/userGroup.entity';
import { Theme } from '@theme/entities/theme.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private dataSource: DataSource) {
    super(Group, dataSource.createEntityManager());
  }
  async createGroup(groupRequest: GroupRequestDto, nickname: string, theme: Theme) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const user: User = await queryRunner.manager.findOneBy(User, { nickname });
      const newGroup = await queryRunner.manager.save(
        Group,
        Group.createGroupObject(groupRequest, user, theme)
      );
      await queryRunner.manager.save(UserGroup, Group.createUserGroupObject(newGroup, user));
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error creating group', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
