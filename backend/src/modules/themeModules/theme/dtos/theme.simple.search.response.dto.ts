import { ApiProperty } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeSimpleSearchResponseDto extends ThemeResponseDto {
  @ApiProperty({ name: 'branchName', description: '지점명', example: '강남점' })
  branchName: string;
}
