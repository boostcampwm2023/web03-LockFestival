export type BackgroundColor = 'white' | 'green-light' | 'green-dark' | 'transparent';

export interface LabelComponentProps {
  font?: 'pretendard' | 'maplestory';
  size?: 's' | 'm' | 'l' | 's-bold' | 'm-bold' | 'l-bold';
  width?: string;
  backgroundColor?: BackgroundColor | string;
  isBorder: boolean;
}

export interface LabelProps extends LabelComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}
