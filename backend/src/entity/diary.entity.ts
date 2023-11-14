import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
import { BaseTime } from './baseTime.entity';
import { User } from './user.entity';

@Entity()
export class Diary extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_success', nullable: true })
  isSuccess: boolean;

  @Column({ name: 'left_time', nullable: true })
  leftTime: number;

  @Column({ name: 'used_hint_count', nullable: true })
  usedHintCount: number;

  @Column({ name: 'escape_image_url', nullable: true })
  escapeImageUrl: string;

  @OneToOne(
    () => {
      return Group;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  @OneToOne(
    () => {
      return User;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator: User;
}
