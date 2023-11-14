import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTime } from './baseTime.entity';
@Entity()
export class Genre extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
