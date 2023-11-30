import { render, screen } from '@testing-library/react';
import SimpleThemeCard from '@components/Card/SimpleThemeCard/SimpleThemeCard';
import { SimpleThemeCardData } from 'types/theme';
import { RecoilRoot } from 'recoil';

describe('SimpleThemeCard 컴포넌트 테스트', () => {
  const tmpProps: SimpleThemeCardData = {
    themeName: '삐릿-뽀',
    posterImageUrl: 'a.png',
    themeId: 1,
  };

  it('컴포넌트에 넘긴 테마명이 렌더링된다.', () => {
    render(
      <RecoilRoot>
        <SimpleThemeCard {...tmpProps} />
      </RecoilRoot>
    );

    const textEl = screen.getByText('삐릿-뽀');

    expect(textEl).toBeInTheDocument();
  });

  it('컴포넌트에 이미지가 렌더링된다.', () => {
    render(
      <RecoilRoot>
        <SimpleThemeCard {...tmpProps} />
      </RecoilRoot>
    );

    const imgEl = screen.getByRole('img');

    expect(imgEl).toBeInTheDocument();
  });
});
