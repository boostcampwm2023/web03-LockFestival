import tw, { TwStyle, styled } from 'twin.macro';
import { css } from '@emotion/react';
import { LabelComponentProps, LabelProps } from 'types/label';
import { LabelBaseStyle, colorStyleMap } from '@constants/StyleMap/LabelStyleMap';
import { sizeStyleMap, fontStyleMap } from '@constants/StyleMap/CommonStyleMap';
import { colorCodeRegex } from '@constants/Regex';
import { isTwBackgroundColor } from '@utils/TypeValidation';

function Label({ children, font, size, width, backgroundColor, isBorder, ...args }: LabelProps) {
  return (
    <>
      <LabelComponent
        font={font}
        size={size}
        width={width}
        backgroundColor={backgroundColor}
        isBorder={isBorder}
        {...args}
      >
        {children}
      </LabelComponent>
    </>
  );
}

export default Label;

const LabelComponent = styled.div<LabelComponentProps>(
  ({ font, size, width, backgroundColor, isBorder }) => {
    const styleArray = [
      tw`
rounded-default text-gray-dark`,
    ];

    const fontStyle = font ? fontStyleMap[font] : fontStyleMap.default;
    const sizeStyle = size ? sizeStyleMap[size] : sizeStyleMap.default;
    const bgColor: TwStyle | Record<string, any> = (() => {
      if (isTwBackgroundColor(backgroundColor)) {
        return colorStyleMap[backgroundColor];
      }

      if (backgroundColor && colorCodeRegex.test(backgroundColor)) {
        return css`
          background-color: ${backgroundColor};
        `;
      }

      return tw`bg-white`;
    })();
    const borderStyle = isBorder ? tw`border-[0.3rem] border-solid border-gray-light` : tw``;

    styleArray.push(LabelBaseStyle(width));
    styleArray.push(fontStyle);
    styleArray.push(...sizeStyle);
    styleArray.push(bgColor);
    styleArray.push(borderStyle);

    return styleArray;
  }
);
