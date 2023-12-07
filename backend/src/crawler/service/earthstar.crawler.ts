import * as cheerio from 'cheerio';
import { CrawlerAbstract } from '@src/crawler/service/crawler.abstract';
import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';

export class EarthstarCrawler extends CrawlerAbstract {
  constructor() {
    super();
    this.BASE_URL = 'https://지구별.com/';
    this.zizumMap = {
      홍대어드벤처점: 2,
      홍대라스트시티점: 4,
      대구점: 1,
    };
    this.themeMap = {
      2: {
        '지난날을 잊었다': 9,
        '미스터리': 8,
        '퀘스트 : 여정의 시작': 7,
      },
      4: {
        '스텔라': 16,
        '纹身(문신)': 15,
        '멸종위기종 탐사대': 14,
        '스위티': 13,
        '섀도우': 12,
      },
      1: {
        '우리 아빠': 11,
        '사명 : 투쟁의 노래': 6,
        '펭귄키우기': 5,
        '너의 겨울은 가고, 봄은 온다': 3,
        '만월 <<꿈을 훔치는 요괴>>': 2,
        '단디해라': 1,
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
    const themeId = this.themeMap[branchId][theme];

    const reservation_info = await (
      await fetch(
        `${this.BASE_URL}reservation?branch=${branchId}&theme=${themeId}&date=${date}#list`
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
