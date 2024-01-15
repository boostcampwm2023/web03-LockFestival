import { FaCircleUser } from 'react-icons/fa6';
import tw, { css, styled } from 'twin.macro';
import { UserInfo } from 'types/chat';
import Label from '@components/Label/Label';
import LeaderIcon from '../../icon/LeaderIcon.svg?react';

const UserItem = ({ nickname, profileImg, isLeader }: Omit<UserInfo, 'isLeave' | 'userId'>) => {
  return (
    <UserItemWrapper>
      {profileImg ? <ProfileImg src={profileImg} /> : <FaCircleUser size="20" color="white" />}
      <Label isBorder={false} backgroundColor="transparent" size="m">
        <NameTag>{nickname}</NameTag>
      </Label>
      {isLeader ? <LeaderIcon width={20} height={20} /> : ''}
    </UserItemWrapper>
  );
};

export default UserItem;

const UserItemWrapper = styled.div([
  css`
    display: flex;
    flex: 1;
    align-items: center;
    height: 3.6rem;
  `,
]);

const NameTag = styled.div([tw`text-white`]);

const ProfileImg = styled.img([
  css`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: white;
  `,
  tw`p-1`,
]);
