import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import { BaseTime } from '@src/entity/baseTime.entity';
import { Theme } from '@theme/entities/theme.entity';
import { User } from '@user/entities/user.entity';
import { UserGroup } from '@user/entities/userGroup.entity';
import { GroupRequestDto } from '@group/dtos/group.create.dto';

@Entity()
export class Group extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1, name: 'current_members' })
  currentMembers: number;

  @Column({ default: false, name: 'diary_created' })
  diaryCreated: boolean;

  @Column({ name: 'recruitment_members' })
  recruitmentMembers: number;

  @Column({ name: 'recruitment_content', length: 50 })
  recruitmentContent: string;

  @Column({ name: 'recruitment_completed', default: false })
  recruitmentCompleted: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'appointment_date' })
  appointmentDate: Date;

  @Column({ name: 'appointment_time', nullable: true })
  appointmentTime: string;

  @Column({ name: 'appointment_completed', default: false })
  appointmentCompleted: boolean;

  @ManyToOne(
    () => {
      return User;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'leader_id', referencedColumnName: 'id' })
  leader: User;

  @ManyToOne(
    () => {
      return Theme;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'theme_id', referencedColumnName: 'id' })
  theme: Theme;

  @OneToMany(
    () => {
      return UserGroup;
    },
    (userGroups) => {
      return userGroups.group;
    }
  )
  userGroups: UserGroup[];

  static createGroupObject(groupRequest: GroupRequestDto, user: User, theme: Theme) {
    return {
      recruitmentMembers: groupRequest.recruitmentMembers,
      appointmentCompleted: groupRequest.appointmentCompleted,
      recruitmentContent: groupRequest.recruitmentContent,
      theme_id: groupRequest.themeId,
      appointmentDate: groupRequest.appointmentDate,
      theme: theme,
      leader: user,
      leader_id: user.id,
    };
  }
}
