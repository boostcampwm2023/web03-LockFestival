import { Brand } from '@brand/entities/brand.entity';
import { BaseTime } from '@src/entity/baseTime.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Branch extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  website: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'branch_name' })
  branchName: string;

  @Column()
  address: string;

  //TODO: ENUM으로 바꾸기
  @Column({ name: 'big_region' })
  bigRegion: string;

  //TODO: ENUM으로 바꾸기
  @Column({ name: 'small_region' })
  smallRegion: string;

  @Column('decimal', { precision: 10, scale: 6 })
  x: number;

  @Column('decimal', { precision: 10, scale: 6 })
  y: number;

  @ManyToOne(
    () => {
      return Brand;
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand: Brand;
}
