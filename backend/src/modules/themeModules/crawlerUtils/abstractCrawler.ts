import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';

export abstract class AbstractCrawler {
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
    date: string;
  }): Promise<TimeTableDto[]>;
}
