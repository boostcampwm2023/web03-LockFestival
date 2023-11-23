export interface ButtonComponentProps {
  font?: 'pretendard' | 'maplestory';
  size?: 's' | 'm' | 'l' | 's-bold' | 'm-bold' | 'l-bold';
  width?: string;
  isIcon: boolean;
}

export interface ButtonProps
  extends ButtonComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
}
