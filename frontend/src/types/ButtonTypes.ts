export interface ButtonComponentProps {
  font?: 'dnfbit' | 'jua' | 'gsans';
  size?: 's' | 'm' | 'l';
  width?: string;
}

export interface ButtonProps extends ButtonComponentProps {
  text: string;
  clickHandler(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
