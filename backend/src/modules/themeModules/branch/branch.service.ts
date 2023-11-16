import { Injectable } from '@nestjs/common';
import { ThemeRepository } from '../theme/theme.repository';
import { ThemeResponseDto } from '../theme/dtos/theme.response.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository
  ) {}

  async getThemesByBranchId({ branchId, count }): Promise<ThemeResponseDto[]> {
    const themes: ThemeResponseDto[] = await this.themeRepository.getThemesByBranchId({
      branchId,
      count,
    });

    return themes;
  }
}
