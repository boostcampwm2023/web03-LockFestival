import { getTimeByDate } from '@utils/dateUtil';
import { FaCircleUser } from 'react-icons/fa6';
import tw, { css, styled } from 'twin.macro';

interface BoxProps {
  nickname: string;
  profileImg: string;
  message: string;
  time: Date;
  unreadCount: number | undefined;
  isFirstChat: boolean;
  isLastChat: boolean;
}

const OtherChatBox = ({
  message,
  time,
  profileImg,
  nickname,
  unreadCount,
  isFirstChat,
  isLastChat,
}: BoxProps) => {
  return (
    <Container>
      {isFirstChat && (
        <ProfileContainer>
          {profileImg ? (
            <ProfileImg src={profileImg} alt="profileImg" />
          ) : (
            <FaCircleUser size="30" color="gray" />
          )}
          <ProfileText>{nickname}</ProfileText>
        </ProfileContainer>
      )}

      <TextContainer>
        <MessageContent>{message}</MessageContent>
        <RestContent>
          {unreadCount !== 0 && <UnreadContent>{unreadCount}</UnreadContent>}
          {isLastChat && <DateContent>{getTimeByDate(new Date(time))}</DateContent>}
        </RestContent>
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

const MessageContent = styled.div([
  tw`border border-gray border-solid rounded-[1.2rem] px-2 py-1`,
  css`
    max-width: 25rem;
    width: fit-content;
    word-break: break-all;
    white-space: pre-wrap;
  `,
]);

const RestContent = styled.div([tw`text-xs`]);

const UnreadContent = styled.div([tw`text-orange`]);

const DateContent = styled.div([
  css`
    height: inherit;
  `,
]);

export default OtherChatBox;
