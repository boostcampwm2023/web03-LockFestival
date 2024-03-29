import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaUser } from 'react-icons/fa6';
import { FaSistrix } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import useProfileQuery from '@hooks/useProfileQuery';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import LoginModal from '@components/LoginModal/LoginModal';
import JoinModal from '@components/JoinModal/JoinModal';
import useHeaderSearchInput from '@hooks/useHeaderSearchInput';
import { useRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import { Profile } from 'types/profile';

const HeaderRest = () => {
  const { openModal, closeModal } = useModal();

  const { data } = useProfileQuery();

  const [profileData, setProfileData] = useRecoilState<Profile>(userAtom);

  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);

  const {
    realInputQuery,
    handleSearchInput,
    isClickSearchButton,
    handleBlur,
    setIsClickSearchButton,
  } = useHeaderSearchInput();

  const handleLogin = () => {
    localStorage.setItem('lastVisited', location.pathname);

    openModal(Modal, {
      children: <LoginModal onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: true,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setProfileData(data);

    if (!data.isMoreInfo) {
      openModal(Modal, {
        children: JoinModal(() => closeModal(Modal)),
        onClose: () => closeModal(Modal),
        closeOnExternalClick: false,
      });
    }
  }, [data]);

  return (
    <HeaderRestContainer>
      <SearchContainer>
        {isClickSearchButton ? (
          <SearchInputForm>
            <Button isIcon={true} size="l">
              <FaSistrix />
            </Button>
            <SearchInput
              value={realInputQuery}
              onChange={handleSearchInput}
              onBlur={handleBlur}
              autoFocus
              type="text"
            />
          </SearchInputForm>
        ) : (
          <Button isIcon={true} size="l" onClick={() => setIsClickSearchButton(true)}>
            <FaSistrix />
          </Button>
        )}
      </SearchContainer>
      <ProfileContainer
        onMouseOver={() => setIsHoverProfile(true)}
        onMouseOut={() => setIsHoverProfile(false)}
      >
        {profileData.nickname ? (
          <>
            <Button size="l" isIcon={false}>
              <>
                <ProfileImgWrapper>
                  {profileData.profileImageUrl ? (
                    <ProfileImg src={profileData.profileImageUrl} />
                  ) : (
                    <FaUser size={10} />
                  )}
                </ProfileImgWrapper>
                <ProfileNameWrapper> {profileData.nickname}님</ProfileNameWrapper>
              </>
            </Button>
            {isHoverProfile && (
              <DropDown>
                <DropDownList onClick={handleLogout}>로그아웃</DropDownList>
              </DropDown>
            )}
          </>
        ) : (
          <Button size="l" font="maplestory" isIcon={false} onClick={handleLogin}>
            <>로그인</>
          </Button>
        )}
      </ProfileContainer>
    </HeaderRestContainer>
  );
};

const HeaderRestContainer = styled.div([
  css`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
  `,
  tw`gap-5 tablet:(gap-2) mobile:(gap-2)`,
]);

const widthAnimation = keyframes`
  0% {
    width: 40%;
  }
  100% {
    width: 100%;
  }
`;

const SearchContainer = styled.div([
  tw`desktop:(w-[16rem] h-[3.6rem] rounded-[4rem])`,
  tw`tablet:(flex-1 max-w-[16rem] h-[3.6rem] rounded-[4rem])`,
  tw`mobile:(flex-1 max-w-[16rem] h-[3.2rem] rounded-[3rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

const SearchInputForm = styled.div([
  tw`bg-gray-light w-full`,
  tw`desktop:(rounded-[4rem])`,
  tw`tablet:(rounded-[4rem])`,
  tw`mobile:(rounded-[3rem])`,
  css`
    animation: 0.5s ${widthAnimation} forwards;
    display: flex;
    align-items: center;
  `,
]);

const SearchInput = styled.input([
  tw`font-pretendard h-full px-2 bg-gray-light text-white rounded-[4rem]`,
  tw`desktop:(w-[calc(100%-3.6rem)] text-m)`,
  tw`tablet:(w-[calc(100%-3.2rem)] text-m)`,
  tw`mobile:(w-[calc(100%-3.2rem)] text-s)`,
  css`
    border: none;
    outline: none;
  `,
]);

const ProfileContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  `,
]);

const DropDown = styled.ul([
  tw`w-full font-pretendard text-l`,
  css`
    position: absolute;
    top: 3.6rem;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 5;
  `,
]);

const DropDownList = styled.li([
  tw`rounded-[1rem] border border-white border-solid pl-4 h-[4rem] bg-gray-light`,

  css`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
]);

const ProfileImgWrapper = styled.div([
  tw` w-[2rem] h-[2rem] mr-1`,
  css`
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const ProfileImg = styled.img([
  tw`w-full h-full mr-1`,
  css`
    border-radius: 50%;
  `,
]);

const ProfileNameWrapper = styled.div([tw`text-m`]);

export default HeaderRest;
