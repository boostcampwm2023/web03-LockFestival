import { getTimeByDate } from '@utils/dateUtil';
import { FaCircleUser } from 'react-icons/fa6';
import tw, { css, styled } from 'twin.macro';

interface BoxProps {
  nickname: string;
  profileImg: string;
  message: string;
  time: Date;
}

const OtherChatBox = ({ message, time, profileImg, nickname }: BoxProps) => {
  return (
    <Container>
      <ProfileContainer>
        {profileImg ? (
          <ProfileImg src={profileImg} alt="profileImg" />
        ) : (
          <FaCircleUser size="30" color="gray" />
        )}
        <ProfileText>{nickname}</ProfileText>
      </ProfileContainer>
      <TextContainer>
        <MessageContent>{message}</MessageContent>
        <DateContent>{getTimeByDate(new Date(time))}</DateContent>
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

const ProfileContainer = styled.div([
  tw`mb-1`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const ProfileImg = styled.img([
  tw`border border-gray border-solid`,
  css`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  `,
]);

const ProfileText = styled.div([tw`text-m px-1`]);

const TextContainer = styled.div([
  css`
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
  `,
]);

const DateContent = styled.div([
  tw`text-xs pb-[0.2rem]`,
  css`
    height: inherit;
  `,
]);

const MessageContent = styled.div([
  tw`border border-gray border-solid rounded-[1.2rem] px-2 py-1`,
  css`
    max-width: 25rem;
    width: fit-content;
    word-break: break-all;
  `,
]);

export default OtherChatBox;
