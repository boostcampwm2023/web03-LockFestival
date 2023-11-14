import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTime } from './baseTime.entity';
import { User } from './user.entity';
import { Group } from './group.entity';

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
}
