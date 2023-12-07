import { CrawlerAbstract } from '@src/crawler/service/crawler.abstract';
import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';

export class NexteditionCrawler extends CrawlerAbstract {
  constructor() {
    super();
    this.BASE_URL = 'https://www.nextedition.co.kr';
    this.zizumMap = {
      '건대점': 4,
      '강남점': 7,
      '건대2호점': 8,
      '강남3호점': 12,
      '강남5호점': 18,
      '신림점': 15,
      '잠실점': 19,
      '건대 보네르관': 20,
    };
    this.themeMap = undefined;
  }

  async getTimeTableByTheme({
    shop,
    theme,
    date,
  }: {
    shop: string;
    theme: string;
    date: Date;
  }): Promise<TimeTableDto[]> {
    const shopId = this.zizumMap[shop];
    const timeTableMap = await this.getInfoByData({ shop: shopId, date });

    return timeTableMap[theme];
  }

  private async getInfoByData({ shop, date }) {
    try {
      const reservation_info = await (
        await fetch(`${this.BASE_URL}/reservation_info?date=${date}&shop=${shop}}`)
      ).json();
      const data = reservation_info.data;
      if (data === `예약할 수 없는 날짜입니다.`) {
        throw new Error(data);
      }

      const roundMap = data.themes.reduce((prev, { title, rounds }) => {
        rounds.forEach(({ id, target_time }) => {
          prev[id] = { target_time, title, possible: true };
        });
        return prev;
      }, {});

      data.bookings.forEach(({ round_id }) => {
        roundMap[round_id].possible = false;
      });

      const result = Object.values(roundMap).reduce((prev, { title, target_time, possible }) => {
        prev[title] = prev[title] || [];
        prev[title].push({ target_time, possible });
        return prev;
      }, {});

      return result;
    } catch (error) {
      return null;
    }
  }
}
