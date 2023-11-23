import SimpleThemeCard from '@components/Card/SimpleThemeCard/SimpleThemeCard';
import { SimpleThemeCardData } from 'types/theme';
import tw, { styled, css } from 'twin.macro';
import { FaFaceFrown } from 'react-icons/fa6';
import Carousel from '@components/Carousel/Carousel';

interface SimpleThemeCardListProps {
  themes: Array<SimpleThemeCardData>;
}

const SimpleThemeCardList = ({ themes }: SimpleThemeCardListProps) => {
  if (!themes.length) {
    return (
      <NoThemeContainer>
        <FaFaceFrown size={35} />
        <TextSpan>테마가 없어요</TextSpan>
        <FaFaceFrown size={35} />
      </NoThemeContainer>
    );
  }

  return (
    <Carousel>
      {themes.map((theme) => (
        <CardContainer key={theme.themeId}>
          <SimpleThemeCard {...theme} />
        </CardContainer>
      ))}
    </Carousel>
  );
};

const CardContainer = styled.div([tw`desktop:(mx-4)`, tw`mobile:(mx-2)`]);

const NoThemeContainer = styled.div([
  tw`w-full overflow-hidden bg-gray-light text-[4rem] text-white rounded-default`,
  tw`desktop:(max-w-[102.4rem] h-[32.4rem])`,
  tw`mobile:(max-w-[43rem] h-[21.6rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const TextSpan = styled.span([tw`mx-4`]);

export default SimpleThemeCardList;
