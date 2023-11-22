const MIDDLE_NUMBER = 0.5;
const START_INDEX = 0;
/**
 * 랜덤 숫자 뽑기
 * @param n 1 ~ n까지의 수 중에서
 * @param k k개 뽑기 (n >=k)
 */
const pickRandomNumber = (n: number, k: number): Array<number> => {
  if (k > n) {
    throw new Error('asd');
  }

  const numbersArray = Array.from({ length: n }, (_, index) => index + 1).sort(
    () => Math.random() - MIDDLE_NUMBER
  );

  return numbersArray.slice(START_INDEX, k);
};

export default pickRandomNumber;
