import { Branch } from '@branch/entities/branch.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Branch])] })
export class BranchModule {}
