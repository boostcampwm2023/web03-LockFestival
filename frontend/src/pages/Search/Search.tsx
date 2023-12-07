import tw, { styled, css } from 'twin.macro';
import { useSearchParams } from 'react-router-dom';
import useSearchThemeInfiniteQuery from '@hooks/query/useSearchThemeInfiniteQuery';
import Card from './components/Card';
import { ThemeDetailsData } from 'types/theme';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, fetchNextPage, isFetching, refetch } = useSearchThemeInfiniteQuery(query);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Layout>
      {query !== '' && (
        <>
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
        </>
      )}
    </Layout>
  );
};

export default Search;

const Layout = styled.div([
  tw`w-full mx-auto mt-[4rem]`,
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
]);

const CardList = styled.div([
  tw`w-full desktop:(max-w-[97rem] pb-[10rem]) tablet:(flex-col) mobile:(flex-col min-w-[34rem] pb-[4rem])`,
  css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
  `,
]);

const TextInfo = styled.div([tw`font-pretendard text-l text-white mx-auto`]);
