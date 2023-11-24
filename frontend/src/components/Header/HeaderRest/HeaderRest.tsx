import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaUser } from 'react-icons/fa6';
import { FaSistrix } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';
import { useEffect } from 'react';
import useProfileQuery from '@hooks/useProfileQuery';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import LoginModal from '@components/LoginModal/LoginModal';
import JoinModal from '@components/JoinModal/JoinModal';
import useHeaderSearchInput from '@hooks/useHeaderSearchInput';

const HeaderRest = () => {
  const { openModal, closeModal } = useModal();
  const { data, isSuccess, isLoading, isError } = useProfileQuery();

  const {
    searchInput,
    handleSearchInput,
    isClickSearchButton,
    handleBlur,
    setIsClickSearchButton,
  } = useHeaderSearchInput();

  const handleLogin = () => {
    localStorage.setItem('lastVisited', location.pathname);

    openModal(Modal, {
      children: LoginModal(() => closeModal(Modal)),
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
              value={searchInput}
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
      <ProfileContainer>
        {isSuccess && (
          <Button size="l" onClick={handleLogout} isIcon={false}>
            <>
              <FaUser size={20} />
              {data?.nickname}님
            </>
          </Button>
        )}
        {(isLoading || isError) && (
          <>
            <Button size="l" font="maplestory" isIcon={false} onClick={handleLogin}>
              <>로그인</>
            </Button>
          </>
        )}
      </ProfileContainer>
    </HeaderRestContainer>
  );
};

const HeaderRestContainer = styled.div([
  tw`desktop:(w-[40rem])`,
  tw`mobile:(w-[20rem])`,
  css`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 2rem;
  `,
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
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

const SearchInputForm = styled.div([
  tw`bg-gray-light`,
  tw`desktop:(max-w-[16.4rem] w-[16.4rem] h-[3.6rem] rounded-[4rem])`,
  tw`mobile:(w-[12.4rem] h-[3.2rem] rounded-[3rem])`,
  css`
    animation: 0.6s ${widthAnimation} forwards;
    display: flex;
    align-items: center;
  `,
]);

const SearchInput = styled.input([
  tw`(font-pretendard h-full pl-2 pr-3 bg-gray-light text-white rounded-[4rem])`,
  tw`desktop:(max-w-[12.8rem] text-m)`,
  tw`mobile:(max-w-[9.2rem] text-s)`,
  css`
    animation: 1s ${widthAnimation} forwards;
    border: none;
    outline: none;
  `,
]);

const ProfileContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

export default HeaderRest;
