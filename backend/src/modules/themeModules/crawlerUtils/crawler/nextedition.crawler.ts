import { AbstractCrawler } from '@crawlerUtils/abstractCrawler';
import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';
import { TIMETABLE_TTL } from '@constants/ttl';

export class NextEditionCrawler extends AbstractCrawler {
  BASE_URL = 'https://www.nextedition.co.kr';
  zizumMap = {
    '건대점': 4,
    '부천점': 5,
    '부평점': 6,
    '강남점': 7,
    '건대2호점': 8,
    '분당서현점': 11,
    '강남3호점': 12,
    '강남5호점': 18,
    '신림점': 15,
    '잠실점': 19,
    '건대 보네르관': 20,
  };

  async getTimeTableByTheme({
    shop,
    theme,
    date,
  }: {
    shop: string;
    theme: string;
    date: string;
  }): Promise<TimeTableDto[]> {
    const shopId = this.zizumMap[shop];
    const timeTableMap = await this.getInfoByData({ shop: shopId, date });

    await Promise.all(
      Object.entries(timeTableMap).map(([themeName, timetable]) => {
        const key = JSON.stringify({ shop, theme: themeName, date });
        this.cacheManager.set(key, timetable, TIMETABLE_TTL);
      })
    );

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
          prev[id] = { time: target_time, title, possible: true };
        });
        return prev;
      }, {});

      data.bookings.forEach(({ round_id }) => {
        roundMap[round_id].possible = false;
      });

      const result = Object.values(roundMap).reduce((prev, { title, time, possible }) => {
        prev[title] = prev[title] || [];
        prev[title].push({ time, possible });
        return prev;
      }, {});

      return result;
    } catch (error) {
      return [];
    }
  }
}

export const NextEditionCrawlerMetadata = {
  brandName: '넥스트에디션',
  crawlerClass: NextEditionCrawler,
};
