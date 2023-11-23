import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '@branch/entities/branch.entity';
import { BranchController } from '@branch/branch.controller';
import { BranchRepository } from '@branch/branch.repository';
import { BranchService } from '@branch/branch.service';
import { ThemeModule } from '@theme/theme.module';

@Module({
  imports: [TypeOrmModule.forFeature([Branch]), ThemeModule],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
})
export class BranchModule {}
