import Modal from '@components/Modal/Modal';
import { render, screen } from '@testing-library/react';
import { ModalProps } from 'types/modal';
import userEvent from '@testing-library/user-event';

describe('모달 컴포넌트 테스트', () => {
  const tmpProps: ModalProps = {
    children: <button>2</button>,
    closeOnExternalClick: true,
    isOpen: true,
    onClose: jest.fn(),
  };

  it('모달 컴포넌트에 children이 제대로 전달된다.', () => {
    render(<Modal {...tmpProps} />);

    const buttonEl = screen.getByRole('button');

    expect(buttonEl).toBeInTheDocument();
  });

  it('closeOnExternalClick가 true인 컴포넌트의 외부를 클릭하면 onClose가 호출된다.', async () => {
    const user = userEvent.setup();

    const clickOutside = jest.fn();

    render(
      <Modal
        children={<button onClick={clickOutside}>2</button>}
        closeOnExternalClick={true}
        isOpen={true}
        onClose={clickOutside}
      />
    );

    const outsideModal = document.body.firstElementChild?.firstElementChild;

    if (outsideModal) {
      await user.click(outsideModal);
      expect(clickOutside).toHaveBeenCalled();
    }
  });

  it('closeOnExternalClick가 false인 컴포넌트의 외부를 클릭하면 onClose가 호출되지않는다.', async () => {
    const user = userEvent.setup();

    const clickOutside = jest.fn();

    render(
      <Modal
        children={<button onClick={clickOutside}>2</button>}
        closeOnExternalClick={true}
        isOpen={false}
        onClose={clickOutside}
      />
    );

    const outsideModal = document.body.firstElementChild?.firstElementChild;

    if (outsideModal) {
      await user.click(outsideModal);
      expect(clickOutside).not.toHaveBeenCalled();
    }
  });
});
