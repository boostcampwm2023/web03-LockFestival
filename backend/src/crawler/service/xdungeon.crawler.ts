import * as cheerio from 'cheerio';
import { CrawlerAbstract } from '@src/crawler/service/crawler.abstract';
import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';
import axios from 'axios/index';

export class XdungeonCrawler extends CrawlerAbstract {
  constructor() {
    super();
    this.BASE_URL = 'https://www.seoul-escape.com';
    this.zizumMap = {
      홍대던전: 3,
      던전101: 1,
      홍대던전Ⅲ: 5,
      강남던전: 2,
      강남던전Ⅱ: 4,
      던전루나: 6,
      서면던전: 7,
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
    const data = await this.getInfoByData({ shopId, date });

    const $ = cheerio.load(data);
    const liTags = $(`p:contains(${theme})`).parent().siblings().find('li.sale');
    const timeArray = [];

    liTags.each((index, element) => {
      const checkClass = $(element).hasClass('dead');
      const originTime = $(element).text().trim();
      const checkTime = !index ? originTime.substring(4) : originTime;
      const timeObject = {
        time: checkTime,
      };
      if (checkClass === false) {
        timeObject['possible'] = true;
      }

      if (checkClass === true) {
        timeObject['possible'] = false;
      }

      timeArray.push(timeObject);
    });

    return timeArray;
  }

  private async getInfoByData({ shopId, date }) {
    try {
      const res = await axios({
        method: 'post',
        url: `${this.BASE_URL}?rev_days=${date}&s_zizum=${shopId}&go=rev.main`,
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }
}
