export interface ButtonComponentProps {
  font?: 'dnfbit' | 'jua' | 'gsans';
  size?: 's' | 'm' | 'l';
  width?: string;
  isIcon: boolean;
}

export interface ButtonProps
  extends ButtonComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
}
