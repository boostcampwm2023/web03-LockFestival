import { BrandModule } from '@brand/brand.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { ThemeController } from '@theme/theme.controller';
import { ThemeService } from '@theme/theme.service';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { GenreService } from '@theme/genre.service';
import { CrawlerFactory } from '@crawlerUtils/crawler.factory';
import { CRAWLERS } from '@crawlerUtils/crawler.tokens';
import { DumbNDumberCrawlerMetadata } from '@crawlerUtils/crawler/dumbndumber.crawler';
import { EarthStarCrawlerMetadata } from '@crawlerUtils/crawler/earthstar.crawler';
import { GoldenKeyCrawlerMetadata } from '@crawlerUtils/crawler/goldenkey.crawler';
import { KeyEscapeCrawlerMetadata } from '@crawlerUtils/crawler/keyescape.crawler';
import { MasterKeyCrawlerMetadata } from '@crawlerUtils/crawler/masterkey.crawler';
import { NextEditionCrawlerMetadata } from '@crawlerUtils/crawler/nextedition.crawler';
import { SecretGardenEscapeCrawlerMetadata } from '@crawlerUtils/crawler/secretgardenescape.crawler';
import { SeoulEscapeRoomCrawlerMetadata } from '@crawlerUtils/crawler/seoulescaperoom.crawler';
import { XDungeonCrawlerMetadata } from '@crawlerUtils/crawler/xdungeon.crawler';
import { CacheModule } from '@nestjs/cache-manager';
import { SEC_TO_MILLI } from '@constants/time.converter';

const DEFAULT_TTL = 3 * SEC_TO_MILLI;

@Module({
  imports: [
    TypeOrmModule.forFeature([Theme]),
    BrandModule,
    CacheModule.register({
      ttl: DEFAULT_TTL,
    }),
  ],
  controllers: [ThemeController],
  providers: [
    ThemeService,
    ThemeRepository,
    GenreRepository,
    GenreService,
    CrawlerFactory,
    {
      provide: CRAWLERS,
      useValue: [
        DumbNDumberCrawlerMetadata,
        EarthStarCrawlerMetadata,
        GoldenKeyCrawlerMetadata,
        KeyEscapeCrawlerMetadata,
        MasterKeyCrawlerMetadata,
        SecretGardenEscapeCrawlerMetadata,
        SeoulEscapeRoomCrawlerMetadata,
        XDungeonCrawlerMetadata,
      ],
    },
  ],
  exports: [ThemeRepository, GenreRepository],
})
export class ThemeModule {}
