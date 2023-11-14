import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseTime } from './baseTime.entity';
import { Gender } from '../enum/gender';
import { UserGroup } from './userGroup.entity';
import { Theme } from './theme.entity';
import { Genre } from './genre.entity';

@Entity()
export class User extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 20, unique: true })
  nickname: string;

  //format : 010-1234-5678
  @Column({ name: 'phone_number', length: 13 })
  phoneNumber: string;

  @Column({ name: 'birth_year' })
  birthYear: number;

  // 남자 : M / 여자 : F
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'profile_image_url', nullable: true })
  profileImageUrl: string;

  @Column({ name: 'diary_count', default: 0 })
  diaryCount: number;

  @Column({ default: false })
  isMoreInfo: boolean;

  @OneToMany(
    () => {
      return UserGroup;
    },
    (userGroups) => {
      return userGroups.user;
    }
  )
  userGroups: UserGroup[];

  @ManyToMany(() => {
    return Theme;
  })
  @JoinTable({ name: 'favorite_theme' })
  favoriteThemes: Theme[];

  @ManyToMany(() => {
    return Genre;
  })
  @JoinTable({ name: 'favorite_genre' })
  favoriteGenres: Genre[];
}
