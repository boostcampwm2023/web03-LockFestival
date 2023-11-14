import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BaseTime } from './baseTime.entity';
import { User } from './user.entity';
import { Diary } from './diary.entity';
@Entity()
export class DiaryComment extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;

  @OneToOne(
    () => {
      return User;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'writer_id', referencedColumnName: 'id' })
  writer: User;

  @OneToOne(
    () => {
      return Diary;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'diary_id', referencedColumnName: 'id' })
  diary: Diary;
}
