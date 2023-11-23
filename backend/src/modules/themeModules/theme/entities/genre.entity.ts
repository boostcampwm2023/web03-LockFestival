import { BaseTime } from '@src/entity/baseTime.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Genre extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
