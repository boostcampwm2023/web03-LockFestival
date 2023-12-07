import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';

export const ThemeInfoItem = (labelName: string, infoContent: string) => {
  return (
    <InfoItem>
      <LabelWrapper>
        <Label isBorder={true} size="m-bold" width="10rem">
          <FlexCenter>{labelName}</FlexCenter>
        </Label>
      </LabelWrapper>
      <InfoContent>{infoContent}</InfoContent>
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
]);

const InfoItem = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 1.6rem;
  `,
]);

const InfoContent = styled.div([tw`font-pretendard text-l`]);
