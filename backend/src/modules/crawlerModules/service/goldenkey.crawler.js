import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'http://xn--jj0b998aq3cptw.com/layout/res/home.php';

const zizumMap = {
  '대구동성로점': 1,
  '대구동성로2호점': 11,
  '강남점(타임스퀘어)': 5,
  '강남점(플라워로드)': 6,
  '건대점': 7,
};

const getInfoByData = async ({ shop, theme, date }) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}?go=rev.make&s_zizum=${shop}&rev_days=${date}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getTimeTableByTheme = async ({ shop: shopId, theme, date }) => {
  const shop = zizumMap[shopId];
  const data = await getInfoByData({ shop, theme, date });

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
};
