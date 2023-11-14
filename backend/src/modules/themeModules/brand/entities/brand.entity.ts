import { BaseTime } from '@src/entity/baseTime.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Brand extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'brand_name' })
  brandName: string;
}
