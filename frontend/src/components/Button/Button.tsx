import tw, { TwStyle, styled, css } from 'twin.macro';
import { ButtonComponentProps, ButtonProps } from 'types/button';
import {
  iconButtonBaseStyle,
  basicButtonBaseStyle,
  iconStyleMap,
} from '@constants/StyleMap/ButtonsStyleMap';
import { sizeStyleMap, fontStyleMap } from '@constants/StyleMap/CommonStyleMap';

function Button({ children, size, font, width, isIcon, ...args }: ButtonProps) {
  return (
    <>
      <ButtonComponent font={font} size={size} width={width} isIcon={isIcon} {...args}>
        {children}
      </ButtonComponent>
    </>
  );
}

export default Button;

const ButtonComponent = styled.button<ButtonComponentProps>(({ font, size, width, isIcon }) => {
  const styleArray = [
    tw`
rounded-default bg-gray-light text-white
`,
    css`
      :disabled {
        cursor: default;
        opacity: 60%;
      }
    `,
  ];

  const fontStyle = font ? fontStyleMap[font] : fontStyleMap.default;
  const sizeStyle = size ? sizeStyleMap[size] : sizeStyleMap.default;
  const iconStyle = size ? iconStyleMap[size] : iconStyleMap.default;

  if (isIcon) {
    styleArray.push(iconButtonBaseStyle as TwStyle);
    styleArray.push(...iconStyle);

    return styleArray;
  }

  styleArray.push(basicButtonBaseStyle(width) as TwStyle);
  styleArray.push(fontStyle);
  styleArray.push(...sizeStyle);

  return styleArray;
});
