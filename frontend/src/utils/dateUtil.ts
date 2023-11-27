/**
 * Date 객체를 받아서 yyyy년 mm월 dd일로 변환하는 함수
 * @param date
 * @returns yyyy년 mm월 dd일
 */
const getStringByDate = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const date = String(inputDate.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${date}일`;
};

/**
 * Date 객체를 받아서 hh시 mm분으로 반환하는 함수
 * @param date
 * @returns hh시 mm분
 */

const getTimeByDate = (inputDate: Date) => {
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  return `${hours}시 ${minutes}분`;
};

export { getStringByDate, getTimeByDate };
