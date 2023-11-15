export type BackgroundColor = 'white' | 'green-light' | 'green-dark' | 'transparent';

export interface LabelComponentProps {
  font?: 'dnfbit' | 'jua' | 'gsans';
  size?: 's' | 'm' | 'l';
  width?: string;
  backgroundColor?: BackgroundColor | string;
  isBorder: boolean;
}

export interface LabelProps extends LabelComponentProps, React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}
