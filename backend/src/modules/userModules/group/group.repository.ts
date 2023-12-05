import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { convertSortToSymbol } from '@src/enum/sort.enum';
import { Group } from '@group/entities/group.entity';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
import { User } from '@user/entities/user.entity';
import { UserGroup } from '@user/entities/userGroup.entity';
import { Theme } from '@theme/entities/theme.entity';
import { Branch } from '@branch/entities/branch.entity';
import { Brand } from '@brand/entities/brand.entity';
import { GroupInfoResponseDto } from '@group/dtos/group.info.response.dto';

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
      await queryRunner.manager.save(UserGroup, UserGroup.createUserGroupObject(newGroup, user));
      await queryRunner.commitTransaction();
      return { groupId: newGroup.id, user };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error creating group', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async findByFindOptions(findOptions: GroupFindOptionsDto) {
    const qb = this.dataSource
      .createQueryBuilder()
      .select([
        'leader.nickname as nickname',
        'leader.profile_image_url as profileImageUrl',

        'theme.id as themeId',
        'branch.branchName as branchName',
        'theme.name as themeName',
        'theme.real_genre as realGenre',
        'theme.poster_image_url as posterImageUrl',
        'theme.difficulty as difficulty',
        'theme.min_member as minMember',
        'theme.max_member as maxMember',
        'theme.time_limit as playTime',
        'branch.website as website',
        'branch.phone_number as phone',
        'branch.address as address',
        "CONCAT(brand.brand_name, ' ', branch.branch_name) AS brandBranchName",

        'group.id as groupId',
        'group.appointment_date as appointmentDate',
        'group.current_members as currentMembers',
        'group.recruitment_members as recruitmentMembers',
        'group.recruitment_completed as recruitmentCompleted',
        'group.appointment_completed as appointmentCompleted',
        'group.recruitment_content as recruitmentContent',

        'group.password as password',
      ]);

    qb.from(Group, 'group')
      .innerJoin('group.theme', 'theme')
      .innerJoin('theme.branch', 'branch')
      .innerJoin('branch.brand', 'brand')
      .innerJoin('group.leader', 'leader');

    if (findOptions.recruitmentCompleted !== undefined) {
      qb.andWhere('group.recruitment_completed = :recruitmentCompleted', {
        recruitmentCompleted: findOptions.recruitmentCompleted,
      });
    }
    if (findOptions.appointmentCompleted !== undefined) {
      qb.andWhere('group.appointment_completed = :appointmentCompleted', {
        appointmentCompleted: findOptions.appointmentCompleted,
      });
    }
    if (findOptions.bigRegion) {
      qb.andWhere('branch.big_region = :bigRegion', {
        bigRegion: findOptions.bigRegion,
      });
    }
    if (findOptions.smallRegion) {
      qb.andWhere('branch.small_region = :smallRegion', {
        smallRegion: findOptions.smallRegion,
      });
    }
    if (findOptions.themeName) {
      qb.andWhere('theme.name like :themeName', {
        themeName: `%${findOptions.themeName}%`,
      });
    }

    if (findOptions.cursorGroupId) {
      const symbol = convertSortToSymbol(findOptions.isDesc);
      qb.andWhere(`group.id ${symbol} :cursorId`, {
        cursorId: findOptions.cursorGroupId,
      });
    }

    qb.orderBy('group.id', findOptions.isDesc);

    const [count, dtos] = await Promise.all([
      qb.getCount(),
      qb.limit(findOptions.count).getRawMany(),
    ]);

    return { count, dtos };
  }

  async insertGroup(user: User, groupId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const group: Group = await queryRunner.manager.findOneBy(Group, { id: groupId });

      if (!group) {
        throw new HttpException('해당 그룹은 존재하지 않습니다', HttpStatus.BAD_REQUEST);
      }

      if (
        await queryRunner.manager
          .createQueryBuilder(UserGroup, 'userGroup')
          .where('user_id = :userId', { userId: user.id })
          .andWhere('group_id = :groupId', { groupId: group.id })
          .getExists()
      ) {
        throw new HttpException('이미 해당 그룹의 소속되어 있습니다.', HttpStatus.BAD_REQUEST);
      }

      if (group.recruitmentMembers <= group.currentMembers) {
        throw new HttpException('이미 그룹이 꽉차있습니다.', HttpStatus.BAD_REQUEST);
      }

      // UserGroup 에 추가
      await queryRunner.manager.save(UserGroup, UserGroup.createUserGroupObject(group, user));

      // 현재 인원 1명 추가
      group.currentMembers += 1;
      await queryRunner.manager.save(group);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getGroupInfo(groupId: number): Promise<GroupInfoResponseDto> {
    try {
      const qb = await this.dataSource
        .createQueryBuilder(Group, 'group')
        .select([
          'brand.brandName as brandName',
          'branch.branchName as branchName',
          "CONCAT(branch.big_region, ' ', branch.small_region) AS regionName",
          'theme.name as themeName',
          'theme.id as themeId',
          'theme.poster_image_url as posterImageUrl',
          'group.recruitment_content as recruitmentContent',
          'group.appointment_date as appointmentDate',
          'group.recruitment_members as recruitmentMembers',
          'group.current_members as currentMembers',
          'group.recruitment_completed as recruitmentCompleted',
          'group.appointment_completed as appointmentCompleted',
        ])
        .where('group.id = :groupId', { groupId })
        .innerJoin(Theme, 'theme', 'group.theme_id = theme.id')
        .innerJoin(Branch, 'branch', 'theme.branch_id = branch.id')
        .innerJoin(Brand, 'brand', 'branch.brand_id = brand.id')
        .getRawOne();
      return new GroupInfoResponseDto(qb);
    } catch (err) {
      throw new HttpException('Error getting group information', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findGroupByGroupId(groupId: number) {
    return await this.dataSource
      .createQueryBuilder(Group, 'group')
      .select([
        'group.recruitment_completed as recruitmentCompleted',
        'group.current_members as currentMembers',
        'user.nickname as nickname',
      ])
      .where('group.id = :groupId', { groupId })
      .innerJoin(User, 'user', 'group.leader_id = user.id')
      .getRawOne();
  }

  async deleteGroupByNicknameAndGroupId(groupId: number, nickname: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    let leaderFlag = false;
    try {
      await queryRunner.startTransaction();
      const group = await queryRunner.manager.findOne(Group, {
        where: { id: groupId },
        relations: ['leader'],
      });

      if (!group) {
        throw new HttpException('해당 그룹은 존재하지 않습니다.', HttpStatus.BAD_REQUEST);
      }

      const { recruitmentCompleted, currentMembers, leader } = group;

      if (recruitmentCompleted) {
        throw new HttpException('모집이 완료되었습니다.', HttpStatus.BAD_REQUEST);
      }
      if (nickname === leader.nickname && currentMembers >= 2) {
        throw new HttpException('멤버 수가 2명 이상입니다.', HttpStatus.BAD_REQUEST);
      }
      await queryRunner.manager
        .createQueryBuilder(UserGroup, 'user_group')
        .delete()
        .where('user_group.group_id = :groupId', { groupId })
        .andWhere('user_group.user_id IN (SELECT id FROM `user` WHERE nickname = :nickname)', {
          nickname,
        })
        .execute();
      if (nickname === leader.nickname) {
        leaderFlag = true;
        await queryRunner.manager.delete(Group, { id: groupId });
      } else {
        group.currentMembers -= 1;
        await queryRunner.manager.save(group);
      }
      await queryRunner.commitTransaction();
      return leaderFlag;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
