import * as cheerio from 'cheerio';
import { AbstractCrawler } from '@crawlerUtils/abstractCrawler';
import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';
import axios from 'axios';

export class KeyEscapeCrawler extends AbstractCrawler {
  BASE_URL = 'https://keyescape.co.kr/web/rev.theme_time.php';
  zizumMap = {
    'LOG_IN 2': 20,
    'LOG_IN 1': 19,
    '메모리컴퍼니': 18,
    '우주라이크': 16,
    '강남더오름': 14,
    '강남점': 3,
    '부산점': 9,
    '전주점': 7,
    '홍대점': 10,
  };
  themeMap = {
    20: {
      'BACK TO THE SCENE+': 61,
    },
    19: {
      머니머니패키지: 60,
    },
    18: {
      'FILM BY EDDY': 57,
      'FILM BY STEVE': 58,
      'FILM BY BOB': 59,
    },
    16: {
      'US': 55,
      'WANNA GO HOME': 56,
    },
    14: {
      네드: 48,
      엔제리오: 51,
    },
    3: {
      '월야애담-영문병행표기': 5,
      '살랑살랑연구소': 6,
      '그카지말라캤자나': 7,
    },
    9: {
      '정신병동': 37,
      '파파라치': 38,
      '난쟁이의 장난-영문병행표기': 35,
      '셜록 죽음의 전화': 39,
      '신비의숲 고대마법의 비밀': 36,
    },
    7: {
      '난쟁이의 장난-영문병행표기': 32,
      '혜화잡화점': 31,
      '월야애담-영문병행표기': 29,
      '사라진 목격자': 33,
      '살랑살랑연구소': 30,
    },
    10: {
      '삐릿-뽀': 41,
      '홀리데이': 45,
      '고백': 43,
    },
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
    const themeId = this.themeMap[shopId][theme];
    const data = await this.getInfoByData({ shop: shopId, theme: themeId, date });

    const $ = cheerio.load(data);
    const liTags = $('li');

    const timeArray = [];

    liTags.each((index, element) => {
      const checkClass = $(element).attr('class').trim();
      const checkTime = $(element).text().trim();

      const timeObject = {
        time: checkTime,
      };

      if (checkClass === 'possible') {
        timeObject['possible'] = true;
      }

      if (checkClass === 'impossible') {
        timeObject['possible'] = false;
      }

      timeArray.push(timeObject);
    });

    return timeArray;
  }

  private async getInfoByData({ shop, theme, date }) {
    try {
      const res = await axios({
        method: 'post',
        url: `${this.BASE_URL}?zizum_num=${shop}&rev_days=${date}&theme_num=${theme}`,
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }
}

export const KeyEscapeCrawlerMetadata = {
  brandName: '키이스케이프',
  crawlerClass: KeyEscapeCrawler,
};
