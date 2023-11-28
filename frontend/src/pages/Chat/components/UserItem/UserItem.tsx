import tw, { styled, css } from 'twin.macro';
import Label from '@components/Label/Label';
import { FaCircleUser } from 'react-icons/fa6';
import LeaderIcon from './LeaderIcon.svg?react';

interface UserItemProps {
  profileImg: string;
  nickname: string;
  isLeader: boolean;
  isMe: boolean;
}

const UserItem = ({ profileImg, nickname, isLeader }: UserItemProps) => {
  return (
    <UserItemWrapper>
      {profileImg !== '' ? (
        <ProfileImg src={profileImg} />
      ) : (
        <FaCircleUser size="20" color="white" />
      )}
      <Label isBorder={false} backgroundColor="transparent" size="l" width="11rem">
        <NameTag>{nickname}</NameTag>
      </Label>
      {isLeader ? <LeaderIcon width={20} /> : ''}
    </UserItemWrapper>
  );
};

export default UserItem;

const UserItemWrapper = styled.div([
  css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.6rem;
  `,
]);

const NameTag = styled.div([
  tw`text-white`,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
]);

const ProfileImg = styled.img([
  css`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: white;
  `,
]);
