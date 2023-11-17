import { fireEvent, render, screen } from '@testing-library/react';
import Button from '@components/Button/Button';

describe('버튼 컴포넌트 테스트', () => {
  const handler = jest.fn();
  const NOT_CALLED = 0;
  const CALLED = 1;

  it('버튼에 지정한 text가 들어가고, 클릭 시 handler가 실행되는지 테스트', () => {
    render(<Button children={<>test</>} isIcon={false} onClick={handler} />);

    const text = screen.getByText(/test/i);

    expect(text).toBeInTheDocument();

    expect(handler).toHaveBeenCalledTimes(NOT_CALLED);
    fireEvent.click(text);
    expect(handler).toHaveBeenCalledTimes(CALLED);
  });

  it('버튼에 사이즈를 지정했을때, 설정한 폰트, 넓이가 적용되는지 테스트', () => {
    render(
      <Button
        children={<>test</>}
        isIcon={false}
        font="pretendard"
        width="20rem"
        onClick={handler}
      />
    );
    const myButton = screen.getByText(/test/i);

    const computedStyle = window.getComputedStyle(myButton);

    expect(computedStyle.fontFamily).toBe('Pretendard-Regular');
    expect(computedStyle.width).toBe('20rem');
  });
});
