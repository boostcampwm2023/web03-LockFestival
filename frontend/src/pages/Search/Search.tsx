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
  const { data, fetchNextPage, refetch } = useSearchThemeInfiniteQuery(query);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query !== '') {
      refetch();
    }
  }, [query, refetch]);

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Layout>
      <CardList>
        {data?.pages.map((page) => {
          return page.data.map((theme: ThemeDetailsData) => (
            <Card key={theme.themeId} theme={theme} />
          ));
        })}
        <div ref={targetRef} />
      </CardList>
    </Layout>
  );
};

export default Search;

const Layout = styled.div([
  tw`w-full mx-auto mt-[4rem]`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
]);

const CardList = styled.div([
  tw`desktop:(max-w-[102.4rem] pb-[10rem]) tablet:(flex-col) mobile:(flex-col min-w-[34rem] pb-[4rem])`,
  css`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  `,
]);
