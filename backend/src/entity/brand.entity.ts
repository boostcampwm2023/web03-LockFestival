import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTime } from './baseTime.entity';
@Entity()
export class Brand extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'brand_name' })
  brandName: string;
}
