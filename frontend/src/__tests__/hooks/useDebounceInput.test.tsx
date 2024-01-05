import useDebounceInput from '@hooks/useDebounceInput';
import { renderHook, act } from '@testing-library/react';

const DELAY_TIME = 200;

describe('useDebounceInput hook Test', () => {
  jest.useFakeTimers();

  it("쿼리의 초기값은 ''이다.", () => {
    const { result } = renderHook(() => useDebounceInput(DELAY_TIME));
    expect(result.current.realInputQuery).toBe('');
  });

  it('delayTime(200ms)가 지나지 않았다면 debounceQuery와 realInputQuery는 다를 것이다.', () => {
    const { result } = renderHook(() => useDebounceInput(DELAY_TIME));

    const event = { target: { value: 'input test' } } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.setRealInputQuery(event);
    });

    expect(result.current.debounceQuery).not.toBe(result.current.realInputQuery);
  });

  it('delayTime(200ms)가 지났다면 debounceQuery는 target value로 변한다.', () => {
    const { result } = renderHook(() => useDebounceInput(DELAY_TIME));

    const event = { target: { value: 'input test' } } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.setRealInputQuery(event);
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debounceQuery).toBe('input test');
  });
});
