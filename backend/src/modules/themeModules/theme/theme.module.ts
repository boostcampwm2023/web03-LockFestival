import { BranchModule } from '@branch/branch.module';
import { BrandModule } from '@brand/brand.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { ThemeController } from '@theme/theme.controller';
import { ThemeService } from '@theme/theme.service';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { GenreService } from '@theme/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), BrandModule, BranchModule],
  controllers: [ThemeController],
  providers: [ThemeService, ThemeRepository, GenreRepository, GenreService],
})
export class ThemeModule {}
