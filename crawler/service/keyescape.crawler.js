async function get(date, shopId) {
  const reservation_info = await (
    await fetch(`https://www.nextedition.co.kr/reservation_info?date=${date}&shop=${shopId}}`)
  ).json();
  const data = reservation_info.data;
  if (data === `예약할 수 없는 날짜입니다.`) {
    throw new Error(data);
  }

  //const roundList = data.themes.map(({ rounds }) => rounds);
  const roundMap = data.themes.reduce((prev, { title, rounds }) => {
    rounds.forEach(({ id, target_time }) => {
      prev[id] = { target_time, title, possible: true };
    });
    return prev;
  }, {});
  // id, target_time

  data.bookings.forEach(({ round_id }) => {
    roundMap[round_id].possible = false;
  });
  // id, round_id, target_date

  const result = Object.values(roundMap).reduce((prev, { title, target_time, possible }) => {
    prev[title] = prev[title] || [];
    prev[title].push({ target_time, possible });
    return prev;
  }, {});

  return result;
}

const zizumMap = {
  '건대점': 4,
  '강남점': 7,
  '건대2호점': 8,
  '강남3호점': 12,
  '강남5호점': 18,
  '신림점': 15,
  '잠실점': 19,
  '건대 보네르관': 20,
};

export async function getTimeTableByTheme({ shop, theme, date }) {
  return (await get(date, zizumMap[shop]))[theme];
}
