import { Inject, Injectable } from '@nestjs/common';
import { AbstractCrawler } from '@crawlerUtils/abstractCrawler';
import { CRAWLERS } from '@crawlerUtils/crawler.tokens';
import { CrawlerMetadata } from '@crawlerUtils/crawler.metadata.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CrawlerFactory {
  private readonly crawlerMap: Map<string, AbstractCrawler> = new Map();

  constructor(
    @Inject(CRAWLERS) private readonly crawlerMetadataList: CrawlerMetadata[],
    @Inject(CACHE_MANAGER) private cacheManager
  ) {
    this.registerCrawlers();
  }

  public getCrawler(themeId: string): AbstractCrawler {
    const crawlerClass: AbstractCrawler = this.crawlerMap.get(themeId);

    if (!crawlerClass) {
      throw new Error(`Crawler for theme ${themeId} not found`);
    }

    return crawlerClass;
  }

  private registerCrawlers() {
    this.crawlerMetadataList.forEach(({ brandName, crawlerClass }: CrawlerMetadata) => {
      this.crawlerMap.set(brandName, new crawlerClass(this.cacheManager));
    });
  }
}
