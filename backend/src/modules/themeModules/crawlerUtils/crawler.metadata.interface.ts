import { AbstractCrawler } from '@crawlerUtils/abstractCrawler';
import { Type } from '@nestjs/common';

export interface CrawlerMetadata {
  brandName: string;
  crawlerClass: Type<AbstractCrawler>;
}
