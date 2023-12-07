import tw, { css, styled } from 'twin.macro';
import Label from '@components/Label/Label';
import useRandomThemesQuery from '@hooks/useRandomThemesQuery';
import SimpleThemeCardList from '@components/List/SimpleThemeCardList/SimpleThemeCardList';
import { Fragment } from 'react';

const RandomThemeListContainer = () => {
  const { data } = useRandomThemesQuery();
  if (!data) {
    return <div>error</div>;
  }

  return (
    <>
      {data.map((ele) => {
        return (
          <Fragment key={ele.genreName}>
            <LabelWrapper>
              <Label isBorder={true} font="maplestory" size="l">
                <>{ele.genreName}</>
              </Label>
            </LabelWrapper>
            <SimpleCardContainer>
              <SimpleThemeCardList themes={ele.themes} />
            </SimpleCardContainer>
          </Fragment>
        );
      })}
    </>
  );
};

const LabelWrapper = styled.div(css`
  align-self: flex-start;
`);

const SimpleCardContainer = styled.div([tw`my-2 mt-[-0.5rem]`]);

export default RandomThemeListContainer;
