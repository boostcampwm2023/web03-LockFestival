import { Diary } from '@diary/entities/diary.entity';
import { BaseTime } from '@src/entity/baseTime.entity';
import { User } from '@user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class Comment extends BaseTime {
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
