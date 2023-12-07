import * as cheerio from 'cheerio';
import { CrawlerAbstract } from '@src/crawler/service/crawler.abstract';
import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';
import axios from 'axios/index';
import https from 'https';

export class SeoulescapeCrawler extends CrawlerAbstract {
  constructor() {
    super();
    this.BASE_URL = 'https://www.seoul-escape.com';
    this.zizumMap = {
      '홍대점': 1,
      '인천 부평점': 2,
      '대구 동성로점': 4,
    };
    this.themeMap = {
      1: {
        '아마존의 잃어버린 도시': 38,
        '베니스 상인의 저주받은 저택': 37,
        'CIA 본부에서의 탈출': 36,
      },
      2: {
        '404호 살인사건': 35,
        '알카트라즈 지하감옥': 34,
        '회장님의 서재': 33,
        '유러피안 스파이': 32,
        '죽음을 부르는 재즈바': 31,
      },
      4: {
        파킹랏: 39,
        엘리베이터: 42,
        팩토리: 40,
        카지노: 39,
      },
    };
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
    const branchId = this.zizumMap[shop];
    const themeId = this.themeMap[theme];

    const reservation_info = await (
      await fetch(
        `${this.BASE_URL}/reservation?branch=${branchId}&theme=${themeId}&date=${date}#list`
      )
    ).text();

    const $ = cheerio.load(reservation_info);

    const timeList = [];

    $('div.res-times-btn > button').each((_, el) => {
      const $el = cheerio.load(el);
      const label = $el('label').text();
      const time = $el('span').text();

      timeList.push({ possible: label === '예약가능', time });
    });

    return timeList;
  }
}
