import * as cheerio from 'cheerio';
import { CrawlerAbstract } from '@src/crawler/service/crawler.abstract';
import { TimeTableDto } from '@src/crawler/dtos/timetable.response.dto';
import axios from 'axios/index';

export class GoldenkeyCrawler extends CrawlerAbstract {
  constructor() {
    super();
    this.BASE_URL = 'http://xn--jj0b998aq3cptw.com/layout/res/home.php';
    this.zizumMap = {
      '대구동성로점': 1,
      '대구동성로2호점': 11,
      '강남점(타임스퀘어)': 5,
      '강남점(플라워로드)': 6,
      '건대점': 7,
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
    const data = await this.getInfoByData({ shop: shopId, date });

    const $ = cheerio.load(data);
    const liTags = $(`h3:contains(${theme})`).parent().siblings().find('li');
    const timeArray = [];

    liTags.each((index, element) => {
      const checkClass = $(element).find('a').hasClass('end');
      const checkTime = $(element).find('span.time').text().trim();
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

  private async getInfoByData({ shop, date }) {
    try {
      const res = await axios({
        method: 'post',
        url: `${this.BASE_URL}?go=rev.make&s_zizum=${shop}&rev_days=${date}`,
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }
}
