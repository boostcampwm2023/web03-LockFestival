import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';

export abstract class AbstractCrawler {
  BASE_URL: string;
  zizumMap: { [zizumName: string]: number };
  themeMap: { [zizumId: number]: { [themeName: string]: number } };
  cacheManager;

  constructor(cacheManager) {
    this.cacheManager = cacheManager;
  }

  abstract getTimeTableByTheme({
    shop,
    theme,
    date,
  }: {
    shop: string;
    theme: string;
    date: string;
  }): Promise<TimeTableDto[]>;
}
