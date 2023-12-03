import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://xdungeon.net/layout/res/home.php';
export const max_date = 7;

const zizumMap = {
  홍대던전: 3,
  던전101: 1,
  홍대던전Ⅲ: 5,
  강남던전: 2,
  강남던전Ⅱ: 4,
  던전루나: 6,
  서면던전: 7,
};

const getInfoByData = async ({ shop: shopId, theme, date }) => {
  const shop = zizumMap[shopId];
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}?rev_days=${date}&s_zizum=${shop}&go=rev.main`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getTimeTableByTheme = async ({ shop, theme, date }) => {
  const data = await getInfoByData({ shop, theme, date });

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
};
