import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchRepository } from '@branch/branch.repository';
import { ThemeRepository } from '@theme/theme.repository';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(BranchRepository)
    private readonly branchRepository: BranchRepository
  ) {}

  async getThemesByBranchId({ branchId, count }): Promise<ThemeResponseDto[]> {
    if (!(await this.branchRepository.existsBranchById(branchId))) {
      throw new NotFoundException('해당 지점이 존재하지 않습니다.');
    }

    const themes: ThemeResponseDto[] = await this.themeRepository.getThemesByBranchId({
      branchId,
      count,
    });

    return themes;
  }
}
