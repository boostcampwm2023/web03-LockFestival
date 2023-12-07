import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';

export abstract class CrawlerAbstract {
  BASE_URL: string;
  zizumMap;
  themeMap;
  abstract getTimeTableByTheme({
    shop,
    theme,
    date,
  }: {
    shop: string;
    theme: string;
    date: Date;
  }): Promise<TimeTableDto[]>;
}
