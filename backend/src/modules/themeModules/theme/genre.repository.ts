import { Repository, DataSource } from 'typeorm';
import { Genre } from '@theme/entities/genre.entity';
import { Injectable } from '@nestjs/common';
import { GenreDto } from '@theme/dtos/genre.dto';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(private dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }
  async getRandomGenreIds(count: number): Promise<GenreDto[]> {
    const genres = await this.dataSource
      .createQueryBuilder(Genre, 'genre')
      .orderBy('Rand()')
      .limit(count)
      .getMany();
    return genres.map(({ id, name }) => {
      return { id, name };
    });
  }

  async findAllGenres(): Promise<GenreDto[]> {
    const genreDtos: GenreDto[] = await this.dataSource
      .createQueryBuilder()
      .select('genre.id', 'id')
      .addSelect('genre.name', 'name')
      .from(Genre, 'genre')
      .orderBy('genre.id')
      .getRawMany();
    return genreDtos;
  }
}
