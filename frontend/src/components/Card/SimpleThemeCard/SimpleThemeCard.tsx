import tw, { css, styled } from 'twin.macro';
import { SimpleThemeCardData } from 'types/theme';

const SimpleThemeCard = ({ themeId, name, posterImageUrl }: SimpleThemeCardData) => {
  return (
    <CardContainer key={themeId}>
      <CardImg alt="테마사진" src={posterImageUrl} />
      <CardText>{name}</CardText>
    </CardContainer>
  );
};

const CardContainer = styled.div([
  tw`font-gsans text-white bg-gray`,
  tw`desktop:(text-s h-[30.4rem] w-[19.2rem] rounded-[2rem])`,
  tw`mobile:(text-xs h-[20.3rem] w-[12.8rem] rounded-[1.4rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
]);

const CardImg = styled.img([
  tw`mb-2`,
  tw`desktop:(w-[16rem] h-[25.6rem])`,
  tw`mobile:(w-[10rem] h-[16rem])`,
]);
const CardText = styled.span([
  tw`w-[90%]`,
  css`
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,
]);
export default SimpleThemeCard;