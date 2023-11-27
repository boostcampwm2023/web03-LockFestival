/**
 * Date 객체를 받아서 yyyy년 mm월 dd일로 변환하는 함수
 * @param date
 * @returns yyyy년 mm월 dd일
 */
const getStringByDate = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();

  return `${year}년 ${month}월 ${date}일`;
};

export default getStringByDate;
