import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTime {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => {
      return 'CURRENT_TIMESTAMP(6)';
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => {
      return 'CURRENT_TIMESTAMP(6)';
    },
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
