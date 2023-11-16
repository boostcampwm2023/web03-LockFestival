import tw, { TwStyle, styled } from 'twin.macro';
import { LabelComponentProps, LabelProps } from 'types/label';
import { fontStyleMap, sizeStyleMap } from '@constants/StyleMap/CommonStyleMap';
import { colorStyleMap, LabelBaseStyle } from '@constants/StyleMap/LabelStyleMap';
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
    const bgColor = isTwBackgroundColor(backgroundColor)
      ? colorStyleMap[backgroundColor]
      : colorStyleMap.default;
    const borderStyle = isBorder ? tw`border-[0.3rem] border-solid border-gray-light` : tw``;

    styleArray.push(LabelBaseStyle(width) as TwStyle);
    styleArray.push(fontStyle);
    styleArray.push(...sizeStyle);
    styleArray.push(bgColor);
    styleArray.push(borderStyle);

    return styleArray;
  }
);
