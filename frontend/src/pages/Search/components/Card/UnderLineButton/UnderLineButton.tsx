import tw, { styled, css } from 'twin.macro';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  onClick?: () => void;
}

const UnderLineButton = ({ children, onClick }: ButtonProps) => {
  return <UnderlineButton onClick={onClick}>{children}</UnderlineButton>;
};

export default UnderLineButton;

const UnderlineButton = styled.button([
  tw`font-pretendard text-m text-white bg-transparent mobile:(text-s)`,
  css`
    cursor: pointer;

    :after {
      display: block;
      content: '';
      border-bottom: solid 2px white;
      transform: scale(0);
      transition: transform 250ms ease-in-out;
    }

    :hover:after {
      transform: scaleX(1);
    }
    :after {
      transform-origin: top left;
    }
  `,
]);
