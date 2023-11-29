import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaRightFromBracket } from 'react-icons/fa6';
import useInput from '@hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chatLog } from 'store/chatRoom';
import { ChatLog } from 'types/chat';
import MessageBox from './MessageBox/MessageBox';

const ChatContainer = () => {
  const navigate = useNavigate();
  const [inputValue, handleValue, resetValue] = useInput('');
  const chatLogData: ChatLog[] = useRecoilValue(chatLog);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const preventDefault = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    //TODO: emit chat
    resetValue();
  };

  return (
    <Layout>
      <ButtonWrapper>
        <Button
          isIcon={true}
          onClick={() => {
            //TODO: emit leave
            navigate('/group-chat');
          }}
        >
          <FaRightFromBracket />
        </Button>
      </ButtonWrapper>
      <ChatDisplayContainer>
        {chatLogData.map((log) => (
          <MessageBox message={log.message} userId={log.userId} type={log.type} time={log.time} />
        ))}
      </ChatDisplayContainer>
      <InputChatContainer
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
    </Layout>
  );
};

export default ChatContainer;
const Layout = styled.div([
  css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 49rem;
    height: 100vh;
    padding: 2rem;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `,
]);

const ChatDisplayContainer = styled.div([
  tw`w-[100%] h-[100%] bg-white rounded-[2rem] font-pretendard text-l p-4`,
  css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow-y: auto;
    gap: 1rem;
  `,
]);

const InputChatContainer = styled.textarea([
  tw`font-pretendard text-white text-m w-[100%] h-[10rem] bg-gray-dark rounded-[2rem] p-4 pr-[6.4rem]`,
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
