import { Group } from '@group/entities/group.entity';
import { BaseTime } from '@src/entity/baseTime.entity';
import { User } from '@user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserGroup extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'has_written_comment' })
  hasWrittenComment: boolean;

  @ManyToOne(
    () => {
      return User;
    },
    (user) => {
      return user.userGroups;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(
    () => {
      return Group;
    },
    (group) => {
      return group.userGroups;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  static createUserGroupObject(group: Group, user: User) {
    return {
      group: group,
      user_id: user.id,
      group_id: group.id,
      user: user,
      hasWrittenComment: false,
    };
  }
}
