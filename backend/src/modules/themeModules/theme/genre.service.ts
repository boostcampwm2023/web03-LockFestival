import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreRepository } from '@theme/genre.repository';
import { GenreDto } from '@theme/dtos/genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository
  ) {}

  async getAllGenres(): Promise<GenreDto[]> {
    return await this.genreRepository.getAllGenres();
  }
}
