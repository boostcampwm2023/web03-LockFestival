import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '@branch/entities/branch.entity';
import { BranchController } from '@branch/branch.controller';
import { BranchRepository } from '@branch/branch.repository';
import { BranchService } from '@branch/branch.service';
import { ThemeRepository } from '@theme/theme.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService, ThemeRepository, BranchRepository],
})
export class BranchModule {}
