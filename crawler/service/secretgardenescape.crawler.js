import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'http://secretgardenescape.com/reservation.html';

const zizum_num = {
  '다운타운 홍대': 2,
  '서면점': 3,
  '대학로점': 4,
  '건대점': 5,
  '동성로점': 6,
  '미드나잇 합정': 7,
  '포레스트 건대': 8,
  '리버타운 강남': 9,
  '광주점': 10,
  '시네마틱 혜화': 11,
  '전주점': 12,
};

const theme_num = {
  'BOSS : COMPANY_LU': 75,
  'Day, trip': 83,
  'Promesa Act1 만남': 84,
  'Promesa Act2 조우': 85,
  '아뜰리에': 20,
  '비밀의 화원': 23,
  '연애학개론': 21,
  '컬러즈': 19,
  '블라인드': 22,
  '베이비 레이스': 18,
  '슈퍼 엔지니어': 17,
  '비밀의 모험': 24,
  '슈퍼플레이어:PLAYER1': 25,
  '엑스튜브': 26,
  '대감댁변씨': 27,
  '나이스': 28,
  '비밀의 선물': 30,
  '우리의 전 사랑': 31,
  '레드림 컴퍼니': 32,
  '안녕': 33,
  '우끼끼': 34,
  '핑크슈즈': 35,
  '리비도': 37,
  '대×9탈출': 42,
  '안녕': 39,
  '비밀의 선물': 38,
  '대감댁 변씨': 36,
  '영웅을 찾아서': 40,
  '향수 2019': 41,
  '비밀의 가족': 88,
  '파리82': 87,
  '팩토리 엠': 86,
  '기다려, 금방 갈게[야외]': 47,
  '아인모스': 52,
  '미씽 스노우맨': 48,
  '새벽 베이커리': 49,
  '너의 성인식': 51,
  '라스트 잡': 50,
  '스물아홉': 53,
  '무고': 54,
  '스토커': 55,
  '후레쉬망고 호스텔': 82,
  '브로커 나씨': 56,
  '만화 : 늦게 피어난 꽃': 57,
  'Z': 91,
  '무고': 58,
  '리비도': 59,
  '스토커': 60,
  '새벽 베이커리': 61,
  '비밀의 가족': 62,
  '라스트 잡': 63,
  'Love Blossom': 64,
  'H.E.L.L.P': 66,
  '달 : 기억의 조각': 68,
  '딜레마': 70,
  '도망자 여씨': 71,
  '삼남매 이씨(차녀-수,목)': 69,
  '삼남매 이씨(장녀-금,토)': 69,
  '삼남매 이씨(막내-일,월,화)': 69,
  '달 : 기억의 조각': 77,
  '사춘기': 76,
  '담력학원': 78,
};

const zizum_to_theme = {
  2: [75, 83, 84, 85],
  3: [20, 23, 21, 19, 22, 18, 17],
  4: [24, 25, 26, 27, 28],
  5: [30, 31, 32, 33, 34, 35],
  6: [37, 42, 39, 38, 36, 40, 41],
  7: [88, 87, 86, 47],
  8: [52, 48, 49, 51, 50, 53],
  9: [54, 55, 82, 56, 57, 91],
  10: [58, 59, 60, 61, 62, 63, 64],
  11: [66, 68, 70, 71, 69, 69, 69],
  12: [77, 76, 78],
};

const getInfoByData = async ({ shop, theme, date }) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}?k_shopno=${shop}&rdate=${date}&prdno=${theme}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getTimeTableByTheme = async ({ shop: shopId, theme: themeId, date }) => {
  const shop = zizum_num[shopId];
  const theme = theme_num[themeId];
  const data = await getInfoByData({ shop, theme, date });

  const $ = cheerio.load(data);
  const liTags = $('ul.reserve_Time > li > a');

  const timeArray = [];

  liTags.each((index, element) => {
    const checkClass = $(element).hasClass('end');
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
};
