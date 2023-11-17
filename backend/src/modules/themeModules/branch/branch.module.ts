import { Branch } from '@branch/entities/branch.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { ThemeRepository } from '../theme/theme.repository';
import { BranchRepository } from './branch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService, ThemeRepository, BranchRepository],
})
export class BranchModule {}
