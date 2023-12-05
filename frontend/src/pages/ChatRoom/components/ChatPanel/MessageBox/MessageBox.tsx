import tw, { styled, css } from 'twin.macro';
import { ChatLog, UserInfo, UserInfoObject } from 'types/chat';
import { userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';
import { getStringByDate, getTimeByDate } from '@utils/dateUtil';
import { useCallback } from 'react';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  const userData = useRecoilValue(userListInfoAtom);
  const myData = userData?.get(userId) || {
    nickname: '알 수 없는 사용자',
    isMe: false,
    profileImg: '',
  };

  const { nickname, isMe, profileImg } = myData;

  // 같은 년 월 일, 시각 분, 사용자가 같으면 하나의 nickname만
  const checkValidate = useCallback(() => {}, [message]);

  return (
    <Layout type={type} isMe={isMe}>
      {type === 'message' &&
        (isMe ? (
          <ProfileContainer>
            <div>{nickname}</div>
            <ProfileImg src={profileImg} alt="사용자 프로필" />
          </ProfileContainer>
        ) : (
          <ProfileContainer>
            <ProfileImg src={profileImg} alt="사용자 프로필" />
            <div>{nickname}</div>
          </ProfileContainer>
        ))}

      {isMe ? (
        <MessageLayout type={type}>
          <DateContent>
            {getStringByDate(new Date(time))} {getTimeByDate(new Date(time))}
          </DateContent>
          <MessageContent type={type}>{message}</MessageContent>
        </MessageLayout>
      ) : (
        <MessageLayout type={type}>
          <MessageContent type={type}>{message}</MessageContent>
          <DateContent>
            {getStringByDate(new Date(time))} {getTimeByDate(new Date(time))}
          </DateContent>
        </MessageLayout>
      )}
    </Layout>
  );
};

export default MessageBox;

const Layout = styled.div<{ isMe: boolean; type: string }>(({ isMe, type }) => [
  css`
    display: flex;
    flex-direction: column;
    align-items: ${type !== 'message' ? 'center' : isMe ? 'flex-end' : 'flex-start'};
  `,
]);

const MessageLayout = styled.div<{ type: string }>(({ type }) => [
  css`
    display: flex;

    margin-bottom: 1rem;
  `,
  tw`font-pretendard text-m mt-1`,
]);

const MessageContent = styled.div<{ type: string }>(({ type }) => [
  tw`border border-gray border-solid rounded-[2rem] px-2 py-1`,
  css`
    background-color: ${type === 'message' ? 'transparent' : 'yellow'};
    max-width: ${type === 'message' && '25rem'};
    width: ${type === 'message' ? 'fit-content' : '100%'};
    word-break: break-all;
  `,
]);

const ProfileContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 0.6rem;
  `,
]);

const DateContent = styled.div([
  css`
    display: flex;
    align-items: flex-end;
  `,
]);

const ProfileImg = styled.img([tw`w-[2rem] h-[2rem] rounded-[50%]`]);
