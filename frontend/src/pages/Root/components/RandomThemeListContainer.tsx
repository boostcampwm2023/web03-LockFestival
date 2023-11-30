import tw, { styled } from 'twin.macro';
import Label from '@components/Label/Label';
import useRandomThemesQuery from '@hooks/useRandomThemesQuery';
import SimpleThemeCardList from '@components/List/SimpleThemeCardList/SimpleThemeCardList';

const RandomThemeListContainer = () => {
  const { data } = useRandomThemesQuery();
  if (!data) {
    return <div>error</div>;
  }

  return (
    <>
      {data.map((ele) => {
        return (
          <>
            <Label isBorder={true} font="maplestory" size="l">
              <>{ele.genreName}</>
            </Label>
            <SimpleCardContainer>
              <SimpleThemeCardList themes={ele.themes} />
            </SimpleCardContainer>
          </>
        );
      })}
    </>
  );
};

const SimpleCardContainer = styled.div([tw`my-2 mt-[-0.5rem]`]);

export default RandomThemeListContainer;
