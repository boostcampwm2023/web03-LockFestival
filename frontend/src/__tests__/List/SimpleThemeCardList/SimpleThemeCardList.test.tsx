import { simpleThemeCardListMock } from '@__mocks__/SimpleThemeCardList/simpleThemeCardListMock';
import SimpleThemeCardList from '@components/List/SimpleThemeCardList/SimpleThemeCardList';
import { render, screen } from '@testing-library/react';

describe('SimpleThemeCardList 컴포넌트 테스트', () => {
  it('10개의 테마를 전달하면 총 10개의 테마 이미지가 렌더링된다.', () => {
    render(<SimpleThemeCardList themes={simpleThemeCardListMock} />);
    const NUMBER_OF_IMGS = simpleThemeCardListMock.length;

    const imgElements = screen.getAllByRole('img');

    expect(imgElements.length).toBe(NUMBER_OF_IMGS / 2);
  });
});
