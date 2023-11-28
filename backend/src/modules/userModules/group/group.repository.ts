import { Repository, DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { convertSortToSymbol } from '@src/enum/sort.enum';
import { Group } from '@group/entities/group.entity';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupFindOptionsDto } from '@group/dtos/group.findoptions.request.dto';
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
        "CONCAT(branch.branch_name, ' ', brand.brand_name) AS brandBranchName",

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
}
