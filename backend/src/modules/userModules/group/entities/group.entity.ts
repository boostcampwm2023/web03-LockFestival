import { BaseTime } from '@src/entity/baseTime.entity';
import { Theme } from '@theme/entities/theme.entity';
import { User } from '@user/entities/user.entity';
import { UserGroup } from '@user/entities/userGroup.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';

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

  @Column({ name: ' appointment_time', nullable: true })
  appointmentTime: string;

  @OneToOne(
    () => {
      return User;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'leader_id', referencedColumnName: 'id' })
  leader: User;

  @OneToOne(
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
}
