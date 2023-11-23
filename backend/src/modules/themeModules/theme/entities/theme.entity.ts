import { Branch } from '@branch/entities/branch.entity';
import { BaseTime } from '@src/entity/baseTime.entity';
import { Genre } from '@theme/entities/genre.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Theme extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'poster_image_url' })
  posterImageUrl: string;

  @Column({ name: 'max_member' })
  maxMember: number;

  @Column({ name: 'min_member' })
  minMember: number;

  @Column({ name: 'time_limit' })
  timeLimit: number;

  @Column('decimal', { name: 'difficulty', nullable: true, precision: 2, scale: 1 })
  difficulty: number;

  @Column('decimal', { name: 'horror', nullable: true, precision: 2, scale: 1 })
  horror: number;

  //홈페이지 표기상의 장르
  @Column({ name: 'real_genre', nullable: true })
  realGenre: string;

  @Column('text', { name: 'etc', nullable: true })
  etc: string;

  @ManyToOne(
    () => {
      return Branch;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'branch_id', referencedColumnName: 'id' })
  branch: Branch;

  //분류된 장르
  @ManyToOne(
    () => {
      return Genre;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'genre_id', referencedColumnName: 'id' })
  genre: Genre;
}
