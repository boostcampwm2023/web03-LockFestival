import * as cheerio from 'cheerio';

async function getThemeTimeList({ date, shop, theme }) {
  const branchId = zizumMap[shop];
  const themeId = themeMap[theme];
  const reservation_info = await (
    await fetch(
      `https://www.seoul-escape.com/reservation?branch=${branchId}&theme=${themeId}&date=${date}#list`
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

const zizumMap = {
  '홍대점': 1,
  '인천 부평점': 2,
  '대구 동성로점': 4,
};

const themeMap = {
  '아마존의 잃어버린 도시': 38,
  '베니스 상인의 저주받은 저택': 37,
  'CIA 본부에서의 탈출': 36,
  '404호 살인사건': 35,
  '알카트라즈 지하감옥': 34,
  '회장님의 서재': 33,
  '유러피안 스파이': 32,
  '죽음을 부르는 재즈바': 31,
  '파킹랏': 39,
  '엘리베이터': 42,
  '팩토리': 40,
  '카지노': 39,
};
