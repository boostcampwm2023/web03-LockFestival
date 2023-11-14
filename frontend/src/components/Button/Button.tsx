import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';
import { ButtonComponentProps, ButtonProps } from 'types/ButtonTypes';
import { sizeStyleMap, fontStyleMap } from '@constants/ButtonsStyleMap';

function Button({ text, size, font, width, clickHandler }: ButtonProps) {
  return (
    <>
      <ButtonComponent font={font} size={size} width={width} onClick={clickHandler}>
        {text}
      </ButtonComponent>
    </>
  );
}

export default Button;

const ButtonComponent = styled.button<ButtonComponentProps>(({ font, size, width }) => {
  const styleArray = [];
  const fontStyle = font ? fontStyleMap[font] : fontStyleMap.default;
  const sizeStyle = size ? sizeStyleMap[size] : sizeStyleMap.default;

  styleArray.push(fontStyle);
  styleArray.push(sizeStyle);

  return [
    ...styleArray,
    tw`
rounded-default bg-gray-light text-white
`,
    css`
      width: ${width || 'fit-content'};
      text-align: center;
      border: 1px solid white;
      cursor: pointer;
    `,
  ];
});
