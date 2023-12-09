import tw, { styled, css } from 'twin.macro';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSearchThemeInfiniteQuery from '@hooks/query/useSearchThemeInfiniteQuery';
import Card from './components/Card';
import { ThemeDetailsData } from 'types/theme';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from '@hooks/intersectionObserver/useIntersectionObserver';
import Button from '@components/Button/Button';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, fetchNextPage, isFetching, refetch } = useSearchThemeInfiniteQuery(query);
  const targetRef = useRef<HTMLDivElement>(null);
  const lastVisited = localStorage.getItem('lastVisited');
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Layout>
      {
        <>
          <TopWrapper>
            <InfoText>{query === '' ? '전체 테마결과' : `'${query}'  검색 결과`}</InfoText>
            <Button
              isIcon={false}
              onClick={() => {
                if (lastVisited !== null) {
                  navigate(lastVisited);
                }
              }}
            >
              <>이전 페이지로 돌아가기</>
            </Button>
          </TopWrapper>

          {isFetching && <TextInfo>검색 중...</TextInfo>}
          {data?.pages.map((page) => (
            <>
              {page.data.length > 0 ? (
                <CardList>
                  {page.data.map((theme: ThemeDetailsData) => (
                    <Card key={theme.themeId} theme={theme} />
                  ))}
                </CardList>
              ) : (
                <TextInfo>찾는 테마가 없습니다.</TextInfo>
              )}
            </>
          ))}
          <div ref={targetRef} />
        </>
      }
    </Layout>
  );
};

export default Search;

const Layout = styled.div([
  tw`w-full mx-auto mt-[4rem] pb-[4rem]`,
  tw`desktop:(max-w-[102.4rem])`,
  tw`tablet:(max-w-[78rem])`,
  tw`mobile:(max-w-[80%])`,
  css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
]);

const TopWrapper = styled.div([
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  tw`w-full mb-2 px-2 desktop:(max-w-[97rem]) tablet:(max-w-[47.5rem]) mobile:(max-w-[34rem])`,
]);

const InfoText = styled.div([
  tw`font-maplestory text-xl text-white`,
  css`
    flex: 1;
  `,
]);

const CardList = styled.div([
  tw`w-full desktop:(max-w-[97rem]) tablet:(flex-col) mobile:(flex-col min-w-[34rem])`,
  css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
  `,
]);

const TextInfo = styled.div([tw`font-pretendard text-l text-white mx-auto`]);
