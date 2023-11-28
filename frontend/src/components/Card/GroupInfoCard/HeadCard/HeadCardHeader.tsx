import tw, { styled, css } from 'twin.macro';
import { FaRegUser } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa6';

interface Props {
  profileImageUrl: string;
  nickname: string;
  hasPassword: boolean;
}

const HeadCardHeader = ({ profileImageUrl, nickname, hasPassword }: Props) => {
  return (
    <Header>
      <UserContainer>
        {profileImageUrl ? (
          <ProfileImg src={profileImageUrl} />
        ) : (
          <Circle>
            <FaRegUser size={16} />
          </Circle>
        )}
        <Text>{nickname}</Text>
      </UserContainer>
      {hasPassword && <FaLock size={16} />}
    </Header>
  );
};

const Header = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
]);

const UserContainer = styled.div([
  tw`text-m`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const ProfileImg = styled.img([tw`rounded-full w-[3.2rem] h-[3.2rem]`]);

const Text = styled.span([tw`px-2`]);

const Circle = styled.div([
  tw`(w-[3.2rem] h-[3.2rem]) rounded-full border-[0.1rem] border-white border-solid`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

export default HeadCardHeader;
