import Button from '@components/Button/Button';
import useInput from '@hooks/useInput';
import tw, { styled, css } from 'twin.macro';

interface Props {
  setIsScrollToTop: React.Dispatch<React.SetStateAction<boolean>>;
  sendChat: (message: string) => void;
}

const InputBox = ({ setIsScrollToTop, sendChat }: Props) => {
  const [inputValue, handleValue, resetValue] = useInput('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const preventDefault = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (inputValue === '') {
      return;
    }
    setIsScrollToTop(false);
    sendChat(inputValue);
    resetValue();
  };

  return (
    <>
      <InputChatPanel
        value={inputValue}
        onChange={handleValue}
        rows={4}
        onKeyDown={handleKeyDown}
        onFocus={preventDefault}
        onBlur={preventDefault}
      />
      <SendButtonWrapper>
        <Button type="button" isIcon={false} onClick={handleSubmit}>
          <>보내기</>
        </Button>
      </SendButtonWrapper>
    </>
  );
};

const InputChatPanel = styled.textarea([
  tw`font-pretendard text-white text-m w-[100%] h-[10rem] bg-gray rounded-[2rem] p-4 pr-[6.4rem]`,
  css`
    resize: none;

    &:focus {
      outline: none;
    }
  `,
]);

const SendButtonWrapper = styled.div([
  css`
    position: absolute;
    bottom: 3rem;
    right: 3rem;
  `,
]);

export default InputBox;
