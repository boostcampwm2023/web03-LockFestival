export const throttle = (callback: (...args: any[]) => void, delay: number) => {
  let timeId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeId) {
      return;
    }
    timeId = setTimeout(() => {
      callback(...args);
      timeId = null;
    }, delay);
  };
};
