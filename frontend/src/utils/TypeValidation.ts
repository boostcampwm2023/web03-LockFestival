import { BackgroundColor } from 'types/label';

export const isTwBackgroundColor = (value: string | undefined): value is BackgroundColor => {
  if (!value) {
    return false;
  }
  return ['white', 'green-light', 'green-dark', 'transparent'].includes(value);
};
