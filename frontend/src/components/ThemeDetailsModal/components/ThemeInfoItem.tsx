import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';

export const ThemeInfoItem = (labelName: string, infoContent: string) => {
  return (
    <InfoItem>
      <LabelWrapper>
        <Label isBorder={true} size="m-bold" width="100%">
          <FlexCenter>{labelName}</FlexCenter>
        </Label>
      </LabelWrapper>
      <InfoContent>{!infoContent || infoContent.trim() === '' ? '?' : infoContent}</InfoContent>
    </InfoItem>
  );
};

const FlexCenter = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: center;
  `,
]);

const LabelWrapper = styled.div([
  css`
    min-width: 10rem;
  `,
  tw`mobile:(min-w-[5rem])`,
]);

const InfoItem = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 1.6rem;
  `,
  tw`mobile:(gap-1)`,
]);

const InfoContent = styled.div([tw`font-pretendard text-l`, tw`mobile:(text-s)`]);
