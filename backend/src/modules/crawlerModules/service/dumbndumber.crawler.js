import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'http://www.dumbndumber.kr/reservation.html';

//중복 테마 처리
const zizum_num = {
  대학로점: 1,
  홍대점: 2,
  서면점: 3,
};

const theme_num = {
  1: {
    '작전명: 옵저버': 1,
    '크라임시티': 2,
    '러브클리닉': 3,
    '투 앨리스': 4,
    '푸른수염': 5,
    '글램핑': 6,
  },
  2: {
    '오므라이스': 7,
    '소공녀': 8,
    '버킷리스트': 9,
    '기담': 10,
    'Knock Knock': 11,
    '마리오네뜨': 12,
    '휴가중': 13,
  },
  3: {
    '소공녀': 14,
    '러브클리닉': 15,
    '투 앨리스': 16,
    '글랭핑A': 17,
    '글랭핑B': 18,
    '동전노래방': 19,
    '작전명: 옵저버	': 20,
    '휴가중': 21,
    'Knock Knock': 22,
    '기담	': 23,
    '크라임시티': 24,
    '푸른수염': 25,
  },
};

async function getInfoByData({ shop, theme, date }) {
  const shopId = zizum_num[shop];
  const themeId = theme_num[shopId][theme];
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}?k_shopno=${shopId}&rdate=${date}&prdno=${themeId}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getTimeTableByTheme({ shop, theme, date }) {
  const data = await getInfoByData({ shop, theme, date });

  const $ = cheerio.load(data);
  const liTags = $('ul.reserve_Time li');
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
