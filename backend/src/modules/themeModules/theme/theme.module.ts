import { BranchModule } from '@branch/branch.module';
import { BrandModule } from '@brand/brand.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@theme/entities/theme.entity';

@Module({ imports: [TypeOrmModule.forFeature([Theme]), BrandModule, BranchModule] })
export class ThemeModule {}
