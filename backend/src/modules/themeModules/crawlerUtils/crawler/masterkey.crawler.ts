import * as cheerio from 'cheerio';
import { AbstractCrawler } from '@crawlerUtils/abstractCrawler';
import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';
import axios from 'axios';
import { Agent } from 'https';

export class MasterKeyCrawler extends AbstractCrawler {
  BASE_URL = 'https://www.master-key.co.kr';
  zizumMap = {
    '궁동직영점': 1,
    '해운대 블루오션스테이션': 40,
    '부평점': 36,
    '플레이포인트랩강남점': 35,
    '프라임신촌퍼플릭': 32,
    '노원점': 31,
    '동탄프라임': 30,
    '강남프라임': 29,
    '건대로데오': 28,
    '평택점': 27,
    '건대점': 26,
    '프라임청주점': 24,
    '화정점': 23,
    '잠실점': 21,
    '홍대상수점': 20,
    '부산서면점': 19,
    '천안신부점': 18,
    '강남점': 16,
    '대구동성로로데오점': 14,
    '안양점': 13,
    '익산점': 12,
    '홍대점': 11,
    '전주고사점': 8,
    '천안두정점': 7,
    '은행직영점': 2,
  };

  async getTimeTableByTheme({
    shop: shopId,
    theme,
    date,
  }: {
    shop: string;
    theme: string;
    date: string;
  }): Promise<TimeTableDto[]> {
    const shop = this.zizumMap[shopId];
    const data = await this.getInfoByData({ shop, date });
    const $ = cheerio.load(data);
    const boxTags = $('div.box2-inner');
    const timeArray = [];
    const regex = /(\d{2}:\d{2})/;

    boxTags.each((index, element) => {
      const themeTitle = $(element).find('div.title');
      if (themeTitle.text().trim() === theme) {
        $(element)
          .find('p.col')
          .each((index, element) => {
            const time = $(element).text().match(regex)[1];
            const timeObject = { time };
            timeObject['possible'] = $(element).hasClass('true');

            timeArray.push(timeObject);
          });
      }
    });

    return timeArray;
  }

  private async getInfoByData({ shop, date }) {
    const axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
    });

    const formData = new FormData();
    formData.append('date', date);
    formData.append('store', shop);
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/booking/booking_list_new`,
        data: formData,
      });

      return res.data;
    } catch (error) {
      return null;
    }
  }
}

export const MasterKeyCrawlerMetadata = {
  brandName: '마스터키',
  crawlerClass: MasterKeyCrawler,
};
