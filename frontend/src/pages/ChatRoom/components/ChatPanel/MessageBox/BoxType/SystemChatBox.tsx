import tw, { css, styled } from 'twin.macro';

interface BoxProps {
  message: string;
}

const SystemChatBox = ({ message }: BoxProps) => {
  return (
    <Container>
      <TextContainer>
        <MessageContent>{message}</MessageContent>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div([
  tw`w-full my-2`,
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
]);

const TextContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 0.6rem;
  `,
]);

const MessageContent = styled.div([
  tw`w-full border border-gray border-solid rounded-[1.2rem] px-2 py-2 bg-gray-light text-white-60`,
  css`
    text-align: center;
    word-break: break-all;
    white-space: pre-wrap;
  `,
]);

export default SystemChatBox;
